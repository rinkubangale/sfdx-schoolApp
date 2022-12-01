import {
  LightningElement,
  track
} from 'lwc';

export default class AssignTeachers extends LightningElement {
  @track isModalOpen = false;

  @track headTitle = "Assign Teachers";


  get btnLabel() {
    return this.headTitle;
  }

  openModal() {
    this.isModalOpen = !this.isModalOpen;
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
  handleModalChange() {
    this.dispatchEvent(new CustomEvent("modalchange", {
      detail: false
    }));
  }



}