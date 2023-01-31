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
        label: "Delete",
        name: "delete",
        iconName: "utility:delete",
        alternativeText: "Delete",
        title: "Delete"
    }
];

const columns = [{
        label: 'Student Name',
        fieldName: 'Name',
        editable: false
    },
    {
        label: 'Class & Section',
        fieldName: 'classSection',
        editable: false
    },
    {
        label: 'Created At',
        fieldName: 'createdAt',
        editable: false
    },
    {
        label: 'Created By',
        fieldName: 'createdBy',
        editable: false
    },
    {
        label: 'Status',
        fieldName: 'status',
        editable: true
    },
    {
        type: "action",
        typeAttributes: {
            rowActions: actions
        }
    }
];
export default class VisitorTracking extends LightningElement {
    
    @track isCreateNewGatePass = false;

    dataList = [{
            Name: "Manoj",
            classSection: "LKG-C",
            createdAt: "26-Dec-2022",
            createdBy: "Vimal",
            status: "Pending"
        },
        {
            Name: "Raman",
            classSection: "UKG-B",
            createdAt: "09-Jan-2023",
            createdBy: "Vimal",
            status: "Active"
        },

    ];

    columns = columns;

    openCreateNewPass() {
        this.isCreateNewGatePass = true;
    }

    closeCreateNewPass() {
        this.isCreateNewGatePass = false;
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