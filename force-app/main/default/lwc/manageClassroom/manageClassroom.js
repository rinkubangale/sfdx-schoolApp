import {
  LightningElement,
  track,
  wire
} from "lwc";
import listClass from "@salesforce/apex/listClass.listClass";

export default class ManageClassroom extends LightningElement {
  @track isClassSectionOpen = true;
  @track isManageAllOpen = false;
  @track isAddClassOpen = false;
  @track modalopen;
  @track createmodal;

  openClassModal() {
    this.isClassSectionOpen = false;
    this.isAddClassOpen = true;
  }

  closeClassModal() {
    this.isClassSectionOpen = true;
    this.isAddClassOpen = false;
  }
  openModal() {
    // to open modal set isModalOpen tarck value as true
    this.isManageAllOpen = true;
    this.isClassSectionOpen = false;
  }
  closeModal() {
    // to close modal set isModalOpen tarck value as false
    this.isManageAllOpen = false;
    this.isClassSectionOpen = true;
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