import {
    LightningElement,
    track
} from 'lwc';

const actions = [{
        label: "View",
        name: "View",
        iconName: "utility:view",
        alternativeText: "View",
        title: "View"
    },
    {
        label: "edit",
        name: "edit",
        iconName: "utility:edit",
        alternativeText: "edit",
        title: "edit"
    },
    {
        label: "Delete",
        name: "delete",
        iconName: "utility:delete",
        alternativeText: "Delete",
        title: "Delete"
    }
];

const columns = [{
        label: "Category Name",
        fieldName: "categoryName"
    },
    {
        label: "Subject Name",
        fieldName: "subjectName"
    },
    {
        label: "Subject Category",
        fieldName: "subjectCategory"
    },
    {
        type: "action",
        typeAttributes: {
            rowActions: actions
        }
    }
];

const dataList = [{
        categoryName: 'Language',
        subjectName: 'English',
        subjectCategory: 'Reading Skills'
    },
    {
        categoryName: 'Language',
        subjectName: 'English',
        subjectCategory: 'Writing Skills'
    }
]

export default class ManageSubjectListView extends LightningElement {
    @track isModalOpen = false;
    dataList = dataList;

    columns = columns;

    openModal() {
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }

    goBack() {
        this.dispatchEvent(
            new CustomEvent("backbtn", {
                detail: false
            })
        );
    }
}