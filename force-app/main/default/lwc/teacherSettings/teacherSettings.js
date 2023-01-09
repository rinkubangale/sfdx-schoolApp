import { LightningElement, api, track } from "lwc";

export default class TeacherSettings extends LightningElement {
  @api clicked = false;
  @track gradeListView;

  connectedCallback() {
    console.log("Settings Page Loaded");
  }

  handleBack(e) {
    this.clicked = e.detail;
  }

  openCard(event) {
    this.clicked = true;
    this.gradeListView = false;

    switch (event.currentTarget.dataset.name) {
      case "gradeListView":
        this.gradeListView = true;
        break;
      default:
        console.log("Sorry, we are out of data.");
    }
  }
}