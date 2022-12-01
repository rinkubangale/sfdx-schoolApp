import { LightningElement, api, track } from "lwc";

export default class AddEditAdhocFee extends LightningElement {
  @api fields;
  @api headTitle = 'Add Adhoc Fee';
  @api objectName;
  @api subHeadTitle;
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
    this.dispatchEvent(new CustomEvent("modalchange", { detail: false }));
  }

  handleLoading() {
    this.isLoading = false;
  }
  @track recordId;
  @track isModalOpen = false;
  @track netValue = 0;
//   openModal() {
//       // to open modal set isModalOpen tarck value as true
//       this.isModalOpen = true;
//   }
//   closeModal() {
//       // to close modal set isModalOpen tarck value as false
//       this.isModalOpen = false;
//   }
  submitDetails() {
      // to close modal set isModalOpen tarck value as false
      //Add your code to call apex method or do some processing
      this.isModalOpen = false;
      saveAdhocFees({ adhocFeeObj: this.data })
          .then((res) => {
              console.log(res);
              this.showSuccess();
              location.reload();
          })
          .catch((err) => {
              console.error(err);
          })
  }
  // columns = columns;
  @track data = {
      Name: "",
      Academic_Year__c: "",
      Billing_Date__c: "",
      Due_Date__c: "",
      Reminder__c: "",
      Status__c: "",
      Quantity__c:0,
      Discount_Amount__c:0,
      Discount_Percentage__c:0,
      Actual_Amount_One_Quantity__c:0,
      Tax_SLAB__c:0,
      Amount__c:"",
      Fee_Name__c:"",
     
  }
  // @track Net_Amount__c = 0;
  

  get Net_Amount__c(){
      return this.data.Quantity__c*this.data.Actual_Amount_One_Quantity__c;
  }
   
  get Actual_Amount_One_Quantity__c(){
      return this.data.Actual_Amount_One_Quantity__c;
  }
  get Discount_Amount__c(){
      return (this.data.Discount_Percentage__c)*(this.Net_Amount__c)/100;
  }
  get Amount__c(){
      return (this.data.Tax_SLAB__c)*(this.Net_Amount__c)/100;
  }

  handleInputChange(e) {
      this.data[e.target.fieldName] = e.target.value;
      console.log(this.data);
  }
  onChangeHandler(e){
      this.data[e.target.name] = e.target.value;
      console.log(this.data);
  }

  showSuccess() {
      const evt = new ShowToastEvent({
          title: 'Success',
          message: `Adhoc Fee "${this.data.Name}" is created successfully`,
          variant: 'success',
          mode: 'dismissable'
      });
      this.dispatchEvent(evt);
  }
  @track payment = {data:[{Id: '001'}]};

  @track Id = '001';

  handleClick(){

      this.payment.data.push({ Id: +this.Id++});

  }

  removeBtn(){

      if(this.payment.data.length > 1){

          this.payment.data.pop();

      }

  }
}