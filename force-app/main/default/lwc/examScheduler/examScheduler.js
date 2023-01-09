import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import insertExamsRec from '@salesforce/apex/examSchedule.insertExamsRec';

export default class ExamScheduler extends LightningElement {
    @track noRecords= true;
    @track examNoRecords = true;
    @track arr=[];

    


    opennoRecords(){
        this.noRecords = true;
    }
    closenoRecords(){
        this.noRecords = false; 
    }

    openExamNoRecords(){
        this.examNoRecords = true;
    }
    closeExamNoRecords(){
        this.examNoRecords = false;
    }

}