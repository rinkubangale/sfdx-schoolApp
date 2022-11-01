import { LightningElement, api, wire, track } from 'lwc';
import employeeList from '@salesforce/apex/AssetUtils.employeeRecords';
import createAsserts from '@salesforce/apex/AssetUtils.createAsserts';
import EMPLOYEE_FIELD from '@salesforce/schema/Asset.Employee_Name__c'
import { CloseActionScreenEvent } from 'lightning/actions'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import INVENTORY_FIELD from '@salesforce/schema/Asset.Inventory__c';
import { getDataConnectorTypes } from 'lightning/analyticsWaveApi';
//import Id from '@salesforce/schema/Account.Id';
export default class AssignEmployee extends LightningElement {
    
    @api recordId;
    selectedRecords =[];
    @track searchKeyWord='' ;
    @track responseData = [];
  columns = [
    { label: "Employee Name", fieldName: "Name" },
    { label: "Employee No.", fieldName: "Unique_Employee_No__c" },
    { label: "IsActive", fieldName: "AMT_Active__c" },
  ]
  @wire(employeeList, { searchTerm : '$searchKeyWord'})
  //@wire(employeeRecords, { searchTerm : '$searchKeyWord'})
  getEmployees({data, error}){
    if(data){
      console.log('data @@ ==> @@  ' +data);
       this.responseData = JSON.parse(data);
      // console.log(this.responseData.name);
    }
  }

  handleSearchChange(event) {
    this.searchKeyWord = event.detail.value
  }

  //On table when we select row this event gets fired.
  
  handleRowAction(){
     this.selectedRecords = this.template.querySelector("lightning-datatable").getSelectedRows();
      console.log('@@ selected log==>> ' + JSON.stringify(this.selectedRecords));
    // if(this.selectedRecords.length > 0){
     //console.log('@@ selected log==>> ' + Json.stringify(this.selectedRecords));
    // console.log('hehehe ==>>' +this.selectedRecords.length);
 // }

 if(this.selectedRecords.length > 1){
       console.log('inside > 1 condition loop' +this.selectedRecords);
        this.dispatchEvent(
        new ShowToastEvent({
          title: 'Error',
          message: 'Please select only one employee to create asset',
          variant: 'Error',
        }),
      );
}
  }
  
  //CLOSE button
     closeModal(){
    this.dispatchEvent(new CloseActionScreenEvent());
  }

  
    handleSave(){
   // console.log('check handleSave');
   // console.log('check' + JSON.stringify(this.selectedRecords[0].Id));
    let assetRecords = [];
      
 if(this.selectedRecords.length == 0){
   //console.log('inside ==0 condition loop');
      this.dispatchEvent(
        new ShowToastEvent({
          title: 'Error',
          message: 'Please select one of the employee to create asset',
          variant: 'Error',
        }),
      );
      return;
    }

    if(this.selectedRecords.length == 1){
      let ids = this.selectedRecords[0].Id;
     // console.log(ids);
         // console.log('hihihi' + this.recordId);
    }
    
   // console.log( 'Hi  ' +this.selectedRecords);
    
    console.log(this.selectedRecords);
    if(this.selectedRecords.length > 1){
       //console.log('inside > 1 condition loop' +this.selectedRecords);
        this.dispatchEvent(
        new ShowToastEvent({
          title: 'Error',
          message: 'Please select only one employee to create asset',
          variant: 'Error',
        }),
      );
      return;
    }


    //Creating Asset record
         this.selectedRecords.map((record) => {
          console.log("hi");
      const fields = {};
      
        fields[EMPLOYEE_FIELD.fieldApiName] = record.Id;
        fields[INVENTORY_FIELD.fieldApiName] = this.recordId;
        
        console.log("hi before the push", fields);
        assetRecords.push(fields);
        console.log('Hi in the last loop', assetRecords);
        
    });

     console.log('assetRecords=======>' + JSON.stringify(assetRecords))
    createAsserts({ assertList: JSON.stringify(assetRecords)}).then(result => {
      console.log('obj-======>'+result)

      let obj = JSON.parse(result);
      console.log('check-======>'+obj)

      if (obj.isSuccess) {
        this.dispatchEvent(
          new ShowToastEvent({
            title: 'Success',
            message: 'Asset Created Successfully',
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
      console.log('error>>'+error.message)

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