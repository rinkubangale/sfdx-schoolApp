import {
    LightningElement,
    track,
    api
} from 'lwc';

export default class AdminCertificateEdit extends LightningElement {

    @track headTitle = "Student Certificate Information";
    @track headTitle2 = "Please Select Status";
    @api objectName;

    @track allFields;
    @track isLoading = false;


    get btnLabel() {
        return "Update";
    }

    get option1() {
        return [{
                label: 'Online',
                value: 'online'
            },
            {
                label: 'Couriered',
                value: 'couriered'
            },
            {
                label: 'In-Person Collect',
                value: 'inPersonCollect'
            },
        ];
    }

    handleModalChange() {
        this.dispatchEvent(new CustomEvent("modalchange", {
            detail: false
        }));
    }
}