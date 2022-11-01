import { LightningElement, track, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getFeePlanList from "@salesforce/apex/addFeeType.getFeePlanList";
import deleteRecord from "@salesforce/apex/Lookup.deleteRecord";

const actions = [
    {
        label: 'Edit', name: 'edit', iconName: "utility:edit",
        alternativeText: "Edit",
        title: "Edit"
    },
    {
        label: 'Delete', name: 'delete', iconName: "utility:delete",
        alternativeText: "Delete",
        title: "Delete"
    }
];

const columns = [
    { label: 'Fee Plan Id', fieldName: 'Id', editable: false },
    { label: 'Fee Plan Name', fieldName: 'Name', editable: true },
    { label: 'Last Modified By', fieldName: 'LastModifiedBy', editable: false },
    { label: 'Last Modified Date', fieldName: 'LastModifiedDate', editable: false },
    { type: 'action', typeAttributes: { rowActions: actions } }
];

export default class FeePlanListView extends LightningElement {

    columns = columns;
    @track dataList;
    @track isModalOpen = false;
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }
    
    handleModalChange(event) {

        this.isModalOpen = event.detail;

    }

    @wire(getFeePlanList)
    wiredDepartments({ data, error }) {
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

    recid = [];
    rowActionHandler(event) {
        if (event.detail.action.name === "delete") {
            console.log("delete");
            this.isDelete = true;
            this.recid.push(event.detail.row.Id);
            deleteRecord({ myObject: "Fee_plan__c", recordId: this.recid })
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
    }


    goBack() {
        this.dispatchEvent(new CustomEvent('backbtn', {
            detail: false,
        }))
    }
}