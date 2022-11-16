import { LightningElement, api, track } from 'lwc';

export default class AddLeaveType extends LightningElement {
    @api fields;
    @track headTitle = "Add Leave Type";
    @api objectName;
    @api subHeadTitle = "Add New Leave Types here";
    @track allFields;
    @track isLoading = false;
  
    @track isModalOpen = false;

    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
  
  
    options = [{
        "label": "1",
        "value": "1"
      },
      {
        "label": "U-KG",
        "value": "U-KG"
      },
    ]
  
    get btnLabel() {
      return this.headTitle;
    }
  
    @track assignOptions = [{
        label: 'Value 1',
        value: 'Value 1'
      },
      {
        label: 'Value 2',
        value: 'Value 2'
      },
      {
        label: 'Value 3',
        value: 'Value 3'
      },
    ];
  
    handleAssignClassOptionsChange(event) {
      let value = event.detail.value;
      //do something with the value
    }
   
    get assignClassOptions(){
      return this.assignOptions;
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