import { LightningElement, track, api } from 'lwc';

export default class AddBranch extends LightningElement {

    @api fields;
  @track headTitle = "Add New Branch";
  @api objectName;
  @api subHeadTitle = "Add New Branch here";
  @track allFields;
  @track isLoading = false;


  statusOptions = [{
      "label": "Active",
      "value": "Active"
    },
    {
      "label": "Inactive",
      "value": "Inactive"
    },
  ]

  get btnLabel() {
    return this.headTitle;
  }

  @track defaultOptions = [{
      label: 'Yes',
      value: 'Yes'
    },
    {
      label: 'No',
      value: 'No'
    },
  ];

 
 
 

  handleModalChange() {
    this.dispatchEvent(new CustomEvent("modalchange", {
      detail: false
    }));
  }

  handleLoading() {
    this.isLoading = false;
  }

}