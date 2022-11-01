import { LightningElement,api,track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EditFeePlan extends LightningElement {

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

            message: "FeeType has been updated successfully.",

        variant: "success",
        

        })); 
        

        location.reload();
    }   
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
        saveFeePlan({ feePlanObj: this.data })
            .then((res) => {
                console.log(res);
                this.showSuccess();
            })
            .catch((err) => {
                console.error(err);
            })
    }

    @track showDiscFields;
    @track showPenaltyFields;

    @track name;
    @track openPopup = true;
    popup() {
        this.openPopup = true;
    }
    closePopup() {
        this.openPopup = false;
    }
    handleNameChange(event) {
        this.name = event.target.value;
        console.log(this.name);
    }

    data = {
        Name: "",
        Academic_Year__c: "",
        Plan_Type__c: "",
        Class__c: "",
        Total_Number_of_Students__c: "",
        Fee_Plan_Start_Date__c: "",
        Fee_Plan_End_Date__c: "",
        Billing_Frequency__c: "",
        Show_Discount__c: "",
        Discount_Mode__c: "",
        Discount_Amount_Value__c: "",
        Discount_Percentage_Value__c: "",
        Show_Penalty__c: "",
        Penalty_Mode__c: "",
        Penalty_Amount_Value__c: "",
        Penalty_Percentage_Value__c: "",
        Paid_After__c: "",
    }

    handleInputChange(e) {
        this.data[e.target.fieldName] = e.target.value;
        if (e.target.fieldName == "Show_Discount__c") {
            this.showDiscFields = !this.showDiscFields;
        }
        else if (e.target.fieldName == "Show_Penalty__c") {
            this.showPenaltyFields = !this.showPenaltyFields;
        }
        console.log(this.data);
    }

    handleDiscChange(e) {
        this.showDiscFields = e.target.value;
    }
    handlePenaltyChange(e) {
        this.showPenaltyFields = e.target.value;
    }

    showSuccess() {
        const evt = new ShowToastEvent({
            title: 'Success',
            message: `Fee Type "${this.data.Name}" is created successfully`,
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }
    
   
}