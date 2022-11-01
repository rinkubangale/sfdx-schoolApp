import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveFeePlan from "@salesforce/apex/feeManagement.saveFeePlan";

export default class CreateFeePlan extends LightningElement {

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

    // handleClick() {
    //     addFeeType({ feeTypeName: this.name })
    //         .then(result => {
    //             // this.result = res;
    //             this.error = undefined;
    //             this.showSuccess(result);
    //             console.log(JSON.stringify(result));
    //             console.log("result", this.res);

    //         })
    //         .catch(error => {
    //             this.result = undefined;
    //             this.error = error;
    //             this.dispatchEvent(
    //                 new ShowToastEvent({
    //                     title: 'Error creating record',
    //                     message: error.body.message,
    //                     variant: 'error',
    //                 }),
    //             );
    //             console.log("error", JSON.stringify(this.error));
    //         });
    //     this.closeModal();
    // }

}