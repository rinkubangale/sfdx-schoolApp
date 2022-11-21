import { LightningElement, wire, api, track} from 'lwc';

export default class TransferStudent extends LightningElement {

    @api fields;
    @track headTitle = "Transfer Students";
    @api objectName;
    // @api subHeadTitle = "Add New Academic Year Session";
   @track allFields;
   @track isLoading = false;
  
   @track isModalOpen = false;

@track classOptions = [{
    label: 'UKG-A',
    value: 'UKG-A'
  },
  {
    label: 'UKG-B',
    value: 'UKG-B'
  },
];


    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
     get btnLabel() {
       return this.headTitle;
     }

    handleModalChange() {
        this.dispatchEvent(new CustomEvent("modalchange", {
          detail: false
        }));
      }
}