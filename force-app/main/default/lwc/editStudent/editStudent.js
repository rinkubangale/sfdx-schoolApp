import { LightningElement, track, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import editStudent from '@salesforce/apex/getStudent.editStudent';
import updateStudents from '@salesforce/apex/getStudent.updateStudents';
import FatherFirstName from '@salesforce/schema/Contact.FatherFirstName__c';
import FatherLastName from '@salesforce/schema/Contact.FatherLastName__c';
import MotherFirstName from '@salesforce/schema/Contact.MotherFirstName__c';
import MotherLastName from '@salesforce/schema/Contact.MotherLastName__c';
import GuardianFirstName from '@salesforce/schema/Contact.GuardianFirstName__c';
import GuardianLastName from '@salesforce/schema/Contact.GuardianLastName__c';
import PointOfContact from '@salesforce/schema/Contact.Point_of_contact__c';


import { updateRecord } from 'lightning/uiRecordApi';

export default class EditStudent extends LightningElement {

    activeSections = ['A', 'B', 'C', 'D', 'E'];
    activeSectionsMessage = '';

    handleSectionToggle(event) {
        const openSections = event.detail.openSections;

        if (openSections.length === 0) {
            this.activeSectionsMessage = 'All sections are closed';
        } else {
            this.activeSectionsMessage =
                'Open sections: ' + openSections.join(', ');
        }
    }

    /* @track FirstName;
    @track MobilePhone;
    @track DateofJoining;
    @track Address1;
    @track Address2;
    @track LastName;
    @track MiddleName;
    @track ClassName;
    @track ClassSection;
    @track DateofBirth;
    @track Gender;
    @track BloodGroup;
    @track Country;
    @track State;
    @track Pincode;
    @track City;
    @track Status;
    @track FatherContactNumber;
    @track FatherName;
    @track FatherOccupation;
    @track MotherContactNumber;
    @track MotherName;
    @track MotherOccupation;
    @track GuardianContactNumber;
    @track GuardianName;
    @track GuardianOccupation;
    @track RollNumber; */
    FatherFirstName = '';
    FatherLastName = '';
    MotherFirstName = '';
    MotherLastName = '';
    GuardianFirstName = '';
    GuardianLastName = '';
    PointOfContact = '';


    @track contactid;
    @track error;
    @track dataList;
    @track updateStudentRecord;
    @track Year;


    @api editRecordsId;
    @api recordId;
    @api ModalValue;
    @track filter = '';
    @track className;
    @track classSection;
    @api selectedName;
    @api selectedSection;
    @api academicYear;

    get PointOfContactOptions(){
        return [
            { label: 'Father', value: 'Father' },
            { label: 'Mother', value: 'Mother' },
            { label: 'Guardian', value: 'Guardian' },
        ];
    }

    closeModal() {
        this.ModalValue = false;
        this.newFileWasUploaded = false;
        this.dispatchEvent(new CustomEvent('modalchange', { detail: this.ModalValue }));
    }

    @track disabled = true;

    handleClassChange(event) {
        this.className = event.detail
        this.filter = ' Class__c =' + '\'' + event.detail + '\'';
        this.disabled = event.detail ? false : true
    }
    handleClassSectionChange(event) {
        this.classSection = event.detail
    }

    handleClassAdmissionChange(event) {
        this.Year = event.detail;
        this.filter = ' Academic_Year__c =' + '\'' + event.detail + '\'';
        console.log(this.filter);
    }
    
    disableSec(event) {
        this.disabled = event.detail;
    }

    @track selected = false;
    @track motherSelected = false;
    @track guardianSelected = false;

    handlePointChange(event) {
        if(event.target.value == "Father"){
            
            this.PointOfContact = event.target.value;
            //this.selected = true;
            /* this.FirstNameLabel = 'Father First Name'
            this.LastNameLabel = 'Father Last Name' */
        }
        else if(event.target.value == "Mother"){
            
            this.PointOfContact = event.target.value
            //this.motherSelected = true;
           /*  this.FirstNameLabel = 'Mother First Name'
            this.LastNameLabel = 'Mother Last Name' */
        }
        else {
            
            this.PointOfContact = event.target.value;
            //this.guardianSelected = true;
            /* this.FirstNameLabel = 'Guardian First Name'
            this.LastNameLabel = 'Guardian Last Name' */
        }
    }
    saveHandler(event) {
        console.log('helloooo=========>>>');
        const fields = event.detail.fields;
        fields['Id'] = this.recordId;
        fields['Class_Name__c'] = this.className;
        fields['Class_Section__c'] = this.classSection;
        fields['Academic_Year__c'] = this.Year;
        fields[PointOfContact.fieldApiName] = this.PointOfContact;
        fields[FatherFirstName.fieldApiName] = this.FatherFirstName;
        fields[FatherLastName.fieldApiName] = this.FatherLastName;
        fields[MotherFirstName.fieldApiName] = this.MotherFirstName;
        fields[MotherLastName.fieldApiName] = this.MotherLastName;
        fields[GuardianFirstName.fieldApiName] = this.GuardianFirstName;
        fields[GuardianLastName.fieldApiName] = this.GuardianLastName; 

        console.log("Fields: ", JSON.stringify({apiName: CONTACT_OBJECT.objectApiName,fields}));

        let recordInput = { fields };
        /* if(this.isInputValid()) { */
        updateRecord(recordInput)
            .then(() => {
                console.log('updated')
                this.ShowToast();
                this.newFileWasUploaded = false;
                //console.log("hello" + JSON.stringify(result));
                setTimeout(() => {
                    location.reload();
                }, 1500);


                // Display fresh data in the form
            })
            .catch(error => {
                console.log(JSON.stringify(error))
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
        /* }
        else {
          this.showErrorToast("student cannot be created");
        }
       */
    }

    handleCheckBox(event) {
        //console.log("hello");
        if (event.target.checked == true) {
            this.Address3 = this.Address1;
            this.Address4 = this.Address2;
            this.Country1 = this.Country;
            this.State1 = this.State;
            this.City1 = this.City;
            this.Pincode1 = this.Pincode;
        }
        else {
            this.Address3 = "";
            this.Address4 = "";
            this.Country1 = "";
            this.State1 = "";
            this.City1 = "";
            this.Pincode1 = "";
        }
    }

    newFileWasUploaded = false;
    uploadedFilesUrl = [];

    get acceptedFormats() {
        return ['.jpg', '.png'];
    }

    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        if (uploadedFiles /* && uploadedFiles.length > 0 */) {
            this.newFileWasUploaded = true;
            uploadedFiles.forEach(element => {
                this.uploadedFilesUrl.push({
                    id: '/sfc/servlet.shepherd/version/download/' + element.contentVersionId
                })
            });
        }
    }

    ShowToast() {
        const toastEvent = new ShowToastEvent({
            title: 'Success!',
            message: 'Student updated successfully',
            variant: 'success'
        });
        this.dispatchEvent(toastEvent);
    }

    showErrorToast(msg) {
        const evt = new ShowToastEvent({
            title: 'Toast Error',
            message: msg,
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

    isInputValid() {
        let isValid = true;
        let inputFields = this.template.querySelectorAll('lightning-input-field');
        inputFields.forEach(inputFiel1d => {
            if (!inputFiel1d.checkValidity()) {
                inputFiel1d.reportValidity();
                isValid = false;
            }
        });
        return isValid;
    }

}

//type="submit"