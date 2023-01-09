import { LightningElement,track } from 'lwc';

export default class ViewExamSchedulePage extends LightningElement {
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