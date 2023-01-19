import { LightningElement, track, api } from 'lwc';

export default class ParentCertificateRequestEdit extends LightningElement {
 @track headTitle = "Update Transfer Details";
    @api objectName;

    @track allFields;
    @track isLoading = false;


    get option1() {
        return [{
                label: 'Other School',
                value: 'otherSchool'
            },
            {
                label: 'Internal School Transfer',
                value: 'internalSchoolTransfer'
            },
        ];
    }

    get option2() {
        return [{
                label: 'School Change',
                value: 'schoolChange'
            },
            {
                label: 'Location Change',
                value: 'locationChange'
            },
        ];
    }

    // get option3() {
    //     return [{
    //             label: 'Suresh Jain',
    //             value: 'SureshJain'
    //         },
    //         {
    //             label: 'Rammanah',
    //             value: 'Rammanah'
    //         }, {
    //             label: 'Mohan Dayal',
    //             value: 'MohanDayal'
    //         }, {
    //             label: 'Webhook',
    //             value: 'Webhook'
    //         },
    //     ];
    // }



    get btnLabel() {
        return "Update";
    }

    handleModalChange() {
        this.dispatchEvent(new CustomEvent("modalchange", {
            detail: false
        }));
    }
}