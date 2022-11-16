import { LightningElement, wire, track, api } from "lwc";
import getTeacherNames from "@salesforce/apex/admissionListViewController.getTeacherNames";
import updateRecords from "@salesforce/apex/admissionListViewController.updateRecords";
import delFields from "@salesforce/apex/admissionListViewController.deleteFieldValues";
import { refreshApex } from "@salesforce/apex";
import AttendanceStatus from "@salesforce/apex/staffReportController.AttendanceStatus";
import AttendanceStatusPerWeek from "@salesforce/apex/staffReportController.AttendanceStatusPerWeek";
//import Status from '@salesforce/schema/Case.Status';

const columns = [
  {
    label: "Staff Name",
    fieldName: "Staff_Name__c",
    type: "lookup"
  },
  {
    label: "Checked In",
    fieldName: "Check_In__c"
  },
  {
    label: "Checked Out",
    fieldName: "Check_Out__c"
  },
  {
    label: "Status",
    fieldName: "Status__c",
    option: "options"
  },
  {
    label: "Date",
    fieldName: "Date__c"
  },

  {
    label: "Check In",
    type: "button-icon",
    typeAttributes: {
      iconName: "utility:package_org",
      title: "Check-In",
      variant: "brand",
      label: "Check_In",
      value: "Check_In",
      disabled: {
        fieldName: "disabledButton1"
      }
    }
  },
  {
    label: "Check Out",
    type: "button-icon",
    typeAttributes: {
      iconName: "utility:logout",
      title: "Check-Out",
      variant: "brand",
      label: "Check_Out",
      value: "Check Out",
      disabled: {
        fieldName: "disabledButton2"
      }
    }
  },

  {
    label: "Cancel Check",
    type: "button-icon",
    typeAttributes: {
      iconName: "action:close",
      title: "Cancel-Check",
      variant: "brand",
      label: "Cancel_Check",
      value: "Cancel Check",
      disabled: {
        fieldName: "disabledButton3"
      }
    }
  }
];

// const columns1 = [
//     { label: 'Date', fieldName: 'Date__c' },
//     { label: 'Attendance Status', fieldName: 'Status__c' },
// ];

export default class CheckInListView extends LightningElement {
  @track data1 = [];
  @track data2 = []; //
  // columns1 = columns1;

  @track columns = columns;
  searchData = "";
  @track checkInData = [];
  @track presentCheckInData = 0;
  @track absentCheckInData = 0;
  @track sortBy;
  @track sortDirection;
  recordId = [];
  dataRecords;

  @track attendance;
  @track deleteFields;

  get present() {
    let result = this.checkInData.filter((x) => x.Status__c == "Present");
    return result.length;
  }

  get absent() {
    let result = this.checkInData.filter((x) => x.Status__c == "Absent");
    return result.length;
  }

  get options() {
    return [
      {
        label: "--None--",
        value: "--None--"
      },
      {
        label: "Present",
        value: "Present"
      },
      {
        label: "Swipe In Missing",
        value: "Swipe In Missing"
      },
      {
        label: "Swipe Out Missing",
        value: "Swipe Out Missing"
      },
      {
        label: "Absent",
        value: "Absent"
      }
    ];
  }

  teacherOptions = [];
  @wire(getTeacherNames, {
    keySearch: "$searchData"
  })
  fetchRecords(result) {
    this.dataRecords = result;
    if (result.data) {
      console.log("result", result.data);
      let obj = JSON.parse(
        JSON.stringify(
          result.data.filter((x) => {
            return x.Staff_Name__c != undefined;
          })
        )
      );
      // this.teacherOptions.push({
      //     label: 'All',
      //     value: 'All'
      // });
      for (let x of obj) {
        this.teacherOptions.push({
          label: x.Staff_Name__r.Teacher_Name__c,
          value: x.Staff_Name__r.Teacher_Name__c
        });
        x["Staff_Name__c"] = x.Staff_Name__r.Teacher_Name__c;
        // x['Status__c']= x.Status__c;
        x["Date__c"] = x.Date__c;
        x["Check_In__c"] = x.Check_In__c;
        x["Check_Out__c"] = x.Check_Out__c;
        if (x["Check_In__c"] != null && x["Check_Out__c"] != null) {
          x.disabledButton1 = true;
          x.disabledButton2 = true;
          x.disabledButton3 = true;
        }
        if (x["Check_In__c"] != null && x["Check_Out__c"] == null) {
          x.disabledButton1 = true;
        }
      }

      this.checkInData = obj;
    }
    if (result.error) {
      console.log(result.error);
    }
  }

