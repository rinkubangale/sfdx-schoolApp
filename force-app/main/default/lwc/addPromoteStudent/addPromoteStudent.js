import { LightningElement, api, track } from "lwc";
const columns = [
    { label: 'STUDENT NAME', fieldName: 'Name'},
    { label: 'FROM CLASS', fieldName: 'FROM_CLASS' },
    { label: 'FROM SECTION', fieldName: 'FROM_SECTION' },
    { label: 'CURRENT ACADEMIC YEAR', fieldName: 'CURRENT_ACADEMIC_YEAR'},
];
export default class AddPromoteStudent extends LightningElement {

    columns=columns;
  @api fields;
  @api headTitle = 'Promote Students';
  @track headTitle = 'Promote Students';
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