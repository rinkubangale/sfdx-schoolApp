import {
    LightningElement,
    track,
    api
} from 'lwc';


const actions = [{
        label: "View",
        name: "view",
        iconName: "utility:preview",
        alternativeText: "view",
        title: "view"
    },
    {
        label: "Upload Document",
        name: "uploadDocument",
        iconName: "utility:upload",
        alternativeText: "uploadDocument",
        title: "uploadDocument"
    },

];


const columns = [{
        label: "Type",
        fieldName: "Type"
    },
    {
        label: "Subject",
        fieldName: "subject"
    },
    {
        label: "Due On",
        fieldName: "dueOn"
    },
    {
        label: "Status",
        fieldName: "status"
    },
    {
        label: "Soft Copy Required",
        fieldName: "softCopyRequired"
    },
    {
        label: "Marks",
        fieldName: "marks"
    },
    {
        type: "action",
        typeAttributes: {
            rowActions: actions
        }
    }
];
export default class ParentAssignment extends LightningElement {
    @track isModalOpen = false;
    @track calendarView = true;
    @api headTitle = 'View Assignment';
    @track viewPage = false;
    @track evaluatePage = false;

    dataList = [{
        Type: "Home Work",
        subject: "English",
        dueOn: "17-02-2023",
        status: "New",
        softCopyRequired: "No",
        marks: "20/25",
    }];

    openModal() {
        this.isModalOpen = !this.isModalOpen;
    }



    columns = columns;

    goBack() {
        // history.back();
        this.dispatchEvent(
            new CustomEvent("backbtn", {
                detail: false
            })
        );
    }

}