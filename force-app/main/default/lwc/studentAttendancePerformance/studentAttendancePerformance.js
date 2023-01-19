import {
  LightningElement,
  api,
  track
} from 'lwc';

export default class StudentAttendancePerformance extends LightningElement {
  @api fields;
  @track headTitle = "Attendance Performance";
  @api objectName;
  @track showPerformance = false;
  @track showAcademics = false;
  @track showCurricular = false;
  @track showAttendance = false;
  @track showPopup = false;

  @track allFields;
  @track isLoading = false;

  @track isModalOpen = false;

  openModal() {
    // to open modal set isModalOpen tarck value as true
    this.isModalOpen = true;
  }
  closeModal() {
    // to close modal set isModalOpen tarck value as false
    this.isModalOpen = false;
  }
  get btnLabel() {
    return this.headTitle;
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

  handleLoading() {
    this.isLoading = false;
  }
}