  getsearchRecords(event) {
    this.searchData = event.detail.value;
    this.getTimes();
  }

  getTimes() {
    var today = new Date().toLocaleTimeString({
      timeZone: "UTC"
    });
    //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(today);
    return today;
  }

  btnIndex(name) {
    let i;
    let data = JSON.parse(JSON.stringify(this.checkInData));
    data.map((item, index) => {
      if (item.Staff_Name__r.Teacher_Name__c == name) {
        console.log("Nameeeeeee", item.Staff_Name__r.Teacher_Name__c);
        i = index;
      }
    });
    return i;
  }

  handleRowAction(event) {
    if (event.detail.action.label === "Check_In") {
      // location.reload();

      let row = event.detail.row;
      let data = JSON.parse(JSON.stringify(this.checkInData));

      let time = this.getTimes();

      let index;

      for (let x = 0; x <= data.length; x++) {
        if (x == this.btnIndex(row.Staff_Name__r.Teacher_Name__c)) {
          console.log("Insedxx", x);

          data[x].Check_In__c = time;
          data[x].Status__c = "Present";
          index = x;
          if (data[x].Check_In__c != null) {
            data[x].disabledButton1 = true;
          }
        }
      }
      console.log("Data", data[index]);
      this.checkInData = data;

      console.log("Alllllllllllllllll", JSON.stringify(this.checkInData));
      let value = {
        ...data[index]
      };
      value["Staff_Name__c"] = value.Staff_Name__r.Id;
      console.log("alll Result", value);

      updateRecords({
        attendance: JSON.stringify(value)
      })
        .then((result) => {
          console.log("Resulttt", result);
        })
        .catch((error) => {
          console.log("errorrrrr" + JSON.stringify(error));
        });

      refreshApex(this.presentCount);
    }

    if (event.detail.action.label === "Check_Out") {
      //location.reload();

      let row = event.detail.row;
      let data = JSON.parse(JSON.stringify(this.checkInData));
      let time = this.getTimes();
      let index;
      for (let x = 0; x <= data.length; x++) {
        if (x == this.btnIndex(row.Staff_Name__r.Teacher_Name__c)) {
          if (data[x].Status__c == "Present") {
            data[x].Check_Out__c = time;
            index = x;
          } else {
            data[x].Status__c = "Swipe In Missing";
            index = x;
          }
          if (data[x].Check_Out__c != null) {
            data[x].disabledButton2 = true;
          }

          if (
            data[x].disabledButton1 == true &&
            data[x].disabledButton2 == true
          ) {
            console.log("Run");
            data[x].disabledButton3 = true;
          }
        }
      }
      this.checkInData = data;
      // this.refreshApex(this.checkInData);
      let value = {
        ...data[index]
      };
      value["Staff_Name__c"] = value.Staff_Name__r.Id;
      console.log("alll Result12345", value);

      updateRecords({
        attendance: JSON.stringify(value)
      })
        .then((result) => {
          console.log("Resulttt", result);
        })
        .catch((error) => {
          console.log("errorrrrr" + JSON.stringify(error));
        });
    }

    if (event.detail.action.label === "Cancel_Check") {
      //location.reload();

      let index;
      let data = JSON.parse(JSON.stringify(this.checkInData));
      let row = event.detail.row;
      for (let x = 0; x <= data.length; x++) {
        if (x == this.btnIndex(row.Staff_Name__r.Teacher_Name__c)) {
          data[x].Check_In__c = null;
          data[x].Check_Out__c = null;
          data[x].Status__c = "--None--";
          data[x].disabledButton1 = false;
          index = x;
        }
        // data[x].Check_Out__c!=null
        // if(data[x].disabledButton1==true){
        //     data[x].disabledButton1=false;
        // }
      }
      this.checkInData = data;

      //  this.refreshApex(this.checkInData);
      let value = {
        ...data[index]
      };
      value["Staff_Name__c"] = value.Staff_Name__r.Id;
      console.log("alll Result1234566", value);

      delFields({
        deleteFields: JSON.stringify(value)
      })
        .then((result) => {
          console.log("Resulttt", result);
        })
        .catch((error) => {
          console.log("errorrrrr" + JSON.stringify(error));
        });
    }
  }

  // async refresh(){
  //     return refreshApex(this.presentCount);

  // }

  // refreshData() {
  //     console.log('Refresh',JSON.stringify(this.checkInData))
  //     return refreshApex(this.checkInData);
  // }

