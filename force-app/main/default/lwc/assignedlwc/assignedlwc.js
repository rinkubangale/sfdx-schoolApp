import { LightningElement, api, wire, track } from 'lwc';
import getProductList from '@salesforce/apex/AssetUtils.getProductList';
import createAsserts from '@salesforce/apex/AssetUtils.createAsserts';
import INVENTORY_FIELD from '@salesforce/schema/Asset.Inventory__c'
import INVENTORY_LINE_ITEM_FIELD from '@salesforce/schema/Asset.Inventory_Line_Item__c'
import EMPLOYEE_FIELD from '@salesforce/schema/Asset.Employee_Name__c'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';

export default class assignedlwc extends LightningElement {
  @track firstPage = true;
  @api recordId;
  selectedRecordType;
  searchKeyWord = '';
  @track selectedRecords =[];
  columns = [
    { label: "Product Name", fieldName: "Product_Name__c" },
    { label: "Product Family", fieldName: "Product_Family__c" },
    { label: "Product Code", fieldName: "Product_Code__c" },
    { label: "Product Type", fieldName: "Product_Type__c" }
  ]
  recordTypeOptions = [
    { label: 'Hardware', value: 'Hardware' },
    { label: 'Software', value: 'Software' }
  ];
  handleNextPage() {
    console.log(this.selectedRecordType )
    if(this.selectedRecordType == undefined || this.selectedRecordType == null || this.selectedRecordType == ''){
      this.dispatchEvent(
        new ShowToastEvent({
          title: 'Error',
          message: 'Please Fill the required fields',
          variant: 'Error',
        }),
      );
    }else {
      console.log('check====>')
      this.firstPage = false;
    }
  }


  handleSave() {
    console.log('checkl111')
    let assetRecords = []
   // var selectedRecords = this.template.querySelector("lightning-datatable").getSelectedRows();
    console.log(this.selectedRecords);
    if(this.selectedRecords.length == 0){
      this.dispatchEvent(
        new ShowToastEvent({
          title: 'Error',
          message: 'Please select one of the product to create asset',
          variant: 'Error',
        }),
      );
      return;
    }
    this.selectedRecords.map(record => {
      const fields = {};
      if (this.selectedRecordType == 'Hardware') {
        fields[INVENTORY_FIELD.fieldApiName] = record.Id;
      } else {
        fields[INVENTORY_FIELD.fieldApiName] = record.Inventory__c;
        fields[INVENTORY_LINE_ITEM_FIELD.fieldApiName] = record.Id;
      }
      // fields[NAME_FIELD.fieldApiName]=record.Product_Family__c + ' '+ Date.now();
      fields[EMPLOYEE_FIELD.fieldApiName] = this.recordId;
      //const recordInput = { apiName: ASSET_OBJECT.objectApiName, fields };
      assetRecords.push(fields);
    })
    console.log('assetRecords=======>' + JSON.stringify(assetRecords))
    createAsserts({ assertList: JSON.stringify(assetRecords) }).then(result => {
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
  closeModal(){
    this.dispatchEvent(new CloseActionScreenEvent());
  }

  handlesSelectValue(event){
    this.selectedRecordType = event.detail.selectValue;
  }
  handleSelecteProducts(event){
    this.selectedRecords = JSON.parse(JSON.stringify(event.detail.selectedRecords))
  }

}