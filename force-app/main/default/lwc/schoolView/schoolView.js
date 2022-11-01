import { LightningElement, track } from "lwc";
import createAttendanceRecord from "@salesforce/apex/userLoginController.createAttendanceRecord";
import getAttendanceRecord from "@salesforce/apex/userLoginController.getAttendanceRecord";
import getUserBirthdayData from "@salesforce/apex/userLoginController.getUserBirthdayData";
import getListOfHolidays from "@salesforce/apex/userLoginController.getListOfHolidays";

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

  get classStyleBtn() {
    return this.clockInLabel === "Clock Out" ? "brand-outline" : "brand";
  }
  connectedCallback() {
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
}
