import {
  LightningElement,
  track
} from 'lwc';



export default class ManageStudentTeacherSubject extends LightningElement {
  @track isSubjectOpen = false;
  @track isAssignTeacherOpen = false;
  @track isManageAllOpen = true;
  openModal() {
    this.isSubjectOpen = true;
    this.isManageAllOpen = false;
  }
  closeModal() {
    this.isSubjectOpen = false;
    this.isManageAllOpen = true;
  }
  openAssignTeacherModal() {
    this.isAssignTeacherOpen = true;
    this.isManageAllOpen = false;
  }
  
  closeAssignTeacherModal() {
    this.isAssignTeacherOpen = false;
    this.isManageAllOpen = true;
  }

  // handleModalChange(event) {
  //   this.isModalOpen = event.detail;

  // }
}