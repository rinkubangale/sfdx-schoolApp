import { LightningElement,api,wire, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';
import getAsset from '@salesforce/apex/AssetUtils.getAsset';
import { getRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Employee__c.Name';
import ACTIVE_FIELD from '@salesforce/schema/Employee__c.AMT_Active__c';
import { updateRecord } from 'lightning/uiRecordApi';
import ID_FIELD from '@salesforce/schema/Employee__c.Id';

export default class EmployeeResign extends LightningElement {
    
    recordData=[];
    employeeName = '';
    isActive =true;
    @track showSpinner = false;
    @api recordId;
    columns= [
        {label:'Name', fieldName :'Name'},
        {label:'Product Name' , fieldName:'productName__c'},
        {label:'Product Code' , fieldName:'Product_Code2__c'},
        {label:'Product Family', fieldName:'Product_Family__c'},
        {label:'Employee Name' , fieldName:'EmployeeName__c'},
        {label:'Employee No' , fieldName:'Employee_No__c'},
        {label:'Employee Location' , fieldName:'Employee_Location__c'}

    ]
    @wire (getRecord,{ recordId: '$recordId', fields: [ACTIVE_FIELD,NAME_FIELD]})
    employeeDetails(result,error){
        
        if(result && JSON.stringify(result) != '{}'){
             this.employeeName = result.data.fields.Name.value
             this.isActive = result.data.fields.AMT_Active__c.value

        }
    }

    @wire (getAsset,({recordId:'$recordId'}))
    assetGet(result,error){
        if(result){
            this.recordData=result.data;
            console.log("Data======="+JSON.stringify(this.recordData))
        }else{
            this.recordData= undefined;
        }
    }

    handleResign(){
        this.showSpinner = true;
        const fields = {};
            fields[ID_FIELD.fieldApiName] = this.recordId;
            fields[ACTIVE_FIELD.fieldApiName] = false;

            const recordInput = { fields };


        updateRecord(recordInput)
        .then(() => {
            this.showSpinner = false;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Resigned successfully',
                    variant: 'success'
                })
            );
            this.dispatchEvent(new CloseActionScreenEvent());

            // Display fresh data in the form
            
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
    closeModal(){
        this.dispatchEvent(new CloseActionScreenEvent());
    }
}