import { LightningElement, api, track } from "lwc";
export default class AddPromoteStudent extends LightningElement {


  @api fields;
  @api headTitle = 'Promote Student';
  @api objectName;
  @api subHeadTitle;
  @track allFields;
  @track isLoading = false;

  
    goBack() {
        // history.back();
        this.dispatchEvent(
          new CustomEvent("backbtn", {
            detail: false
          })
        );
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
      handleModalChange(event) {
        this.isModalOpen = event.detail;
      }
      @track isModalOpen;
      @track createmodal;
}