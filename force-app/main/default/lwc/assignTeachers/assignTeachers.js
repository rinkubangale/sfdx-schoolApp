import { LightningElement } from 'lwc';

export default class AssignTeachers extends LightningElement {
    handleModalChange() {
        this.dispatchEvent(new CustomEvent("modalchange", {
          detail: false
        }));
      }

      headTitle = "Assign Teachers";
      subHeadTitle = "Assign Teachers here";

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
 handelModel(){
    this.createmodal = !this.createmodal;
 }
 

}