  showData() {
    console.log("Checkinggg");
    console.log("AllData" + JSON.stringify(this.checkInData));
    this.checkInData;
    location.reload();
  }

  doSorting(event) {
    this.sortBy = event.detail.fieldName;
    this.sortDirection = event.detail.sortDirection;
    this.sortData(this.sortBy, this.sortDirection);
  }

  sortData(fieldname, direction) {
    let parseData = JSON.parse(JSON.stringify(this.checkInData));
    // Return the value stored in the field
    let keyValue = (a) => {
      return a[fieldname];
    };
    // cheking reverse direction
    let isReverse = direction === "asc" ? 1 : -1;
    // sorting data
    parseData.sort((x, y) => {
      x = keyValue(x) ? keyValue(x) : ""; // handling null values
      y = keyValue(y) ? keyValue(y) : "";
      // sorting values based on direction
      return isReverse * ((x > y) - (y > x));
    });
    this.checkInData = parseData;
  }

  // connectedCallback() {
  //     console.log('Runnnnnn');

  // }

  // ----------------------------------------------------------------------------------

  isLoading = false;
  @track isResultEmpty = false;
  @track weekwindow;
  @track monthWindow = true;
  @track teacherName;
  @track teacherName1;
  @track date;
  @track dates;
  @track reqMonth;
  @track reqYear;
  @track NumberreqMonth;
  @track NumberreqMonth1;
  @track numberOfDays;
  @track dateWeek;
  @track data;
  @track countP = 0;
  @track countA = 0;
  @track monthAndTeacherSelected = false;
  @track isSubmitted = false;
  @track isFirstclick = true;
  @track dataweek;
  @track data2;
  @track LastDate;
  @track StartDate;
  NextMonth;
  PrevMonth;
  NextWeek;
  PrevWeek;
  @track isWeek = false;
  @track isMonth = true;
  @track monthName;
  @track weekName;
  @track heading;
  @track StartDateWeek;
  @track StartMonthWeek;
  @track LastDateWeek;
  @track LastMonthWeek;
  @track header;

  handleTeacherChange(event) {
    this.teacherName = event.detail.value;
    this.teacherName1 = event.detail.value;
    // console.log(this.teacherName);
    // console.log(typeof this.teacherName);
    if (
      this.teacherName != null &&
      this.teacherName != undefined &&
      this.date != null &&
      this.date != undefined
    ) {
      this.monthAndTeacherSelected = true;
      this.submitStaffReport();
    }
    // if (event.detail.label == 'All') {
    //     this.submitStaffReport();
    // }
  }

  //.......................
  // teacherReportAll;
  // uniqueTeacherTeports;
  // teacherReports;
  // newListObj = [];
  // @track allcondition = false;
  // @track keyss;
  // @track valuess;

  //.......................

  connectedCallback() {
    const i = 0;
    var today = new Date();
    var mm = today.getMonth() + 1;
    mm < 10 ? (mm = "0" + mm) : mm;
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm;
    console.log("today", today);

    //.......................

    //........................
  }

  get numberDays() {
    if (this.NumberreqMonth == 2 && this.NumberreqYear % 4 == 0) {
      return 29;
    } else if (this.NumberreqMonth == 2 && this.NumberreqYear % 4 != 0) {
      return 28;
    } else if (
      this.NumberreqMonth == 4 ||
      this.NumberreqMonth == 6 ||
      this.NumberreqMonth == 9 ||
      this.NumberreqMonth == 11
    ) {
      return 30;
    } else {
      return 31;
    }
  }

  monthHandler(event) {
    //const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.date = event.detail.value;
    console.log("date", this.date);
    this.reqMonth = Number(this.date.split("-")[1]);
    this.reqYear = this.date.split("-")[0];
    this.NumberreqYear = Number(this.reqYear);
    this.NumberreqMonth = Number(this.reqMonth);
    console.log("this.NumberreqMonth", this.NumberreqMonth);

    if (this.NumberreqMonth == 2 && this.NumberreqYear % 4 == 0) {
      this.numberOfDays = 29;
    } else if (this.NumberreqMonth == 2 && this.NumberreqYear % 4 != 0) {
      this.numberOfDays = 28;
    } else if (
      this.NumberreqMonth == 4 ||
      this.NumberreqMonth == 6 ||
      this.NumberreqMonth == 9 ||
      this.NumberreqMonth == 11
    ) {
      this.numberOfDays = 30;
    } else {
      this.numberOfDays = 31;
    }
    console.log(this.numberOfDays);
    console.log("NumberReqMonth", this.NumberreqMonth);
    if (
      this.teacherName != null &&
      this.teacherName != undefined &&
      this.date != null &&
      this.date != undefined
    ) {
      this.monthAndTeacherSelected = true;
      this.submitStaffReport();
    }
  }

