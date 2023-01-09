import { LightningElement } from "lwc";

export default class StudentAttendance extends LightningElement {
  closeStudentPopup() {
    this.dispatchEvent(new CustomEvent("close", { detail: false }));
  }
}