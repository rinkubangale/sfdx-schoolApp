import { LightningElement, api, track } from "lwc";

export default class SettingScreenView extends LightningElement {
  @api clicked = false;
  @track holidayListView;
  @track leaveTypeListView;
  @track login;

  connectedCallback() {
    console.log("Settings Page Loaded");
  }

  handleBack(e) {
    this.clicked = e.detail;
  }

  openCard(event) {
    this.clicked = true;
    this.holidayListView = false;
    this.leaveTypeListView = false;
    this.login = false;

    switch (event.currentTarget.dataset.name) {
      case "holidayListView":
        this.holidayListView = true;
        break;
      case "leaveTypeListView":
        this.leaveTypeListView = true;
        break;
      case "login":
        this.login = true;
        break;
      default:
        console.log("Sorry, we are out of data.");
    }
  }
}