  openWeek() {
    this.isLoading = true;
    this.weekwindow = true;
    this.monthWindow = false;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    this.isWeek = true;
    this.isMonth = false;
    this.isResultEmpty = false;
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", " Frii", "Sat"];

    this.countP = 0; // to reset the number of present and absent on clicking submit button
    this.countA = 0;
    console.log("Donald");
    AttendanceStatusPerWeek({
      teacherName1: this.teacherName,
      next: false,
      previous: false
    })
      .then((result) => {
        this.data = result;
        console.log("result", this.data);
        if (result.length > 0) {
          // this.data1 = JSON.parse(JSON.stringify(this.data)).map((item) => {
          console.log("Hii");
          this.data1 = JSON.parse(JSON.stringify(this.data)).map((item) => {
            item.Status__c = "Present" ? this.countP++ : this.countA++;

            let newDate = item.Date__c;

            console.log("newDate", newDate);
            // let index = newDate.getDay();
            // console.log('index', index);

            item.Date = newDate.split("-")[2];
            console.log("item.Date", item.Date);

            this.StartDate = this.data[0].Date__c;
            this.LastDate = this.data[this.data.length - 1].Date__c;
            console.log("SFEHT", this.StartDate);
            console.log(this.LastDate);
            this.StartDateWeek = this.StartDate.split("-")[2];
            this.StartMonthWeek =
              this.StartDate.split("-")[1].split("-")[1] == 0
                ? months[this.StartDate.split("-")[1].split("-")[1] - 1]
                : months[this.StartDate.split("-")[1] - 1];
            console.log(this.StartDateWeek);
            console.log(this.StartMonthWeek);
            this.LastDateWeek = this.LastDate.split("-")[2];
            this.LastMonthWeek =
              this.LastDate.split("-")[1].split("-")[1] == 0
                ? months[this.LastDate.split("-")[1].split("-")[1] - 1]
                : months[this.LastDate.split("-")[1] - 1];
            console.log(this.LastDateWeek);
            this.heading =
              this.StartMonthWeek +
              "/" +
              this.StartDateWeek +
              " - " +
              this.LastMonthWeek +
              "/" +
              this.LastDateWeek;
            console.log("this.data", this.data1);

            return {
              Id: item.Id,
              Date: item.Date,
              Status: item.Status__c == "Present" ? "P" : "A"
            };
          });
        } else if (result.length == 0) {
          this.isResultEmpty = true;
        }
        this.isLoading = false;
      })

      .catch((err) => {
        this.err = err;
        this.isLoading = false;
      });
  }

  openMonth() {
    this.monthWindow = true;
    this.weekwindow = false;
    this.isMonth = true;
    this.isWeek = false;
    this.submitStaffReport();
  }

  //....................... for all teachers
  //     groupBy(objectArray, property) {
  //         return objectArray.reduce((acc, obj) => {
  //            const key = obj[property];
  //            if (!acc[key]) {
  //               acc[key] = [];
  //            }
  //            // Add object to list for given key's value
  //            acc[key].push(obj);
  //            return acc;
  //     }, {});
  // }

  // teacherReportFinal;
  // newMethodCreated(){
  //     console.log('inside new method');
  //     console.log('inside report data', this.teacherReportAll);
  //................................................. for all teachers

  // this.teacherReportAll = this.teacherReportAll.map(item => {
  //         const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Frii', 'Sat'];
  //         let index = new Date(item.Date__c).getDay();
  //         return {
  //             Id: item.Id,
  //             Date: days[index] + '  ' + item.Date__c.split('-')[2],
  //             Status: item.Status__c == "Present" ? "P" : "A",
  //             TeacherNames: item.Staff_Name__r.Name,

  //         }
  //     });
  //     console.log('element: ' + this.teacherReportAll);

  // this.teacherReportFinal.filter(teach => {
  //     for(let i = 0; i < this.teacherReportAll.length; i++){
  //     teach.TeacherNames == this.keyss[i];
  //     this.teacherReportFinal.push(
  //         teach.map(item=> {
  //             return{
  //                 Id: item.Id,
  //                 Status: item.Status,
  //                 Date: item.Date
  //             }
  //         }
  //         )
  //     );
  // }
  //     console.log('element1: ' + JSON.stringify(this.teacherReportAll));
  // });
  //.....................................

