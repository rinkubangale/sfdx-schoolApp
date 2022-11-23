import {
  LightningElement,
  track
} from 'lwc';



export default class ManageStudentTeacherSubject extends LightningElement {
  @track isSubjectOpen = false;
  @track isAssignTeacherOpen = false;
  @track isManageAllOpen = true;
  @track isShowModal = false;
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

  goBack() {
    // history.back();
    this.dispatchEvent(
      new CustomEvent("backbtn", {
        detail: false
      })
    );
  }
 

  showModalBox() {  
      this.isShowModal = true;
      this.isManageAllOpen = false;
     
  }

  hideModalBox() {  
      this.isShowModal = false;
      this.isManageAllOpen = true;
  }
}