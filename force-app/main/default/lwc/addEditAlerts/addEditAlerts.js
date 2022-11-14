import { LightningElement, api, track } from "lwc";

export default class AddEditAlerts extends LightningElement {
  @api fields;
  @api objectName;
  @api headTitle = "Add Alerts";
  @api subHeadTitle = "";
  @track allFields;
  @track isLoading = false;
  @track LinksData = [{ linkName: "New Year Eve", link: "www.google.com" }];
  counter = 1;
  get btnLabel() {
    return this.headTitle;
  }

  addLink() {
    this.LinksData.push({ linkName: "", link: "" });
  }
  deleteLink(e) {
    let index = e.currentTarget.dataset.index;
    this.LinksData.splice(index, 1);
  }
  handleChangeLink(e) {
    let name = e.target.name;
    let value = e.target.value;
    let index = e.currentTarget.dataset.index;
    this.LinksData[index][name] = value;
  }
  connectedCallback() {
    // this.allFields = this.fields.map((item) => {
    //   return {
    //     key: item,
    //     fieldName: item
    //   };
    // });
  }

  handleModalChange() {
    this.dispatchEvent(new CustomEvent("modalchange", { detail: false }));
  }

  handleLoading() {
    this.isLoading = false;
  }
}
