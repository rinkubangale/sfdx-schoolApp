import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class EditSubject extends LightningElement {
    @api recordsId;

    @api ModalRes;



    closeModal() {

        this.ModalRes = false;

        this.dispatchEvent(new CustomEvent('modalchange', { detail: this.ModalRes }));

    }






    handleSuccess(event){

        this.dispatchEvent(new ShowToastEvent({

            title: "SUCCESS!",

            message: "Subject has been updated successfully.",

           variant: "success",

        }),  

        );    

        location.reload();

    }
}