  // console.log("resultCheck",result);
  //.......................

  submitStaffReport() {
    this.isLoading = true;

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    // this.allcondition = true;
    // this.isResultEmpty = false;

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Frii", "Sat"];
    // console.log('Number', this.NumberreqMonth);
    // console.log(months[this.NumberreqMonth - 1]);
    this.heading = months[this.NumberreqMonth - 1] + "/" + this.NumberreqYear;
    this.countA = 0;
    this.countP = 0; // to reset the number of present and absent on clicking submit button
    AttendanceStatus({
      NumberreqMonth: this.NumberreqMonth,
      teacherName: this.teacherName,
      next: false,
      previous: false
    })
      .then((result) => {
        if (result.length > 0) {
          // this.teacherReportAll = result;
          this.data = result;

          // ----------------------------------------------------------------------
          console.log("data.length", this.data.length);
          let lastDatee = new Date(this.data[this.data.length - 1].Date__c);
          console.log("lastDatee", lastDatee);
          let noOfDaysToAdd = this.numberOfDays - this.data.length;
          console.log("noOfDaysToAdd", noOfDaysToAdd);
          for (let i = 0; i < noOfDaysToAdd; i++) {
            console.log("lastDateeInsideLoop", lastDatee);
            let obj = {
              Date__c: lastDatee,
              Status__c: "NA"
            };
            lastDatee.setDate(lastDatee.getDate() + 1);
            this.data.push(obj);
            console.log("obj", obj, i);
          }
          console.log("dataAfferAdding", JSON.stringify(this.data));
          // ----------------------------------------------------------------------

          this.numberOfDays;
          this.data2 = JSON.parse(JSON.stringify(this.data)).map((item) => {
            item.Status__c == "Present" ? this.countP++ : this.countA++;
            item.numberOfDays == this.numberOfDays;
            let indexofDate = new Date(this.data).getDay();
            console.log("indexofDate", indexofDate);
            let indexofDates = new Date("2022-08-01").getDay();
            this.Date = days[indexofDate] + "  " + item.Date__c.split("-")[2];
            this.Status = item.Status__c == "Present" ? "P" : "A";
            console.log("Hii", this.data.length);
            let Date1 = item.Date__c.split("-")[2];
            let Status = item.Status__c == "Present" ? "P" : "A";
            console.log(this.Status);
            console.log("this.data11", this.data1);
            // console.log(index);

            // console.log('Hiiii',days[index]);
            // console.log('noOfDays',this.numberOfDays);

            let objj = [];
            for (let i = 1; i <= this.numberOfDays; i++) {
              if (indexofDates > 6) {
                indexofDates = 0;
              } else if (indexofDates < 0) {
                indexofDates = 6;
                indexofDates--;
              }

              objj.push({
                Dates: days[indexofDates] + "  " + i,
                Status: "NA"
              });
              indexofDates++;
              // console.log(objj);
              // console.log('Header', JSON.stringify(this.header));
            }
            this.header = objj;
            this.LastDate = this.data[this.data.length - 1].Date__c;
            this.StartDate = this.data[0].Date__c;

            this.isResultEmpty = false;

            // let mappedObj = [];
            // console.log(mappedObj);
            // for (let j = 0; j <= this.data.length; j++) {
            //     mappedObj.push({
            //         Date1: this.Status,
            //     })
            //     if (this.Date1 != this.Dates) {
            //         Status = 'N/A';
            //     }
            //     console.log(mappedObj);
            // }
            // console.log(mappedObj);
            // console.log('Hii', this.Date);
            return {
              header: this.objj,
              Id: item.Id,
              Date: item.Day + "  " + Date1,
              Date: this.Dates,
              Status:
                item.Status__c == "Present"
                  ? "P"
                  : item.Status__c == "NA"
                  ? "NA"
                  : "A",
              // Date: days[index] + '  ' + item.Date__c.split('-')[2],
              numberOfDays: item.numberOfDays
            };
          });

          console.log("data2", JSON.stringify(this.data2));
          // this.newMethodCreated();
        } else if (result.length == 0) {
          this.isResultEmpty = true;
        }
        // this.heading = this.months[this.NumberreqMonth - 1];
        //................................... for all teachers
        // this.teacherReportAll = this.teacherReportAll.map(item => {
        //     const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Frii', 'Sat'];
        //     let index = new Date(item.Date__c).getDay();
        //     return {
        //         Id: item.Id,
        //         Date: days[index] + '  ' + item.Date__c.split('-')[2],
        //         Status: item.Status__c == "Present" ? "P" : "A",
        //         TeacherNames: item.Staff_Name__r.Name,

        //     }
        // })

        // this.uniqueTeacherReports = Array.from(new Set(this.teacherReportAll.map(x => x.TeacherNames)));
        // console.log('uniqueTeacherReports',this.uniqueTeacherReports);

        // this.teacherReportsDate = Array.from(new Set(this.teacherReportAll.map(x => x.Date)));
        // console.log('teacherReportsDate',this.teacherReportsDate);

        // console.log("this.teacherReportAll without group",this.teacherReportAll);
        // this.teacherReportAll = this.groupBy(this.teacherReportAll, 'TeacherNames');
        // this.newListObj.push(this.teacherReportAll);
        // console.log("this.teacherReportAll",this.teacherReportAll);
        // // this.keyss = Object.keys(this.teacherReportAll);
        // // console.log("keyss",this.keyss);
        // // this.valuess = Object.values(this.teacherReportAll);
        // // console.log("values",this.valuess);
        // let keysss = [];
        // let valuesss = [];
        // for(let k in this.teacherReportAll) {
        //     keysss.push(k);
        //     valuesss.push(this.teacherReportAll[k]);
        // }
        // this.keyss = keysss;
        // this.valuess = valuesss;
        // console.log("keysss", keysss);
        // console.log("valuesss", valuesss);

        //.......................................
        this.isLoading = false;
      })
      .catch((err) => {
        this.err = err;
        this.isLoading = false;
      });
  }

