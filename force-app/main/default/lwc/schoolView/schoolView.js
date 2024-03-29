import { LightningElement, track, wire } from "lwc";
import createAttendanceRecord from "@salesforce/apex/userLoginController.createAttendanceRecord";
import getAttendanceRecord from "@salesforce/apex/userLoginController.getAttendanceRecord";
import getUserBirthdayData from "@salesforce/apex/userLoginController.getUserBirthdayData";
import getListOfHolidays from "@salesforce/apex/userLoginController.getListOfHolidays";
import { getRecord } from "lightning/uiRecordApi";
import Id from "@salesforce/user/Id";
import ProfileId from "@salesforce/schema/User.ProfileId";

export default class SchoolView extends LightningElement {
  @track clockInLabel = "Clock In";
  @track sinceLogin = "0h:00m";
  @track timer = new Date().toLocaleTimeString();
  @track dateToday = `${Date().split(" ")[0]} ${Date().split(" ")[2]}, ${
    Date().split(" ")[1]
  } ${Date().split(" ")[3]}`;
  loginTime;
  logoutTime;
  clockInterval;
  sinceLoginInterval;
  attendanceRecordId = "";
  birthdayDate;
  @track holidaysData = [];
  @track userData = [];
  data1 = [
    {
      Id: 1,
      Name: "Dhinakar",
      firstLetter: "D",
      totalMessages: "2",
      section: "A",
      class: "9"
    },
    {
      Id: 2,
      Name: "Jagdish",
      firstLetter: "J",
      totalMessages: "3",
      section: "A",
      class: "9"
    },
    {
      Id: 3,
      Name: "Shubhendra",
      firstLetter: "S",
      totalMessages: "4",
      section: "A",
      class: "9"
    },
    {
      Id: 1,
      Name: "Srihari",
      firstLetter: "S",
      totalMessages: "2",
      section: "A",
      class: "9"
    },
    {
      Id: 2,
      Name: "Abhilash",
      firstLetter: "A",
      totalMessages: "3",
      section: "A",
      class: "9"
    },
    {
      Id: 3,
      Name: "Subish",
      firstLetter: "S",
      totalMessages: "4",
      section: "A",
      class: "9"
    },
    {
      Id: 3,
      Name: "Rinku",
      firstLetter: "R",
      totalMessages: "4",
      section: "A",
      class: "9"
    },
    {
      Id: 1,
      Name: "Nagaratna",
      firstLetter: "N",
      totalMessages: "2",
      section: "A",
      class: "9"
    },
    {
      Id: 2,
      Name: "Sujitha",
      firstLetter: "S",
      totalMessages: "3",
      section: "A",
      class: "9"
    }
  ];

  get classStyleBtn() {
    return this.clockInLabel === "Clock Out" ? "brand-outline" : "brand";
  }

  isTeacher;
  @wire(getRecord, { recordId: Id, fields: [ProfileId] })
  userDetails({ error, data }) {
    if (data) {
      // console.log("currProfile " + JSON.stringify(data));
      this.isTeacher =
        data.fields.ProfileId.value === "00e6D000000Ri7wQAC" ? true : false;
    } else if (error) {
      this.error = error;
    }
  }

