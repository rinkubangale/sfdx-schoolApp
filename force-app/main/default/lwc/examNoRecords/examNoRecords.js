import { LightningElement,track } from 'lwc';
import insertExamsRec from '@salesforce/apex/examSchedule.insertExamsRec';

export default class ExamNoRecords extends LightningElement {
    @track createRecord = false;
    @track array;
    @track ClassName;
    @track ExamName;
    @track StartDate;
    @track EndDate;
    @track error;
    @track norecords= true;

    openNoRecords(){
        this.norecords = true;
        this.createRecord = false;
    }
    closeNoRecords(){
        this.norecords = false;
        this.createRecord = true;
    }
    options = [
        { value: 'Pre Kg', label: 'Pre Kg',  },
        {
            value: 'UKG',
            label: 'UKG',
        },
        {
            value: 'LKG',
            label: 'LKG',
        },
    ];

    goBack() {
        this.dispatchEvent(
          new CustomEvent("backbtn", {
		  detail: false
          })
        );
    }


    openCreateRecord(){
        this.createRecord = true;
        this.norecords = false;
    }
    closeCreateRecord(){
        this.createRecord = false;
        this.norecords = true;
    }

    ShowToast() {
        const toastEvent = new ShowToastEvent({
            title: 'Success!',
            message: 'Exam Scheduled successfully',
            variant: 'success'
        });
        this.dispatchEvent(toastEvent);
    }

    saveHandler() {
        console.log('hiiii');
        insertExamsRec({
            ExamName: this.ExamName,
            StartDate: this.StartDate,
            EndDate: this.EndDate
        })

            .then((result) => {
                console.log(JSON.stringify(result));
                this.ShowToast();
                //location.reload();
            })
            .catch(error => {
               console.log(error);
            })
    }
}