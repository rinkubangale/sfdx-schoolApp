import { LightningElement, api, track } from "lwc";

export default class SettingScreenView extends LightningElement {
  @api clicked = false;
  @track holidayListView;

  connectedCallback() {
    console.log("Settings Page Loaded");
  }

  handleBack(e) {
    this.clicked = e.detail;
  }

  openCard(event) {
    this.clicked = true;
    this.holidayListView = false;

    switch (event.currentTarget.dataset.name) {
      case "holidayListView":
        this.holidayListView = true;
        break;
      default:
        console.log("Sorry, we are out of data.");
    }
  }
}
