import { LightningElement, api, track } from "lwc";

export default class Notifications extends LightningElement {
  @api clicked = false;
  @track alertListView;
  @track messagesListView;

  connectedCallback() {
    console.log("Settings Page Loaded");
  }

  handleBack(e) {
    this.clicked = e.detail;
  }

  openCard(event) {
    this.clicked = true;
    this.alertListView = false;
    this.messagesListView = false;

    switch (event.currentTarget.dataset.name) {
      case "alertListView":
        this.alertListView = true;
        break;
      case "messagesListView":
        this.messagesListView = true;
        break;
      default:
        console.log("Sorry, we are out of data.");
    }
  }
}
