import { LightningElement, api, track } from "lwc";

export default class AddEditWireframe extends LightningElement {
  @api fields;
  @api headTitle;
  @api objectName;
  @api subHeadTitle;
  @track allFields;
  @track isLoading = true;

  get btnLabel() {
    return this.headTitle;
  }

  connectedCallback() {
    this.allFields = this.fields.map((item) => {
      return {
        key: item,
        fieldName: item
      };
    });
  }

  handleModalChange() {
    this.dispatchEvent(new CustomEvent("modalchange", { detail: false }));
  }

  handleLoading() {
    this.isLoading = false;
  }
}
