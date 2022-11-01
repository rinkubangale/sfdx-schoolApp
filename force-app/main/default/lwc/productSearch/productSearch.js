import { LightningElement,wire,api, track } from 'lwc';
import getProductList from '@salesforce/apex/AssetUtils.getProductList';

export default class ProductSearch extends LightningElement {
    @api selectedRecordType;
    @track searchKeyWord='' ;
    @track responseData = [];
    columns = [
      { label: "Product Name", fieldName: "Product_Name__c" },
      { label: "Product Family", fieldName: "Product_Family__c" },
      { label: "Product Code", fieldName: "Product_Code__c" },
      { label: "Product Type", fieldName: "Product_Type__c" }
    ]
    @wire(getProductList, { recordType: '$selectedRecordType', searchTerm: '$searchKeyWord' })
    getProducts({ data, error }) {
      if (data) {
         console.log('date======>'+data) 
        this.responseData = JSON.parse(data);
  
      }
    }
    
  handleSearchChange(event) {
    this.searchKeyWord = event.detail.value
  }
  handleRowAction(){
    var selectedRecords = this.template.querySelector("lightning-datatable").getSelectedRows();
    this.dispatchEvent(new CustomEvent('selectedrecords',{
        detail:{selectedRecords}
    }))
  }

}