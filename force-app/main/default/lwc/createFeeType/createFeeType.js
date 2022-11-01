import { LightningElement, track } from 'lwc';
import addFeeType from "@salesforce/apex/addFeeType.addFeeType";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class CreateFeeType extends LightningElement {

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
    }

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

    showSuccess(feeTypeName) {
        const evt = new ShowToastEvent({
            title: 'Success',
            message: `Fee Type "${feeTypeName}" is created successfully`,
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    handleClick() {
        addFeeType({ feeTypeName: this.name })
            .then(result => {
                // this.result = res;
                this.error = undefined;
                this.showSuccess(result);
                console.log(JSON.stringify(result));
                console.log("result", this.res);

            })
            .catch(error => {
                this.result = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log("error", JSON.stringify(this.error));
            });
        this.closeModal();
    }
}