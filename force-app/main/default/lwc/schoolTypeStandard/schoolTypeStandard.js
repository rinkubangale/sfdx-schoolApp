import { LightningElement, track,wire} from 'lwc';

const columns1 = [
    { label: "School Type", fieldName: "Name" },
    { label: "LastModifiedBy", fieldName: "LastModifiedByName" },
    { label: "LastModifiedDate", fieldName: "LastModifiedDate" }
  ];
export default class SchoolTypeStandard extends LightningElement {
    columns1 = columns1;
    @track isModalOpen = false;
   
    @track DepartmentList;
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
    
}