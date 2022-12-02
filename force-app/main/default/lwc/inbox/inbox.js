import { track, LightningElement } from "lwc";

export default class Inbox extends LightningElement {
  viewInbox = true;
  @track user;
  @track details = false;
  @track details2 = false;
  handleViewCard(e) {
    this.user = e.target.user;
    this.details = true;
    this.details2 = false;
  }
  handleViewCard2(e) {
    this.user = e.target.user;
    this.details2 = true;
    this.details = false;
  }
}
