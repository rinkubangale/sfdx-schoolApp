import { LightningElement, api, track } from "lwc";

export default class SchoolRegister extends LightningElement {
  @api fields;
  @api headTitle='You are registering as';
  @api objectName;
  @api subHeadTitle = 'School/institution';
  @track allFields;
  @track isLoading = false;

  get btnLabel() {
    return this.headTitle;
  }

  @track isModalOpen = false;
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
  handleModalChange() {
    this.dispatchEvent(new CustomEvent("modalchange", { detail: false }));
  }

  handleLoading() {
    this.isLoading = false;
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