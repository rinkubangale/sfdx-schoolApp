import { LightningElement,api,track } from 'lwc';

export default class ParentRegister extends LightningElement {
    @api fields;
    @api headTitle='You are registering as';
    @api objectName;
    @api subHeadTitle = 'Parent/Self';
    @track allFields;
    @track isLoading = false;
  
    get btnLabel() {
      return this.headTitle;
    }
    @track isModalOpen = false;
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }
    handleCancel(){
        this.template.querySelector('form').reset();
      }
  
    handleModalChange() {
      this.dispatchEvent(new CustomEvent("modalchange", { detail: false }));
    }
  
    handleLoading() {
      this.isLoading = false;
    }
    goBack() {
      // history.back();
      this.dispatchEvent(
        new CustomEvent("backbtn", {
          detail: false
        })
      );
    }
    value = 'None';

    get options() {
        return [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Others', value: 'Others' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
}