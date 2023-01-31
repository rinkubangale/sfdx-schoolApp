import {
    LightningElement,
    api,
    track
} from 'lwc';

export default class CreateNewGatePass extends LightningElement {
    @api fields;
    @track headTitle = "Create New Gate Pass";
    @api objectName;
    @api subHeadTitle = "Add New Fee Types";
    @track allFields;
    @track isLoading = false;

    get btnLabel() {
        return this.headTitle;
    }

    get options1() {
        return [{
                label: 'LKG',
                values: 'LKG'
            },
            {
                label: 'UKG',
                values: 'UKG'
            },
            {
                label: '1st',
                values: '1st'
            },
            {
                label: '2nd',
                values: '2nd'
            },
            {
                label: '3rd',
                values: '3rd'
            },
            {
                label: '4th',
                values: '4th'
            },
            {
                label: '5th',
                values: '5th'
            },
            {
                label: '6th',
                values: '6th'
            },
            {
                label: '7th',
                values: '7th'
            },
            {
                label: '8th',
                values: '8th'
            },
        ];
    }

    get options2() {
        return [{
                label: 'A',
                values: 'A'
            },
            {
                label: 'B',
                values: 'B'
            },
            {
                label: 'C',
                values: 'C'
            },

        ];
    }

    get options3() {
        return [{
                label: 'To take back home',
                values: 'totakebackhome'
            },
            {
                label: 'Parents Teacher Meeting',
                values: 'parentsTeacherMeeting'
            },
            {
                label: 'Others',
                values: 'Others'
            },

        ];
    }


    get options4() {
        return [{
                label: 'Father',
                values: 'father'
            },
            {
                label: 'Mother',
                values: 'mother'
            },
            {
                label: 'Brother',
                values: 'brother'
            },
            {
                label: 'Other',
                values: 'other'
            },

        ];
    }

    handleModalChange() {
        this.dispatchEvent(new CustomEvent("modalchange", {
            detail: false
        }));
    }

    handleLoading() {
        this.isLoading = false;
    }
}