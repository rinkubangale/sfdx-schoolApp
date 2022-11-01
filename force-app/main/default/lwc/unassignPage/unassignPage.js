import {LightningElement, api, track,wire} from 'lwc';
import saveAssignEmployeeMethod from '@salesforce/apex/AssetUtils.saveAssignEmployeeMethod';
import { getFieldValue, getRecord, updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ActiveField from '@salesforce/schema/Asset.Active__c'
import ServiceReason from '@salesforce/schema/Inventory__c.Service_Reason__c';
import ServiceEndDate from '@salesforce/schema/Inventory__c.Service_end_date__c';
import SentForService from '@salesforce/schema/Inventory__c.Sent_for_Service__c';
import ServiceStartDate from '@salesforce/schema/Inventory__c.Service_start_date__c';
import SentToRetire from '@salesforce/schema/Inventory__c.Retire__c';
import RetiredDate from '@salesforce/schema/Inventory__c.Retired_Date__c';
import RetiredValue from '@salesforce/schema/Inventory__c.Retired_Value__c';
import RetiredReason from '@salesforce/schema/Inventory__c.Retired_Reason__c';
import InventId from '@salesforce/schema/Asset.Inventory__c';
import Assigned from '@salesforce/schema/Inventory__c.Assigned__c'
import inventoryServiceField from '@salesforce/apex/AssetUtils.inventoryServiceField';
import { CloseActionScreenEvent } from 'lightning/actions';
const FIELDS = [SentForService,ServiceReason,ServiceStartDate,ServiceEndDate,Assigned,ActiveField,SentToRetire,RetiredDate,RetiredValue,RetiredReason];

export default class UnassignPage extends LightningElement {
    @api EmpId;
    @api assetttId;
    @api recordId;
    @api Inventory__c;
    @api recordIdInv ;
    @track emp;
    @track result;
    @track activeField;
    @track selectedRecordType
    @track 	Assigned;
    editNameField =true;
    footerButton=false
    @api checkboxVal=false;
    assignPage= false;  
    servicePage = false;
    scrapPage = false;  
    Select_a_Record_type = false;
    moveInventory = false;
    recordpage =true;
    @wire(getRecord, {recordId:'$recordId', layoutTypes:'Full'})
    getInventory;
    
    connectedCallback(){
        console.log('this.EmpId',this.emp);
        console.log('this.assetttId',this.recordId);
        console.log('recordIdInv---->',this.recordIdInv);
        console.log('this.getInventoryId------->',this.getInventory)
        console.log('this.getInventory')
        console.log('InventId----->',this.inventoryId);
    }

    get inventoryId(){
        return getFieldValue(this.getInventory.data , InventId)
    }

    get options() {
        return [
            { label: '---Select a Record type---', value: 'Select_a_Record_type'},
            { label: 'Assign to other Employee', value: 'Assign_to_other_Employees' },
            { label: 'Send to Service', value: 'Send_to_Service' },
            { label: 'Scrap/Retired', value: 'Scrap' },
            { label: 'Move to  inventory', value: 'Move_to_inventory' }
            ];
    }

    saveAssignEmployee(){
        console.log('methodInvoked---------->')
        saveAssignEmployeeMethod({EmployeeId:this.emp,assetId:this.recordId})
        .then(result => {
            console.log('empId2---------->'+this.EmpId)
            console.log('asettId2---------->'+this.assetttId)
            console.log('what',this.result)
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Successfully assigned to employee',
                    variant: 'success',
                }),
                );
                window.location.reload()
            this.checkboxVal=false
            this.assignPage = false
            location.reload();
        })
        .catch(error => {
            console.log("Error--->"+error.body.message);
        });
        }


        activeChange(event){
            this.ActiveField = event.target.value;
            this.ActiveField = false;
        }

        handleServiceReason(event){
            this.ServiceReason = event.target.value;
            console.log('this.ServiceReason handle---', this.ServiceReason);

        }
        handleServiceStartDate(event){
            this.ServiceStartDate = event.target.value;
            console.log('this.ServiceStartDate handle---', this.ServiceStartDate);
        }
        handleServiceEndDate(event){
            this.ServiceEndDate = event.target.value;
            console.log(' this.ServiceEndDate handle---',  this.ServiceEndDate);
        }


        inventorySave(event){
            const fields={};
            fields['Id']= this.inventoryId;
            fields['Assigned__c'] = false;
            fields['Sent_for_Service__c'] =true;
            fields['Service_Reason__c'] = this.ServiceReason;
            fields['Service_start_date__c'] = this.ServiceStartDate;
            fields['Service_end_date__c'] = this.ServiceEndDate ;
            const recordInput={fields};
            console.log('recordInput------->',recordInput)
            updateRecord(recordInput)
            .then((res)=>{
                console.log('updateRecordres---',res)
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Successfully moved to Service',
                        variant: 'success',
                    })
                    );
                    inventoryServiceField({assetId:this.recordId})
                        .then(result=>{
                        console.log('apexinvoked----',result)
                           location.reload();
                    })
                    .catch(error=>{
                        
                    })
            })
            .catch(error=>{
                this.dispatchEvent(
                    new ShowToastEvent({
                      title: 'Error',
                      message: 'Please enter the required values in "SERVICE REASON" "SERVICE START DATE"',
                      variant: 'Error',
                    }),
                  );
            })                        
            
        }

        handleRetiredDate(event){
            this.RetiredDate = event.target.value;
            console.log('this.RetiredDate handle---',  this.RetiredDate);
        }
        handleRetiredValue(event){
            this.RetiredValue = event.target.value;
            console.log('this.RetiredValue handle---', this.RetiredValue);
        }
        
        handleRetiredReason(event){
            this.RetiredReason = event.target.value;
            console.log('this.RetiredReason handle---', this.RetiredReason);

        }

        scrapSave(event){
            console.log('1');

            // if(isFieldValid) {
            console.log('SaveInvoked');
            console.log('this.isInputValidScrapSave invoked---');
            const fields={};
            fields['Id']= this.inventoryId;
            fields['Assigned__c'] = false;
            fields['Retire__c'] = true;
            fields['Retired_Date__c'] = this.RetiredDate;
            fields['Retired_Value__c'] = this.RetiredValue ;
            fields['Retired_Reason__c'] = this.RetiredReason;
            const recordInput={ fields};
            console.log('recordInput------->',recordInput);
            
                    updateRecord(recordInput)
                    .then((res)=>{
                     console.log('updateRecordres---',res)
                     this.dispatchEvent(
                         new ShowToastEvent({
                             title: 'Success',
                             message: 'Successfully moved to Scrapped/Retired',
                             variant: 'success',
                         }),
                         );
                         inventoryServiceField({assetId:this.recordId})
                             .then(result=>{
                             console.log('apexinvoked----',result)
                             location.reload();
                             
                         })
                         .catch(error=>{
                             
                         })
                         
                        })
                    .catch(error=>{
                        this.dispatchEvent(
                            new ShowToastEvent({
                              title: 'Error',
                              message: 'Please enter the required values in "RETIRED DATE" "RETIRED REASON"',
                              variant: 'Error',
                            }),
                          );
                    })
            }


        handleActiveChange(event){
                this.ActiveField = event.target.value;
                if(this.ActiveField == false){
                    this.checkboxVal = true;
                }
                else if(this.ActiveField == true){
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error',
                            message: 'You cant make it active',
                            variant: 'error'
                        })
                    );
                    this.checkboxVal=false;
                    this.footerButton=false;
                        this.OutputView= true;
                        this.InputView=false;
                        window.location.reload();
                }
        }

    
        errorService(event){
            console.log('Errorrr'+JSON.stringify(event.detail) )
        }


        handleRecordSelection(){
            this.selectedRecordType = event.target.value;
        }

        handleSentService(event){
            this.SentForService = Event.target.value;
            console.log('this.SentForService----->'+this.SentForService);
            this.ServiceReason= Event.target.value;
            console.log('this.ServiceReason-------->'+this.ServiceReason);
            this.ServiceStartDate = Event.target.value;
            console.log('this.ServiceStartDate---->'+this.ServiceStartDate);
            this.ServiceEndDate = Event.target.value
        }

        handleOptionChange(event){
              let employeeid = event.detail.value;
              this.selectedRecordType = event.target.value;
              console.log("employee Id----------->"+JSON.stringify(employeeid) )
            }


        handleAccountSelection(event) {
            console.log('reached')
            this.emp = event.detail.selectedId;
            console.log('this.emp'+JSON.stringify(event.detail) )
        }

        backPage(){
            this.recordpage = true
            this.checkboxVal=true;
            this.assignPage =false
            this.servicePage=false
            this.scrapPage =false
        }

        closemodal(){
            this.openModal = false;
              this.assignPage = false;
              this.servicePage = false;
              this.scrapPage = false;  
              this.Select_a_Record_type = false;
              this.recordpage =false;
              this.checkboxVal =false;
              this.moveInventory = false;
                location.reload();
              }

              nextPageHandler(event){
                this.assignPage= false;  
                this.servicePage = false;
                this.scrapPage = false;
                // this.checkboxVal=false;
                this.recordpage=false;
                if(this.selectedRecordType == 'Assign_to_other_Employees')
                {
                    this.assignPage = true;
                    this.recordpage =false;
                }
                else if(this.selectedRecordType == 'Send_to_Service')
                {
                    this.servicePage = true;
                    this.recordpage =false;
                }
                else if(this.selectedRecordType == 'Select_a_Record_type')
                {
                    this.checkboxVal =false;
                    this.recordpage =false;
                }
                else if(this.selectedRecordType == 'Scrap')
                {
                    this.scrapPage = true;
                    this.recordpage =false;
                }
                else if(this.selectedRecordType == 'Move_to_inventory')
                {
                    this.moveInventory = true;
                const fields={};
                fields['Id']= this.recordId;
                fields['Active__c'] = false;
                    console.log('fields---->',JSON.stringify(fields))
                    console.log('fieldssss------->',fields)
                const recordInput={ fields };
                console.log('recordINput---->',recordInput)
                updateRecord(recordInput)
                   .then((res) => {
                    console.log('updateRecord---->')
                    console.log('updateRecord---->',updateRecord)
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Successfully moved to inventory',
                            variant: 'success'
                        })
                    );
                    location.reload();
                    this.checkboxVal=false
                })
                    .catch(error=>{
                        console.log('errrrrrrrrrror')
                        console.log('error',JSON.stringify(error))
                    })
                }
    
                else{
                    this.Select_a_Record_type= true; 
                    this.openModal = true; 
                }
            }
    
            handleBackButton(event){
                this.checkboxVal=false;
            }
}