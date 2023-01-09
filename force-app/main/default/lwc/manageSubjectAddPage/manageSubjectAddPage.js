import {
    LightningElement,
    api,
    track
} from 'lwc';



export default class ManageSubjectAddPage extends LightningElement {
    @api fields;
    @api headTitle = 'Add Subject';
    @api objectName;
    
    @track allFields;
    @track isLoading = false;
    @track isModalOpen = false;

    get btnLabel() {
        return this.headTitle;
    }

    handleModalChange() {
        this.dispatchEvent(new CustomEvent("modalchange", {
            detail: false
        }));
    }


    get options() {
        return [{
                label: 'Reading Skills',
                values: 'ReadingSkills'
            },
            {
                label: 'Writing Skills',
                values: 'WritingSkills'
            },
            {
                label: 'Listening Skills',
                values: 'ListeningSkills'
            },
            {
                label: 'Speaking Skills',
                values: 'SpeakingSkills'
            },
        ];
    }
}