  leftcontrol() {
    this.NumberreqMonth--;
    this.isLoading = true;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    console.log("data22", this.data1);
    this.isResultEmpty = false;
    this.PrevMonth = this.NumberreqMonth;
    console.log("HiiP", this.PrevMonth);
    console.log("HelloP", this.NumberreqMonth);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Frii", "Sat"];
    console.log(this.StartDate);
    this.countP = 0; // to reset the number of present and absent on clicking submit button
    this.countA = 0;

    if (this.isWeek) {
      AttendanceStatusPerWeek({
        NumberreqMonth1: this.NumberreqMonth,
        teacherName1: this.teacherName,
        next: false,
        previous: true,
        isFirstclick: this.isFirstclick,
        dates: this.StartDate
      })
        .then((result) => {
          if (result.length > 0) {
            this.data = result;
            // ----------------------------------------------------------------------
            console.log("data.length", this.data.length);
            let lastDatee = new Date(this.data[this.data.length - 1].Date__c);
            console.log("lastDatee", lastDatee);
            let noOfDaysToAdd = 7 - this.data.length;
            console.log("noOfDaysToAdd", noOfDaysToAdd);
            for (let i = 0; i < noOfDaysToAdd; i++) {
              console.log("lastDateeInsideLoop", lastDatee);
              let obj = {
                Date__c: lastDatee,
                Status__c: "NA"
              };
              lastDatee.setDate(lastDatee.getDate() + 1);
              this.data.push(obj);
              console.log("obj", obj, i);
            }
            console.log("dataAfferAdding", JSON.stringify(this.data));
            // ----------------------------------------------------------------------

            this.data.reverse();
            console.log("newData", this.data);
            this.data1 = JSON.parse(JSON.stringify(this.data)).map((item) => {
              item.Status__c == "Present" ? this.countP++ : this.countA++;
              let index = new Date(item.Date__c).getDay();

              return {
                data1: this.data1,
                Id: item.Id,
                Date: days[index] + "  " + item.Date__c.split("-")[2],
                Status:
                  item.Status__c == "Present"
                    ? "P"
                    : item.Status__c == "NA"
                    ? "NA"
                    : "A"
              };
            });
            this.isFirstclick = false;
            this.LastDate = this.data[this.data.length - 1].Date__c;
            this.StartDate = this.data[0].Date__c;
            console.log(this.StartDate.split("-")[1]);
            console.log(9 >= 10);
            this.StartDateWeek = this.StartDate.split("-")[2];
            this.StartMonthWeek =
              this.StartDate.split("-")[1].split("-")[1] == 0
                ? months[this.StartDate.split("-")[1].split("-")[1] - 1]
                : months[this.StartDate.split("-")[1] - 1];

            console.log(this.StartDateWeek);
            console.log(this.StartMonthWeek);
            this.LastDateWeek = this.LastDate.split("-")[2];
            this.LastMonthWeek =
              this.LastDate.split("-")[1].split("-")[1] == 0
                ? months[this.LastDate.split("-")[1].split("-")[1] - 1]
                : months[this.LastDate.split("-")[1] - 1];
            console.log(this.LastMonthWeek);
            this.heading =
              this.StartMonthWeek +
              "/" +
              this.StartDateWeek +
              " - " +
              this.LastMonthWeek +
              "/" +
              this.LastDateWeek;
          } else if (result.length == 0) {
            this.isResultEmpty = true;
          }
          this.isLoading = false;
        })
        .catch((err) => {
          this.err = err;
          this.isLoading = false;
        });
    }

    if (this.isMonth) {
      if (this.PrevMonth < 1) {
        this.PrevMonth = 12;
        this.NumberreqMonth = 13;
        this.NumberreqYear--;
      }
      this.heading = months[this.PrevMonth - 1] + "/" + this.NumberreqYear;
      AttendanceStatus({
        NumberreqMonth: this.NumberreqMonth,
        teacherName: this.teacherName,
        next: false,
        previous: true,
        PrevMonth: this.PrevMonth
      })
        .then((result) => {
          console.log("result", result);
          if (result.length > 0) {
            this.data = result;

            // ----------------------------------------------------------------------
            console.log("data.length", this.data.length);
            let lastDatee = new Date(this.data[this.data.length - 1].Date__c);
            console.log("lastDatee", lastDatee);
            let noOfDaysToAdd = 7 - this.data.length;
            console.log("noOfDaysToAdd", noOfDaysToAdd);
            for (let i = 0; i < noOfDaysToAdd; i++) {
              console.log("lastDateeInsideLoop", lastDatee);
              let obj = {
                Date__c: lastDatee,
                Status__c: "NA"
              };
              lastDatee.setDate(lastDatee.getDate() + 1);
              this.data.push(obj);
              console.log("obj", obj, i);
            }
            console.log("dataAfferAdding", JSON.stringify(this.data));
            // ----------------------------------------------------------------------
            this.data2 = JSON.parse(JSON.stringify(this.data)).map((item) => {
              item.Status__c == "Present" ? this.countP++ : this.countA++;
              let index = new Date(item.Date__c).getDay();

              return {
                header: this.objj,
                Id: item.Id,
                Date: days[index] + "  " + item.Date__c.split("-")[2],
                Status:
                  item.Status__c == "Present"
                    ? "P"
                    : item.Status__c == "NA"
                    ? "NA"
                    : "A",
                numberOfDays: item.numberOfDays
              };
            });
            this.LastDate = this.data[this.data.length - 1].Date__c;
            this.StartDate = this.data[0].Date__c;
          } else if (result.length == 0) {
            this.isResultEmpty = true;
          }
          this.isLoading = false;
        })
        .catch((err) => {
          this.err = err;
          this.isLoading = false;
        });
      this.NumberreqMonth--;
    }
  }

