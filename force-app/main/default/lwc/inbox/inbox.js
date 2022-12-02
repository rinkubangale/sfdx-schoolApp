import { track, LightningElement } from "lwc";

export default class Inbox extends LightningElement {
  viewInbox = true;
  @track user;
  handleViewCard(e) {
    console.log(e.target.user);
    this.user = e.target.user;
  }
}
