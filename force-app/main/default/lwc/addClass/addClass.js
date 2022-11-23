import { LightningElement } from 'lwc';

export default class AddClass extends LightningElement {
    headTitle = "Add Class";


    get btnLabel() {
      return this.headTitle;
    }
    
    handleModalChange() {
      this.dispatchEvent(new CustomEvent("modalchange", {
        detail: false
      }));
    }
}