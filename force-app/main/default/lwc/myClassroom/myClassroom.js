import { LightningElement, track } from "lwc";

export default class MyClassroom extends LightningElement {
  @track isTimetable = false;
  @track showPerformance = false;
  @track showAcademics = false;
  @track showCurricular = false;
  @track showAttendance = false;
  @track showPopup = false;
  @track columns = [0, 0, 0, 0, 0];
  @track gradeSetup = false;
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
}
