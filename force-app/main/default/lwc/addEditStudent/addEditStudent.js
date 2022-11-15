import { LightningElement } from "lwc";

export default class AddEditStudent extends LightningElement {
  headTitle = "Add Student";
  addStudentRecord() {
    console.log("Wait..., No hurry I will work some day!");
  }

  handleModalChange() {
    this.dispatchEvent(new CustomEvent("modalchange", { detail: false }));
  }
}
