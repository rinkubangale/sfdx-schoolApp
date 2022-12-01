import {
    LightningElement,
    track,
    api,
    wire
} from 'lwc';
import getAdhocFeeList from "@salesforce/apex/addFeeType.getAdhocFeeList";
import deleteRecord from '@salesforce/apex/Lookup.deleteRecord';
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';
import {
    refreshApex
} from '@salesforce/apex'

const actions = [{
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
        label: 'Adhoc Fee Name',
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
        type: 'action',
        typeAttributes: {
            rowActions: actions
        }
    }
];

export default class AdhocFeeListView extends LightningElement {
    @track isAdhocFeeOpen = false;
    @track isModalOpen = false;
    @track recid = [];
    @track DelId = [];
    @track isDelete;
    @track recordID;
    @track arr = [];
    selectedContactIdList = [];

    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
        refreshApex(this.wiredDatas)
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }

    openAdhocFee(){
        this.isAdhocFeeOpen = true;
    }
    closeAdhocFee(){
        this.isAdhocFeeOpen = false;
    }
    
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }

    handleModalChange(event) {
        this.isModalOpen = event.detail;
    }
    searchKey = '';
    @track recid = [];
    columns = columns;
    @track dataList;
    @track data;
    wiredDatas;
    @wire(getAdhocFeeList)
    wiredDepartments(value) {
        this.wiredDatas = value;
        // Destructure the provisioned value 
        const {
            data,
            error
        } = value;
        if (data) {
            this.error = undefined;
            this.dataList = data.map((item) => {
                return {
                    Id: item.Id,
                    Name: item.Name,
                    LastModifiedBy: item.LastModifiedBy.Name,
                    LastModifiedDate: item.LastModifiedDate.split('T')[0],
                }
            });
        } else if (error) {
            this.error = error;
            this.dataList = undefined;
        }
    }

    handlesearch(event) {
        this.depname = event.target.value;
    }
    @track deleteList = [];

    handleDelete(event) {
        console.log('event.detail.row : ' + JSON.stringify(event.detail.row));
        this.deleteList = event.detail.row;
    }
    rowActionHandler(event) {
        const action = event.detail.action;
        const rowDel = [];

        if (event.detail.action.name === "delete") {
            console.log("delete");
            this.isDelete = true;
            this.recid.push(event.detail.row.Id);
            deleteRecord({
                    myObject: "Adhoc_Fee__c",
                    recordId: this.recid
                })
                .then((result) => {

                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Success",
                            message: " Record deletd Successfully",
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
    }

    getSelectedIdAction(event) {
        const selectedContactRows = event.detail.selectedRows;
        console.log('selectedContactRows# ' + JSON.stringify(selectedContactRows));
        this.selectedContactRows = [];

        for (let i = 0; i < selectedContactRows.length; i++) {
            this.selectedContactIdList.push(selectedContactRows[i].Id);
        }

    }

    goBack() {
        this.dispatchEvent(new CustomEvent('backbtn', {
            detail: false,
        }))
    }
}