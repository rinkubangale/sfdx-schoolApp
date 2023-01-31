import { LightningElement, track, wire, api } from "lwc";

export default class AddBookLibrary extends LightningElement {
  @api fields;
  @track headTitle = "Add New Admission";
  @api objectName;
  @api subHeadTitle = "Add New Admissions here";
  @track allFields;
  @track isLoading = false;

  options = [
    {
      label: "1",
      value: "1"
    },
    {
      label: "U-KG",
      value: "U-KG"
    }
  ];

  get btnLabel() {
    return this.headTitle;
  }

  @track assignOptions = [
    {
      label: "Value 1",
      value: "Value 1"
    },
    {
      label: "Value 2",
      value: "Value 2"
    },
    {
      label: "Value 3",
      value: "Value 3"
    }
  ];

  handleAssignClassOptionsChange(event) {
    let value = event.detail.value;
    //do something with the value
  }

  get assignClassOptions() {
    return this.assignOptions;
  }

  handleModalChange() {
    this.dispatchEvent(
      new CustomEvent("modalchange", {
        detail: false
      })
    );
  }

  handleLoading() {
    this.isLoading = false;
  }
}
