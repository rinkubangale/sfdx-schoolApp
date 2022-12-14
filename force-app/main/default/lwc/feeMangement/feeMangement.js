import { LightningElement, api, track } from 'lwc';

export default class FeeMangement extends LightningElement {
    @api clicked = false;
    @track feesListView;
    @track feePlanListView;
    @track adhocFeeListView;
    @track feeInvoice;
    handleBack(e) {
        this.clicked = e.detail;
    }
    openCard(event) {
        this.clicked = true;
        this.feesListView = false;
        this.feePlanListView = false;
        this.adhocFeeListView = false;
        this.feeInvoice = false;

        switch (event.currentTarget.dataset.name) {
            case 'feesListView':
                this.feesListView = true;
                break;
            case 'feePlanListView':
                this.feePlanListView = true;
                break;
            case 'adhocFeeListView':
                this.adhocFeeListView = true;
                break;
            case 'feeInvoice':
                this.feeInvoice = true;
                break;
            default:
                console.log('Sorry, we are out of data.');
        }
    }
}