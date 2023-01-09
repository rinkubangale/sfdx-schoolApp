import {
    LightningElement,
    track,
    api,
    wire
} from 'lwc';
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';
import getFeePlanList from "@salesforce/apex/addFeeType.getFeePlanList";
import deleteRecord from "@salesforce/apex/Lookup.deleteRecord";


const actions = [{
        label: "Assign/Revoke Fees",
        name: "assignRevoke",
        iconName: "utility:change_owner",
        alternativeText: "edit",
        title: "Assign/Revoke Fees"
    }, {
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
        label: 'Fee Plan Id',
        fieldName: 'feePlanId',
        editable: false
    },
    {
        label: 'Fee Plan Name',
        fieldName: 'Name',
        editable: true
    },
    {
        label: 'Last Modified By',
        fieldName: 'LastModifiedBy',
        editable: false
    },
    {
        label: 'Last Modified Date',
        fieldName: 'LastModifiedDate',
        editable: false
    },
    {
        type: "action",
        typeAttributes: {
            rowActions: actions
        }
    }
];

export default class FeePlanListView extends LightningElement {
    @track isFeeSummaryOpen = false;
    @track isModalOpen = false;
    @track isCreateFeeOpen = false;

    dataList = [{
            feePlanId: "001",
            Name: "Annual Plan",
            LastModifiedBy: "Srihari N",
            LastModifiedDate: "26-Dec-2022",
        },
        {
            feePlanId: "002",
            Name: "Monthly Plan",
            LastModifiedBy: "Shubhendra Shukla",
            LastModifiedDate: "26-Dec-2022",
        }, {
            feePlanId: "003",
            Name: "Annual Customised Plan",
            LastModifiedBy: "Srihari N",
            LastModifiedDate: "01-Jan-2023",
        }
    ];

    columns = columns;

    openCreateFeePlan() {
        this.isCreateFeeOpen = true;
    }

    closeCreateFeePlan() {
        this.isCreateFeeOpen = false;
    }

    closeFeeSummary() {
        this.isFeeSummaryOpen = false;
        this.isCreateFeeOpen = false;
    }

    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }

    handleModalChange(event) {

        this.isModalOpen = event.detail;

    }

    // @wire(getFeePlanList)
    // wiredDepartments({
    //     data,
    //     error
    // }) {
    //     if (data) {
    //         this.error = undefined;
    //         this.dataList = data.map((item) => {
    //             return {
    //                 Id: item.Id,
    //                 Name: item.Name,
    //                 LastModifiedBy: item.LastModifiedBy.Name,
    //                 LastModifiedDate: item.LastModifiedDate.split('T')[0],
    //             }
    //         });
    //     } else if (error) {
    //         this.error = error;
    //         this.dataList = undefined;
    //     }
    // }

    recid = [];
    rowActionHandler(event) {
        if (event.detail.action.name === "delete") {
            console.log("delete");
            this.isDelete = true;
            this.recid.push(event.detail.row.Id);
            deleteRecord({
                    myObject: "Fee_plan__c",
                    recordId: this.recid
                })
                .then((result) => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Success",
                            message: "Record deleted Successfully",
                            variant: "success"
                        })
                    );
                    this.isLoading = false;
                    setTimeout(() => {
                        location.reload();
                    }, 1500)
                })
                .catch((error) => {
                    console.log(JSON.stringify(error))
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Error while deleting a record",
                            message: "cannot delete",
                            variant: "error"
                        })
                    );
                });
        }
        if (event.detail.action.name === 'edit') {
            this.recordID = event.detail.row.Id;
            this.isModalOpen = true;
        }
        if (event.detail.action.name === 'assignRevoke') {
            this.isFeeSummaryOpen = true;
        }
    }


    goBack() {
        this.dispatchEvent(new CustomEvent('backbtn', {
            detail: false,
        }))
    }
}