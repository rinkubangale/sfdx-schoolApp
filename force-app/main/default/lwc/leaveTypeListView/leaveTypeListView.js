import {
    LightningElement,
    track
} from 'lwc';


const actions = [{
        label: 'View',
        name: 'view',
        iconName: "utility:preview",
        alternativeText: "View",
        title: "View"
    },
    {
        label: 'Edit',
        name: 'edit',
        iconName: "utility:edit",
        alternativeText: "Edit",
        title: "Edit"
    },
    {
        label: 'Delete',
        name: 'delete',
        iconName: "utility:delete",
        alternativeText: "Delete",
        title: "Delete"
    }
];


const columns = [{
        label: 'Leave Type',
        fieldName: 'leaveType',
        editable: true
    },
    {
        label: 'Type',
        fieldName: 'type',
        editable: false
    },
    {
        label: 'Status',
        fieldName: 'status',
        editable: false
    },
    {
        type: 'action',
        typeAttributes: {
            rowActions: actions
        }
    }
];

export default class LeaveTypeListView extends LightningElement {

    isModalOpen = false;

    dataList = [{
            leaveType: "Earned Leave",
            type: "Paid",
            status: "Active",
        },
        {
            leaveType: "Sick Leave",
            type: "Paid",
            status: "Active",
        },
        {
            leaveType: "Compensatory Off",
            type: "Unpaid",
            status: "Active",
        },
    ];

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }


    columns = columns;

    goBack() {
        this.dispatchEvent(new CustomEvent('backbtn', {
            detail: false,
        }))
    }
}