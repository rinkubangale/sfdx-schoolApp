import { LightningElement,track } from 'lwc';

export default class EditExamSchedulePage extends LightningElement {
    @track isLoading = false;
    
    
    handleLoading() {
        this.isLoading = false;
    }
    
    goBack() {
        this.dispatchEvent(
          new CustomEvent("backbtn", {
		  detail: false
          })
        );
    }
}