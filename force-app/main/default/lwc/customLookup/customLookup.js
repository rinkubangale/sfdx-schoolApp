import lookUp from "@salesforce/apex/Lookup.search";
import { api, LightningElement, track, wire } from "lwc";

export default class customLookUp extends LightningElement {
  @api
  get throwError() {}
  set throwError(value) {
    if (value) {
      let inputfields = this.template.querySelectorAll("lightning-input");
      console.log("dsfdsfds=>" + JSON.stringify(inputfields));
      inputfields.forEach((item) => {
        if (!item.checkValidity()) {
          item.reportValidity();
        }
      });
    }
  }
  @api objName;
  @api iconName;
  @api filter;
  @api searchPlaceholder = "Search";
  @api selectedName;
  @track records;
  @api isValueSelected;
  @track blurTimeout;
  @track searchTerm;
  @api required = false;
  @api disabled;
  //css
  @track boxClass =
    "slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus";
  @track inputClass = "validate";
  @wire(lookUp, {
    searchTerm: "$searchTerm",
    myObject: "$objName",
    filter: "$filter"
  })
  wiredRecords({ error, data }) {
    if (data) {
      this.error = undefined;
      this.records = data;

      let obj = JSON.parse(JSON.stringify(data));
      console.log("I consoled===>", data);
      if (this.objName == "Academic_Year__c") {
        for (let x of obj) {
          x.Name =
            x.From_Year__c +
            "/" +
            x.From_Month__c +
            "-" +
            x.To_Year__c +
            "/" +
            x.To_Month__c;
        }
      }
      this.records = obj;
    } else if (error) {
      console.log(JSON.stringify(error));

      this.error = error;
      this.records = undefined;
    }
  }
  handleClick() {
    this.searchTerm = "";
    this.inputClass = "slds-has-focus";
    this.boxClass =
      "slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open";
  }

  onBlur() {
    this.blurTimeout = setTimeout(() => {
      this.boxClass =
        "slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus";
    }, 300);
  }

  onSelect(event) {
    let selectedId = event.currentTarget.dataset.id;
    //console.log("this=====>>>" + selectedId);

    let selectedName = event.currentTarget.dataset.name;
    //console.log("that====================>>>>>>."+selectedName);

    const valueSelectedEvent = new CustomEvent("lookupselected", {
      detail: selectedId
    });

    this.dispatchEvent(valueSelectedEvent);

    this.isValueSelected = true;

    this.selectedName = selectedName;

    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }

    this.boxClass =
      "slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus";
  }

  handleRemovePill() {
    this.isValueSelected = false;
    this.dispatchEvent(new CustomEvent("disablesection", { detail: true }));
  }

  onChange(event) {
    this.searchTerm = event.target.value;
  }
}