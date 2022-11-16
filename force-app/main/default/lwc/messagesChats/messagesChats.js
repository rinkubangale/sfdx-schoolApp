import { LightningElement, track } from "lwc";

export default class MessagesChats extends LightningElement {
  @track isModalOpen = false;
  openModal() {
    this.isModalOpen = !this.isModalOpen;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  goBack() {
    this.dispatchEvent(
      new CustomEvent("backbtn", {
        detail: false
      })
    );
  }
}