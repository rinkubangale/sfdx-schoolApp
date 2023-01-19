import { LightningElement, track, api } from 'lwc';

export default class AdminGenerateCertificate extends LightningElement {
    
    @track headTitle2 = "Generate Certificate";
    @api objectName;

    @track allFields;
    @track isLoading = false;


    get btnLabel() {
        return "Generate";
    }

    get option1() {
        return [{
                label: 'Rahul Kumar',
                value: 'rahul'
            },
            {
                label: 'Delhira',
                value: 'delhira'
            },
            {
                label: 'Donald',
                value: 'donald'
            },
        ];
    }

    get option2() {
        return [{
                label: 'Conduct Certificate',
                value: 'conduct'
            },
            {
                label: 'Transfer Certificate',
                value: 'transfer'
            },
            {
                label: 'Bonafide Certificate',
                value: 'bonafide'
            },
        ];
    }

    handleModalChange() {
        this.dispatchEvent(new CustomEvent("modalchange", {
            detail: false
        }));
    }
}