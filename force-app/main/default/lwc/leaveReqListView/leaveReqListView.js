import {
    LightningElement,
    track
} from 'lwc';


const actions = [{
        label: "Edit",
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
        label: "Leave Type",
        fieldName: "leaveType"
    },
    {
        label: "Date Applied",
        fieldName: "dateApplied"
    },
    {
        label: "Status",
        fieldName: "status"
    },
    {
        type: "action",
        typeAttributes: {
            rowActions: actions
        }
    }
];


export default class LeaveReqListView extends LightningElement {
    @track isModalOpen = false;

    columns = columns;

    openModal() {

        this.isModalOpen = true;
    }
    closeModal() {

        this.isModalOpen = false;
    }








    dataList = [{
        leaveType: "Casual Leave",
        dateApplied: "09-Jan-2023",
        status: "Active"
    }];

    rowActionHandler(evt) {
        const rowDel = [];

        if (evt.detail.action.name === "delete") {
            this.isDelete = true;
            rowDel.push(evt.detail.row.Id);


            this.DelId = rowDel;
        } else if (evt.detail.action.label === "edit") {
            this.recordId = evt.detail.row.Id;

            this.isModalOpen = true;
        }
    }


    goBack() {
        // history.back();
        this.dispatchEvent(
            new CustomEvent("backbtn", {
                detail: false
            })
        );
    }
}