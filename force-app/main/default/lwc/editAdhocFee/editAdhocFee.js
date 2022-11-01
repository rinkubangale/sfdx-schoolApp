import { LightningElement,api,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveAdhocFees from "@salesforce/apex/feeManagement.saveAdhocFees";

export default class EditAdhocFee extends LightningElement { 
    @api recordsId;
    @track error;
    // @api ModalValue;
    @api getModalValue;
    

    closeModal() {

        this.getModalValue = false;

        this.dispatchEvent(new CustomEvent('modalchange', { detail: this.getModalValue }));

    }
    handleSuccess(event){
        
       
        
     
        this.dispatchEvent(new ShowToastEvent({

            title: "SUCCESS!",

            message: "AdhocFee has been updated successfully.",

        variant: "success",
        

        })); 
        

        location.reload();
    }   
    @track isModalOpen = false;
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModals() {
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

    data = {
        Name: "",
        Academic_Year__c: "",
        Billing_Date__c: "",
        Due_Date__c: "",
        Reminder__c: "",
        Status__c: "",
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