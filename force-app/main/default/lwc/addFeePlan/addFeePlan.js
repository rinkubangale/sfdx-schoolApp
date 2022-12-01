import { LightningElement, track, api } from 'lwc';

export default class AddFeePlan extends LightningElement {
    @api fields;
    @track headTitle = "Create Fee Plan";
    @api objectName;
    @api subHeadTitle = "Add New Fee Plan";
   @track allFields;
   @track isLoading = false;
  
    get btnLabel() {
      return this.headTitle;
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