import { LightningElement, api, track } from "lwc";

export default class SettingScreenView extends LightningElement {
  @api clicked = false;
  @track holidayListView;
  @track leaveTypeListView;
  @track login;
  @track alertListView;
  @track messagesListView;
  @track gradeSettingsView;

  connectedCallback() {
    console.log("Settings Page Loaded");
  }

  handleBack(e) {
    this.clicked = e.detail;
  }

  openCard(event) {
    this.clicked = true;
    this.login = false;
    this.alertListView = false;
    this.holidayListView = false;
    this.messagesListView = false;
    this.gradeSettingsView = false;
    this.leaveTypeListView = false;

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
      case "alertListView":
        this.alertListView = true;
        break;
      case "gradeSettingsView":
        this.gradeSettingsView = true;
        break;
      case "messagesListView":
        this.messagesListView = true;
        break;
      default:
        console.log("Sorry, we are out of data.");
    }
  }
}