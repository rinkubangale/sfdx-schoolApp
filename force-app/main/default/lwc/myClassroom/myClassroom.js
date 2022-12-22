import { LightningElement, track } from "lwc";

const actions = [
  {
    label: "edit",
    name: "edit",
    iconName: "utility:edit",
    alternativeText: "edit",
    title: "edit"
  },
  {
    label: "Delete",
    name: "delete",
    iconName: "utility:delete",
    alternativeText: "Delete",
    title: "Delete"
  }
];

const columns = [
  {
    label: "Name",
    fieldName: "Name"
  },
  {
    label: "Class",
    fieldName: "Class"
  },
  {
    label: "Subject",
    fieldName: "Subject"
  },
  {
    label: "Start Date",
    fieldName: "StartDate"
  },
  {
    label: "Submission Date",
    fieldName: "SubmissionDate"
  },
  {
    label: "Status",
    fieldName: "Status"
  },
  {
    type: "action",
    typeAttributes: {
      rowActions: actions
    }
  }
];

export default class MyClassroom extends LightningElement {
  @track isTimetable = false;
  @track showPerformance = false;
  @track showAcademics = false;
  @track showCurricular = false;
  @track showAttendance = false;
  @track showPopup = false;
  @track columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  @track gradeSetup = false;

  @track
  dataList = [
    {
      Name: "Srihari N",
      Class: "LKG-A",
      Subject: "Science",
      StartDate: "22-Jan-2022",
      SubmissionDate: "11-Feb-2022",
      Status: "Completed"
    }
  ];
  column = columns;
  @track showTTSetup = false;
  handleTTSetup() {
    this.showTTSetup = !this.showTTSetup;
  }
  handleGradeSetup() {
    this.gradeSetup = !this.gradeSetup;
  }
  handleNoColumn(e) {
    this.columns = new Array(+e.target.value).fill(0);
    console.log(this.columns, e.target.value);
  }
  showTimetable() {
    this.isTimetable = true;
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }
  togglePerformance() {
    this.showPerformance = !this.showPerformance;
  }
  toggleAcademics() {
    this.showAcademics = true;
    this.showCurricular = false;
    this.showAttendance = false;
  }
  toggleCurricular() {
    this.showCurricular = true;
    this.showAcademics = false;
    this.showAttendance = false;
  }
  toggleAttend() {
    this.showAttendance = true;
    this.showCurricular = false;
    this.showAcademics = false;
  }
  calendarView = false;
  openCalendar() {
    this.calendarView = !this.calendarView;
  }
}
