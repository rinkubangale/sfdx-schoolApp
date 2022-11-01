import { LightningElement, track, api, wire } from 'lwc';
import getFeeList from "@salesforce/apex/addFeeType.getFeeList";
import findfee from "@salesforce/apex/searchfee.findfee"
import deleteRecord from '@salesforce/apex/Lookup.deleteRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import deleteFeeList from '@salesforce/apex/addFeeType.deleteFeeList'


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
    { label: 'Fee Type Name', fieldName: 'Name', editable: true },
    { label: 'Last Modified By', fieldName: 'LastModifiedBy', editable: false },
    { label: 'Last Modified Date', fieldName: 'LastModifiedDate', editable: false },
    { type: 'action', typeAttributes: { rowActions: actions } }
];

export default class FeesListView extends LightningElement {

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
    searchKey = '';
    @track recid = [];
    columns = columns;
    @track dataList;
    @track data;
    @wire(getFeeList)
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
    depname = '';
    @wire(findfee, ({ searchKey: '$depname' }))
    wiredfees({ data, error }) {
        console.log('dataa=========>' + JSON.stringify(data))
        if (data) {
            console.log('this' + JSON.stringify(data));
            this.dataList = data.map((item) => {
                return {
                    Id: item.Id,
                    Name: item.Name,
                    LastModifiedBy: item.LastModifiedBy.Name,
                    LastModifiedDate: item.LastModifiedDate.split('T')[0],
                }
            });
            console.log('this1' + JSON.stringify(data));
            this.error = undefined;
        } else if (error) {
            console.log('this2' + JSON.stringify(error));
            this.error = error;
            console.log('this3' + JSON.stringify(data));
            this.dataList = data.map((item) => {
                return {
                    Id: item.Id,
                    Name: item.Name,
                    LastModifiedBy: item.LastModifiedBy.Name,
                    LastModifiedDate: item.LastModifiedDate.split('T')[0],
                }
            });
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
            deleteRecord({ myObject: "Fee_Types__c", recordId: this.recid })
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
    // @wire (findfee) getContact;
    // @track recordId;

    // handleContactDelete(event){
    //    this.recordId = event.target.value;
    //    //window.console.log('recordId# ' + this.recordId);
    //    deleteRecord(this.recordId) 
    //    .then(() =>{

    //       const toastEvent = new ShowToastEvent({
    //           title:'Record Deleted',
    //           message:'Record deleted successfully',
    //           variant:'success',
    //       })
    //       this.dispatchEvent(toastEvent);

    //       return refreshApex(this.getContact);

    //    })
    //    .catch(error =>{
    //        window.console.log('Unable to delete record due to ' + error.body.message);
    //    });
    // }
    getSelectedIdAction(event) {
        const selectedContactRows = event.detail.selectedRows;
        console.log('selectedContactRows# ' + JSON.stringify(selectedContactRows));
        this.selectedContactRows = [];

        for (let i = 0; i < selectedContactRows.length; i++) {
            this.selectedContactIdList.push(selectedContactRows[i].Id);
        }

        // window.console.log('selectedContactRows1 ' + this.selectedContactRows + selectedContactRows.length );
    }


    // deleteContactRowAction(){
    //     deleteFeeList({arr:this.selectedContactIdList})
    //     .then(()=>{
    //         this.template.querySelector('lightning-datatable').selectedContactRows=[];

    //         const toastEvent = new ShowToastEvent({
    //             title:'Success!',
    //             message:'Record deleted successfully',
    //             variant:'success'
    //           });
    //           this.dispatchEvent(toastEvent);


    //     })
    //     .catch(error =>{
    //         this.errorMsg =error;
    //         window.console.log('unable to delete the record due to ' + JSON.stringify(this.errorMsg));
    //     });
    // }

    goBack() {
        this.dispatchEvent(new CustomEvent('backbtn', {
            detail: false,
        }))
    }
}