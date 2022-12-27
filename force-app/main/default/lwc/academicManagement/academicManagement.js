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

export default class AcademicManagement extends LightningElement {
  @track isTimetable = false;
  @track showPerformance = false;
  @track showAcademics = false;
  @track showCurricular = false;
  @track showAttendance = false;
  @track showPopup = false;
  @track columns = [
    {
      sr: "1",
      strtime: "9:00",
      endtime: "9:40",
      subject: "English"
    },
    {
      sr: "2",
      strtime: "9:45",
      endtime: "10:30",
      subject: "Tamil"
    },
    {
      sr: "3",
      strtime: "10:30",
      endtime: "11:15",
      subject: "Hindi"
    },
    {
      sr: "Free Time",
      strtime: "11:15",
      endtime: "11:30",
      subject: "Break"
    },
    {
      sr: "4",
      strtime: "11:30",
      endtime: "12:00",
      subject: "EVS"
    },
    {
      sr: "5",
      strtime: "12:00",
      endtime: "12:45",
      subject: "PT"
    },
    {
      sr: "Free Time",
      strtime: "12:45",
      endtime: "1:15",
      subject: "Lunch"
    },
    {
      sr: "6",
      strtime: "1:15",
      endtime: "2:00",
      subject: "Biology"
    },
    {
      sr: "7",
      strtime: "2:00",
      endtime: "2:45",
      subject: "Physics"
    }
  ];
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
