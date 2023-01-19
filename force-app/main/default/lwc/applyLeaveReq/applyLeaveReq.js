import {
    LightningElement,
    track,
    api
} from 'lwc';

export default class ApplyLeaveReq extends LightningElement {

    @track headTitle = "Apply Leave";
    @api objectName;

    @track allFields;
    @track isLoading = false;


    get option1() {
        return [{
                label: 'Casual Leave',
                value: 'casualLeave'
            },
            {
                label: 'Sick Leave',
                value: 'sickLeave'
            },
        ];
    }

    get option2() {
        return [{
                label: '1',
                value: '1'
            },
            {
                label: '2',
                value: '2'
            }, {
                label: '3',
                value: '3'
            }, {
                label: '4',
                value: '4'
            },
        ];
    }

    get option3() {
        return [{
                label: 'Suresh Jain',
                value: 'SureshJain'
            },
            {
                label: 'Rammanah',
                value: 'Rammanah'
            }, {
                label: 'Mohan Dayal',
                value: 'MohanDayal'
            }, {
                label: 'Webhook',
                value: 'Webhook'
            },
        ];
    }



    get btnLabel() {
        return this.headTitle;
    }

    handleModalChange() {
        this.dispatchEvent(new CustomEvent("modalchange", {
            detail: false
        }));
    }
}