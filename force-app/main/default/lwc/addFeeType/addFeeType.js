import { LightningElement, api, track } from 'lwc';

export default class AddFeeType extends LightningElement {
    @api fields;
    @track headTitle = "Add Fee Type";
    @api objectName;
    @api subHeadTitle = "Add New Fee Types";
   @track allFields;
   @track isLoading = false;
  
    get btnLabel() {
      return this.headTitle;
    }
  
    // connectedCallback() {
    //   this.allFields = this.fields.map((item) => {
    //     return {
    //       key: item,
    //       fieldName: item
    //     };
    //   });
    // }
  
    handleModalChange() {
      this.dispatchEvent(new CustomEvent("modalchange", {
        detail: false
      }));
    }
  
    handleLoading() {
      this.isLoading = false;
    }
}