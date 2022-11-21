import { LightningElement, track, wire } from "lwc";
import listClass from "@salesforce/apex/listClass.listClass";

export default class ManageClassroom extends LightningElement {
  @track modalopen;
  @track createmodal;
  openModal() {
    // to open modal set isModalOpen tarck value as true
    this.isModalOpen = true;
  }
  closeModal() {
    // to close modal set isModalOpen tarck value as false
    this.isModalOpen = false;
  }
  submitDetails() {
    // to close modal set isModalOpen tarck value as false
    //Add your code to call apex method or do some processing
    this.isModalOpen = false;
  }
  handelModel() {
    this.createmodal = !this.createmodal;
    console.log("check" + this.createmodal);
  }
  handleModalChange(event) {
    this.isModalOpen = event.detail;
  }
  goBack() {
    // history.back();
    this.dispatchEvent(
      new CustomEvent("backbtn", {
        detail: false
      })
    );
  }
}