  rightcontrol() {
    this.NumberreqMonth++;
    this.isLoading = true;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    this.isResultEmpty = false;
    this.NextMonth = this.NumberreqMonth;

    console.log("Hii", this.NextMonth);
    console.log("Hello", this.NumberreqMonth);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", " Frii", "Sat"];

    this.countP = 0; // to reset the number of present and absent on clicking submit button
    this.countA = 0;
    // console.log('rightcontrol');

    if (this.isWeek) {
      AttendanceStatusPerWeek({
        NumberreqMonth1: this.NumberreqMonth,
        teacherName1: this.teacherName,
        next: true,
        isFirstclick: this.isfirstclick,
        previous: false,
        dates: this.LastDate
      })
        .then((result) => {
          if (result.length > 0) {
            this.data = result;

            // ----------------------------------------------------------------------
            console.log("data.length", this.data.length);
            let lastDatee = new Date(this.data[this.data.length - 1].Date__c);
            console.log("lastDatee", lastDatee);
            let noOfDaysToAdd = 7 - this.data.length;
            console.log("noOfDaysToAdd", noOfDaysToAdd);
            for (let i = 0; i < noOfDaysToAdd; i++) {
              console.log("lastDateeInsideLoop", lastDatee);
              let obj = {
                Date__c: lastDatee,
                Status__c: "NA"
              };
              lastDatee.setDate(lastDatee.getDate() + 1);
              this.data.push(obj);
              console.log("obj", obj, i);
            }
            console.log("dataAfferAdding", JSON.stringify(this.data));
            // ----------------------------------------------------------------------
            // console.log('newData', this.data);
            this.data1 = JSON.parse(JSON.stringify(this.data)).map((item) => {
              this.Status__c = "Present" ? this.countP++ : this.countA++;
              let index = new Date(item.Date__c).getDay();
              return {
                data1: this.data1,
                Id: item.Id,
                Date: days[index] + "  " + item.Date__c.split("-")[2],
                Status:
                  item.Status__c == "Present"
                    ? "P"
                    : item.Status__c == "NA"
                    ? "NA"
                    : "A"
              };
            });
            this.LastDate = this.data[this.data.length - 1].Date__c;
            this.StartDate = this.data[0].Date__c;
            // console.log( this.StartDate);
            // console.log( this.LastDate);
            this.StartDateWeek = this.StartDate.split("-")[2];
            this.StartMonthWeek =
              this.StartDate.split("-")[1].split("-")[1] == 0
                ? months[this.StartDate.split("-")[1].split("-")[1] - 1]
                : months[this.StartDate.split("-")[1] - 1];
            // console.log(this.StartDateWeek);
            // console.log(this.StartMonthWeek);
            this.LastDateWeek = this.LastDate.split("-")[2];
            this.LastMonthWeek =
              this.LastDate.split("-")[1].split("-")[1] == 0
                ? months[this.LastDate.split("-")[1].split("-")[1] - 1]
                : months[this.LastDate.split("-")[1] - 1];
            // console.log(this.LastDateWeek);
            this.heading =
              this.StartMonthWeek +
              "/" +
              this.StartDateWeek +
              " - " +
              this.LastMonthWeek +
              "/" +
              this.LastDateWeek;
          } else if (result.length == 0) {
            this.isResultEmpty = true;
          }
          this.isLoading = false;
        })
        .catch((err) => {
          this.err = err;
          this.isLoading = false;
        });
    }

    if (this.isMonth) {
      if (this.NextMonth > 12) {
        this.NextMonth = 1;
        this.NumberreqMonth = 0;
        this.NumberreqYear++;
      }
      this.heading = months[this.NextMonth - 1] + "/" + this.NumberreqYear;

      AttendanceStatus({
        NumberreqMonth: this.NumberreqMonth,
        teacherName: this.teacherName,
        next: true,
        previous: false,
        NextMonth: this.NextMonth
      })
        .then((result) => {
          if (result.length > 0) {
            this.data = result;
            // ----------------------------------------------------------------------
            console.log("data.length", this.data.length);
            let lastDatee = new Date(this.data[this.data.length - 1].Date__c);
            console.log("lastDatee", lastDatee);
            let noOfDaysToAdd = this.numberDays - this.data.length;
            console.log("noOfDaysToAdd", noOfDaysToAdd);
            for (let i = 0; i < noOfDaysToAdd; i++) {
              console.log("lastDateeInsideLoop", lastDatee);
              let obj = {
                Date__c: lastDatee,
                Status__c: "NA"
              };
              lastDatee.setDate(lastDatee.getDate() + 1);
              this.data.push(obj);
              console.log("obj", obj, i);
            }
            console.log("dataAfferAdding", JSON.stringify(this.data));
            // ----------------------------------------------------------------------
            // console.log(this.data);

            this.data2 = JSON.parse(JSON.stringify(this.data)).map((item) => {
              item.Status__c == "Present" ? this.countP++ : this.countA++;
              let index = new Date(item.Date__c).getDay();
              // console.log(this.data1);
              // console.log('NumberReqMonth+1 ', this.NumberreqMonth + 1);

              // console.log('NextMonth', this.NextMonth);
              return {
                header: this.objj,
                Id: item.Id,
                Date: days[index] + "  " + item.Date__c.split("-")[2],
                Status:
                  item.Status__c == "Present"
                    ? "P"
                    : item.Status__c == "NA"
                    ? "NA"
                    : "A",
                numberOfDays: item.numberOfDays
              };
            });
            this.LastDate = this.data[this.data.length - 1].Date__c;
            this.StartDate = this.data[0].Date__c;
          } else if (result.length == 0) {
            this.isResultEmpty = true;
          }
          this.isLoading = false;
        })
        .catch((err) => {
          this.err = err;
          this.isLoading = false;
        });
    }
  }
}