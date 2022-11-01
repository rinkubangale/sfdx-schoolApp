import { LightningElement,api,wire, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';
import createInventoryLineItems from '@salesforce/apex/AssetUtils.createInventoryLineItems';
import NAME from '@salesforce/schema/Inventory_Line_Item__c.Name';
import BILLING_FREQUENCY from '@salesforce/schema/Inventory_Line_Item__c.Billing_Frequency__c';
import ASSIGNED_COUNT from '@salesforce/schema/Inventory_Line_Item__c.Assigned_Count__c';
import PRODUCT_TYPE from '@salesforce/schema/Inventory__c.Product_Type__c'
import { getRecord } from 'lightning/uiRecordApi';

const INVENTORY_FIELDS =['Inventory__c.Product_Type__c']

export default class InventoryLineItemScreen extends LightningElement {
    @track recordData=[];
    @api recordId;
    PARTICIPANTFIELDS =[NAME,ASSIGNED_COUNT,BILLING_FREQUENCY]

    @track record = {};
    columns= [
        {label:'Product Name' , fieldName:'Product_Name__c'},
        // {label:'Product_Code__c' , fieldName:'Product_Code__c'},
        {label:'Price', fieldName:'Price__c'},
        {label:'License Count' , fieldName:'License_Count__c'},
        {label:'License Type' , fieldName:'License_Type__c'},
        {label:'Purchase Date' , fieldName:'Purchase_Date__c'}
        //added by Chaitanya
    ]

    activeSections = ['A', 'B'];
    activeSectionsMessage = '';
    isSubscription = false;
    @wire(getRecord, { recordId: '$recordId', fields: INVENTORY_FIELDS  })
    getInventoryRecord(data,error){
      if(data && JSON.stringify(data)!= '{}'){
        if(data.data.fields.Product_Type__c.value =='Saas'){
          this.isSubscription = true;
        }
      }
    }

    renderedCallback() {
      const inputFields = this.template.querySelectorAll(
          'lightning-input-field'
      );
      if (inputFields) {
          inputFields.forEach(field => {
              if(field.fieldName == 'Product_Type__c'){
                  if( this.isSubscription){
                    field.value = 'Saas';
                  }else{
                    field.value = 'Perpetual';
                  }
              }
          });
      }
  }
    
    handleSectionToggle(event) {
        const openSections = event.detail.openSections;

        if (openSections.length === 0) {
            this.activeSectionsMessage = 'All sections are closed';
        } else {
            this.activeSectionsMessage =
                'Open sections: ' + openSections.join(', ');
        }
    }
    addInventoryLineItem(){
        if (!this.validateFields()) {
           
            this.dispatchEvent(
                new ShowToastEvent({
                  title: 'Error',
                  message: 'Please Fill the required fields',
                  variant: 'Error',
                }),
              );
            return;
        }
        this.recordData.push(this.record);
        this.record = {};
        this.handleReset();
        console.log('reocrdDAte------>'+JSON.stringify(this.recordData))
    }
    handleReset() {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
     }
     validateFields() {
        return [...this.template.querySelectorAll("lightning-input-field")].reduce((validSoFar, field) => {
            // Return whether all fields up to this point are valid and whether current field is valid
            // reportValidity returns validity and also displays/clear message on element based on validity
            this.record[field.fieldName]=field.value;
            return (validSoFar && field.reportValidity());
        }, true);
    }
    handleSave(){
        if(this.recordData.length == 0){
            this.dispatchEvent(
                new ShowToastEvent({
                  title: 'Error',
                  message: 'Please add any InventoryLineItem to create',
                  variant: 'Error',
                }),
              );
              return;
            }
        
        this.recordData.forEach(element=>{
            element['Inventory__c'] =this.recordId;
        })
        createInventoryLineItems({ inventoryLineItemList: JSON.stringify(this.recordData) }).then(result => {
            console.log('obj-======>'+result)
      
            let obj = JSON.parse(result);
            console.log('check-======>'+obj)
      
            if (obj.isSuccess) {
              this.dispatchEvent(
                new ShowToastEvent({
                  title: 'Success',
                  message: 'Inventory Line Items Created Successfully',
                  variant: 'success',
                }),
              );
      
            } else {
              console.log('error>>')
              this.dispatchEvent(
                new ShowToastEvent({
                  title: 'Error',
                  message: obj.message,
                  variant: 'Error',
                }),
              );
            }
      
            this.dispatchEvent(new CloseActionScreenEvent());
          }).catch(error => {
            console.log('error1>>'+JSON.stringify(error))
      
            this.dispatchEvent(
              new ShowToastEvent({
                title: 'Error',
                message: 'Try Again after Sometimes',
                variant: 'Error',
              }),
            );
            this.dispatchEvent(new CloseActionScreenEvent());
      
          })
    }
}