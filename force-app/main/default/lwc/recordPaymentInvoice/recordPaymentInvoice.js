import { LightningElement } from 'lwc';

export default class RecordPaymentInvoice extends LightningElement {
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
            { label: 'Cash', value: 'Cash' },
            { label: 'Cheque', value: 'Cheque' },
            { label: 'Demand Draft', value: 'Demand Draft' },
        ];
    }
    closeRecordPayment(){
      this.recordPayment=false;
      this.editInvoice=false;
      this.cancelInvoice=false;
      this.sendReminder=false;
      this.fullModalPopup=true;
    }
}