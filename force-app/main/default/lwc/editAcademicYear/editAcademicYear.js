import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import methodName from '@salesforce/apex/AcademicYear.methodName';
import updateAY from '@salesforce/apex/AcademicYear.updateAY';

import academicyearsession from '@salesforce/apex/AcademicYear.academicyearsession';
export default class EditAcademicYear extends LightningElement {
    @api recordId;
    //@track ModalRes;

    @api isShowModal;

    closeModal() {
        this.isShowModal = false;
        this.dispatchEvent(new CustomEvent('modalchange', { detail: this.isShowModal }));
    }


    // handleSuccessToast() {

    //     this.dispatchEvent(new ShowToastEvent({

    //         title: "Academic Year Updated!",

    //         message: "Academic year record has been updated successfully.",

    //         variant: "success",
    //     }),
    //         location.reload()
    //     )
    // }

    connectedCallback() {
        console.log(this.recordId);
    }

    @track fromValue;
    @track toValue;

    @wire(methodName, ({ recId: '$recordId' }))
    WiredAY({ error, data }) {
        if (data) {
            const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

            this.fromValue = `${data[0].From_Year__c}-${monthArr.map((item, index) => {
                if (item == data[0].From_Month__c) {
                    if (index < 9) {
                        return `0${index + 1}`
                    }
                    return index + 1;
                }
            })}`;

            this.toValue = `${data[0].To_Year__c}-${monthArr.map((item, index) => {
                if (item == data[0].To_Month__c) {
                    if (index < 9) {
                        return `0${index + 1}`
                    }
                    return index + 1;
                }
            })}`;

            this.fromValue = this.fromValue.replaceAll(',', '');
            this.toValue = this.toValue.replaceAll(',', '');
            console.log(this.fromValue);
            console.log(this.toValue);
        }
        if (error) {
            this.fromMonth = undefined;
            this.error = error;
        }
    }

    @track fromMonth;
    @track fromYear;
    @track toMonth;
    @track toYear;

    handleInput(event) {
        const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        if (event.target.name == 'fromDate') {
            // this.fromDate = event.target.value;
            console.log("Year: ", event.target.value.split("-")[0], "Month: ", monthArr[+event.target.value.split("-")[1] - 1]);
            this.fromYear = event.target.value.split("-")[0];
            this.fromMonth = monthArr[+event.target.value.split("-")[1] - 1];
        }

        else {
            // console.log(event.target.value);         
            // this.toDate = event.target.value;
            this.toYear = event.target.value.split("-")[0];
            this.toMonth = monthArr[+event.target.value.split("-")[1] - 1];
        }
    }



    showSuccessToast() {
        const evt = new ShowToastEvent({
            title: 'Academic Year Updated',
            message: 'Academic Year record has been updated',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    showValidityToast() {
        const evt = new ShowToastEvent({
            title: 'Validity Error',
            message: 'Academic year duration cannot be less or more than 1 Year',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    showErrorToast() {
        const evt = new ShowToastEvent({
            title: 'Provide Details',
            message: 'No change while updating!',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }


    updateRecord() {
        if (this.fromMonth == null || this.fromMonth == '' || this.toMonth == null || this.toMonth == '') {
            this.showErrorToast();
            // this.closeModal();
            return;
        }

        else if (this.fromMonth == this.toMonth && Number(this.fromYear) == Number(this.toYear) - 1) {

            let academicYear = [this.fromMonth, this.fromYear, this.toMonth, this.toYear];
            updateAY({ recId: this.recordId, AY: academicYear })
                .then((res) => {
                    console.log(res);
                    this.showSuccessToast();
                    this.closeModal();
                    // location.reload();
                })
                .catch((err) => {
                    console.error(err);
                })
        }
        else {
            this.showValidityToast();
            return;
            // this.closeModal();
        }
        // location.reload();
        setTimeout(() => {
            location.reload()
        }, 1500);
    }


}