import {
  LightningElement,
  api,
  track
} from "lwc";

export default class AddEditWireframe extends LightningElement {
  @api fields;
  @track headTitle = 'Add School Type';
  @api objectName;
  @api subHeadTitle;
  @track allFields;
  @track isLoading;

  get btnLabel() {
    return this.headTitle;
  }

  //   connectedCallback() {
  //     this.allFields = this.fields.map((item) => {
  //       return {
  //         key: item,
  //         fieldName: item
  //       };
  //     });
  //   }

  handleModalChange() {
    this.dispatchEvent(new CustomEvent("modalchange", {
      detail: false
    }));
  }

  handleLoading() {
    this.isLoading = false;
  }
  goBack() {
    history.back();
    this.dispatchEvent(
      new CustomEvent("backbtn", {
        detail: false
      })
    );
  }
}