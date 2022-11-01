import { LightningElement, track,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveAdhocFees from "@salesforce/apex/feeManagement.saveAdhocFees";

const actions = [
    {
        label: 'Edit', name: 'edit', iconName: "utility:edit",
        alternativeText: "Edit",
        title: "Edit"
    },
    { label: 'Delete', name: 'delete',iconName: "utility:edit" },
];
const columns = [
    { label: 'Name', fieldName: 'Name',type: 'Text', editable: true },
    { label: 'Quantity', fieldName: 'Quantity__c', type: 'Text', editable: true },
    { label: 'Actual Amount(One Quantity) ₹', fieldName: 'Actual_Amount_One_Quantity__c', type: 'Text', editable: true },
    { label: 'Balance', fieldName: '', type: 'currency', editable: true },
    { label: 'Close At', fieldName: '', type: 'date', editable: true },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];
export default class CreateAdhocFee extends LightningElement {
    //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded 
    @track isModalOpen = false;
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
        saveAdhocFees({ adhocFeeObj: this.data })
            .then((res) => {
                console.log(res);
                this.showSuccess();
                location.reload();
            })
            .catch((err) => {
                console.error(err);
            })
    }
    
    columns = columns;
    data = {
        Name: "",
        Academic_Year__c: "",
        Billing_Date__c: "",
        Due_Date__c: "",
        Reminder__c: "",
        Status__c: "",
        Quantity__c:"",
        Discount_Amount__c:"",
        Discount_Percentage__c:"",
        Actual_Amount_One_Quantity__c:"",
    }
  
    handleInputChange(e) {
        this.data[e.target.fieldName] = e.target.value;
        console.log(this.data);
    }

    showSuccess() {
        const evt = new ShowToastEvent({
            title: 'Success',
            message: `Adhoc Fee "${this.data.Name}" is created successfully`,
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
}