  connectedCallback() {
    console.log("User Profile id is ", ProfileId);

    this.clockInterval = setInterval(() => {
      this.timer = new Date().toLocaleTimeString();
    }, 1000);

    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    function birthdayDate(bDay) {
      bDay = bDay.split("-");
      return `${bDay[2]} ${months[bDay[1] - 1]}`;
    }

    getAttendanceRecord()
      .then((result) => {
        console.log("ccc", result);
        result.forEach((item) => {
          this.loginTime = +item.Check_In__c;
          this.logoutTime = +item.Check_Out__c;
          this.attendanceRecordId = item.Id;
          this.clockInLabel = "Clock Out";
        });
        // console.log('aaa', this.logoutTime, isNaN(this.logoutTime));
        if (isNaN(this.logoutTime) || this.logoutTime === undefined) {
          this.sinceLoginInterval = setInterval(() => {
            let duration =
              Number(new Date().getTime()) - Number(this.loginTime);
            this.sinceLogin =
              this.loginTime == undefined ? "0h:00m" : this.msToTime(duration);
            console.log(this.sinceLogin);
          }, 1000);
        }
        if (
          this.logoutTime != "" &&
          this.logoutTime != null &&
          this.logoutTime != undefined &&
          !isNaN(this.logoutTime)
        ) {
          clearInterval(this.sinceLoginInterval);
          this.clockInLabel = "Clock In";
          this.sinceLogin =
            this.loginTime === undefined
              ? "0h:00m"
              : this.msToTime(Number(this.logoutTime) - Number(this.loginTime));
        }
      })
      .catch((err) => {
        console.log(err);
      });

    getUserBirthdayData()
      .then((result) => {
        this.userData = result.map((item) => {
          return {
            Name: item.Name,
            Id: item.Id,
            MediumPhotoUrl: item.MediumPhotoUrl,
            Birthday__c: birthdayDate(item.Birthday__c)
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });

    function setHolidayDate(hday) {
      hday = hday.split("-");
      return `${hday[2]} ${months[hday[1] - 1]}`;
    }

    function setHolidayDay(hday) {
      const d = new Date(hday);
      return days[d.getDay()];
    }
    getListOfHolidays()
      .then((res) => {
        console.log(res);
        this.holidaysData = res.map((holiday) => {
          return {
            Id: holiday.Id,
            Name: holiday.Name,
            date:
              holiday.Leave_Date__c && setHolidayDate(holiday.Leave_Date__c),
            day: holiday.Leave_Date__c && setHolidayDay(holiday.Leave_Date__c)
          };
        });
      })
      .catch((err) => console.error(err));
  }

  msToTime(duration) {
    let minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}h:${minutes}m`;
  }

  handleClick() {
    if (this.clockInLabel === "Clock Out") {
      this.clockInLabel = "Clock In";
      this.sinceLogin = "0h:00m";
      //call apex method here to update check out!!
      createAttendanceRecord({
        checkInTime: "" + this.loginTime,
        checkOutTime: "" + new Date().getTime(),
        recordIds: this.attendanceRecordId
      })
        .then((res) => {
          this.attendanceRecordId = res;
          clearInterval(this.sinceLoginInterval);
          console.log("Record Saved Success", res);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      this.clockInLabel = "Clock Out";
      this.loginTime = this.loginTime === undefined && new Date().getTime();
      //call apex method here to add check in!!
      createAttendanceRecord({
        checkInTime: "" + this.loginTime,
        checkOutTime: "",
        recordIds: this.attendanceRecordId
      })
        .then((res) => {
          this.attendanceRecordId = res;
          console.log("Record Saved Success", res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  //....................Chat ScreenContainer

  @track openChats = false;
  @track userDetails;

  toggleChatWindow(e) {
    this.openChats = !this.openChats;
    this.userDetails = {
      Name: e.currentTarget.dataset.name,
      section: e.currentTarget.dataset.section,
      class: e.currentTarget.dataset.class
    };
  }
  //....................Chat ScreenContainer

  @track holidayImg = [
    {
      title: "Gudi Padwa",
      class: "gudi"
    },
    {
      title: "Republic Day",
      class: "republicDay"
    },
    {
      title: "Shivratri",
      class: "shivratri"
    },
    {
      title: "Holi",
      class: "holi"
    },
    {
      title: "Maha Ashtami",
      class: "ashtami"
    },
    {
      title: "Rama Navami",
      class: "navami"
    },
    {
      title: "Raksha Bandhan",
      class: "rakshaBandhan"
    }
  ];

  @track listDisplay = false;
  @track grxDisplay = true;
  handleListGxBtn(e) {
    this.listDisplay = e.currentTarget.dataset.name === "list" ? true : false;
    this.grxDisplay = e.currentTarget.dataset.name === "grx" ? true : false;
  }
  movePrev() {
    let anchor = this.template.querySelector(".imgFlexScroll");
    anchor.scrollLeft -= 420;
  }
  moveNext() {
    let anchor = this.template.querySelector(".imgFlexScroll");
    anchor.scrollLeft += 420;
  }

  // Like click button

  likedMe(e) {
    if (e.target.style.fontWeight === "bold") {
      e.target.style.color = "black";
      e.target.style.fontWeight = "400";
      return;
    }
    e.target.style.color = "#0176d3";
    e.target.style.fontWeight = "bold";
  }

  //redirect to inbox
  openInbox() {
    // this.dispatchEvent(new CustomEvent("redirectinbox", { detail: false }));
  }
}