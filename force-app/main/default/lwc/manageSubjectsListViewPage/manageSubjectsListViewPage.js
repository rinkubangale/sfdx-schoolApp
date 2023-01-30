import {
  LightningElement,
  track,
  api
} from 'lwc';

export default class ManageSubjectsListViewPage extends LightningElement {
  @track isAddSubjectOpen = false;






  openAddSubjectModal() {
    this.isAddSubjectOpen = !this.isAddSubjectOpen;
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