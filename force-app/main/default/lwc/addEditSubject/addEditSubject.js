import { LightningElement } from "lwc";

export default class AddEditSubject extends LightningElement {
  headTitle = "Add Subject";


  get btnLabel() {
    return this.headTitle;
  }
  
  handleModalChange() {
    this.dispatchEvent(new CustomEvent("modalchange", {
      detail: false
    }));
  }
}