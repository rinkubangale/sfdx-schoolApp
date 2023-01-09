import {
    LightningElement,
    track
} from 'lwc';
const actions = [{
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
        label: "S.No.",
        fieldName: "sno"
    },
    {
        label: "Certificate Request Id",
        fieldName: "requestId"
    },
    {
        label: "Certificate Request Type",
        fieldName: "requestType"
    },
    {
        label: "Created By",
        fieldName: "createdBy"
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
export default class ParentCertificateRequest extends LightningElement {

    dataList = [{
        sno: "001",
        requestId: "CC-01",
        requestType: "Conduct Certificate",
        createdBy: "School Admin",
        status: "Couriered"
    }]

    columns = columns;

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
}