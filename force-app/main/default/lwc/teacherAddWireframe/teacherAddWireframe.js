import {
    LightningElement,
    api,
    track
} from "lwc";

export default class TeacherAddWireframe extends LightningElement {
    @api fields;
    @api headTitle = 'Add Teacher';
    @api objectName;

    @track allFields;
    @track isLoading = false;

    get btnLabel() {
        return this.headTitle;
    }

    //   connectedCallback() {
    //     this.allFields = this.fields.map((item) => {
    //       return {
    //         key: item,
    //         fieldName: item
    //       };
    //     });
    //   }

    handleModalChange() {
        this.dispatchEvent(new CustomEvent("modalchange", {
            detail: false
        }));
    }

    handleLoading() {
        this.isLoading = false;
    }
    @track TeacherName;
    @track DepartmentName;
    @track PrimaryEmail;
    @track Mobile;
    @track contactid;
    @track error;

    @track getTeacherRecord = {
        Teacher_Name__c: null,
        Departments__c: null,
        Primary_Email__c: null,
        MobilePhone: null,
    };

    @track isModalOpen = false;
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }




    deptInpChange(event) {
        this.DepartmentName = event.detail;
        console.log(JSON.stringify(event.detail));
    }

    isInputValid() {
        let isValid = true;
        let inputFields = this.template.querySelectorAll('.validate');
        inputFields.forEach(inputField => {
            if (!inputField.checkValidity()) {
                inputField.reportValidity();
                isValid = false;
            }
        });
        return isValid;
    }

    ShowToast() {
        const toastEvent = new ShowToastEvent({
            title: 'Success!',
            message: 'Teacher created successfully',
            variant: 'success'
        });
        this.dispatchEvent(toastEvent);
        location.reload();
    }


    showErrorToast(err) {
        const evt = new ShowToastEvent({
            variant: 'error',
            title: 'Error',
            message: err,
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    saveHandler() {
        if (this.isInputValid()) {
            insertTeacherRecord({
                    //class parameters:@track values//
                    TeacherName: this.TeacherName,
                    PrimaryEmail: this.PrimaryEmail,
                    DepartmentName: this.DepartmentName,
                    Mobile: this.Mobile,

                })

                .then((result) => {
                    console.log('after save' + JSON.stringify(result));
                    console.log('result----->' + result);
                    console.log('resultparse----->' + JSON.parse(result));
                    const rest = JSON.parse(result);
                    rest.success ? this.ShowToast() : this.showErrorToast("Duplicate value found,change the inputs");

                    // this.closeModal();
                    //location.reload();
                })
                .catch(error => {

                    //console.log(error.body.pageErrors[0].message);
                    // console.log("error------------>" + error);


                    // console.log('error log' + JSON.stringify(error));
                    // //this.showErrorToast(error.body.pageErrors[0].message);
                    //  this.showErrorToast(JSON.stringify(error.body.message));
                    this.showErrorToast("Duplicate value found,change the inputs");

                })
        } else {
            this.showErrorToast('Please fill the fields');
        }

    }
}