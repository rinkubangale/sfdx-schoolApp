import {
  LightningElement,
  track,
  wire,
  api
} from "lwc";
import leaveTracker from "@salesforce/apex/leaveTrackerClass.leaveTracker";
import holidayRecordShow from "@salesforce/apex/leaveTrackerClass.holidayRecordShow";
import {
  ShowToastEvent
} from "lightning/platformShowToastEvent";


const actions = [{
    label: 'edit',
    name: 'edit',
    iconName: "utility:edit",
    alternativeText: "edit",
    title: "edit"
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
    label: "Name",
    fieldName: "Name"
  },
  {
    label: "Date",
    fieldName: "Leave_Date__c"
  },
  {
    label: "Location",
    fieldName: "Applicable_For__c"
  },
  {
    label: "Description",
    fieldName: "Leave_Description__c"
  },
  {
    type: 'action',
    typeAttributes: {
      rowActions: actions
    }
  }

];


export default class LeaveTracker extends LightningElement {
  @api recordId;
  @track ImageAddress;
  @track dataList;
  @track arr = [];
  @track isModalOpen = false;
  @track isModalOpenn = false;
  @track Holiday_Name__c;
  @track Name;
  @track DelId = [];
  @track isDelete;
  @track LeaveDate;
  @track LeaveLocation;
  @track Description;
  get reminderOptions() {
    return [{
        label: "1",
        value: "1"
      },
      {
        label: "2",
        value: "2"
      },
      {
        label: "3",
        value: "3"
      }
    ];
  }
  @wire(holidayRecordShow) wiredAccounts({
    data,
    error
  }) {
    if (data) {
      console.log("AA", data);
      this.dataList = data.map((item) => {
        return {
          Id: item.Id,
          Name: item.Name && item.Name,
          Leave_Date__c: item.Leave_Date__c && item.Leave_Date__c,
          Applicable_For__c: item.Applicable_For__c && item.Applicable_For__r.Name,
          Leave_Description__c: item.Leave_Description__c && item.Leave_Description__c,
        };
      });
    } else if (error) {
      console.log(error);
    }
  }
  columns = columns;


  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  handleModalChange(event) {

    this.isShowModal = event.detail;

};

closemodaldelete(event) {
  this.isDelete = event.detail
};
  showSuccessToast() {
    const evt = new ShowToastEvent({
      title: "New Holiday Created",
      message: "New Holiday record has been created",
      variant: "success",
      mode: "dismissable"
    });
    this.dispatchEvent(evt);
  }

  showNonSelectedDeleteToast() {
    const evt = new ShowToastEvent({
        title: 'Error While Deleting the Record',
        message: 'Please select a record to Delete',
        variant: 'error',
        mode: 'dismissable'
    });
    this.dispatchEvent(evt);
}
  handleName(event) {
    this.Name = event.target.value;
    console.log("Name", typeof this.Name);
    console.log("Name", this.Name);
  }

  handleDate(event) {
    this.LeaveDate = event.target.value;
    console.log("LeaveDate", typeof this.LeaveDate);
    console.log("LeaveDate", this.LeaveDate);
  }

  handleLocation(event) {
    this.LeaveLocation = event.target.value;
    console.log("LeaveLocation", typeof this.LeaveLocation);
    console.log("LeaveLocation", this.LeaveLocation);
  }

  handleDescription(event) {
    this.Description = event.target.value;
    console.log("Description", typeof this.Description);
    console.log("Description", this.Description);
  }

  handleImageAddress(event) {
    this.ImageAddress = event.target.value;
    console.log('ImageAddress', typeof this.ImageAddress);
    console.log('ImageAddress', this.ImageAddress);
  }

  saveHandler() {
    console.log("Hiiiiiiiiiiiiiiiiiiiiiiii");

    // if (this.Name == undefined || this.LeaveDate == '' || this.toMonth == null || this.toMonth == '') {
    //   this.showErrorToast();
      
    //   return;
    //        }

    leaveTracker({
        Name: this.Name,
        LeaveDate: this.LeaveDate,
        LeaveLocation: this.LeaveLocation,
        Description: this.Description,
        ImageAddress: this.ImageAddress,
      })
      .then((res) => {
        console.log("Success");
        this.showSuccessToast();
        setTimeout(() => {
          location.reload();
        }, 1500);
      })
      .catch((error) => {
        console.log("HII");
        console.log(error);

        return;
      });
  }
  rowActionHandler(evt) {
    const rowDel = [];

    if (evt.detail.action.name === "delete") {
      this.isDelete = true;
      rowDel.push(evt.detail.row.Id);
      // deleteAclistTable({ arr: rowDel })
      //     .then((res) => this.dataList = res);

      // this.showDeleteToast();

      this.DelId = rowDel;
    } else if (evt.detail.action.label === 'edit') {

      this.recordId = evt.detail.row.Id;

      this.isModalOpenn = true;
console.log('xafsgffsc');
    }
  }


  deleteRec() {
    this.isDelete = true;
    if (this.arr.length > 0) {      
        this.DelId = this.arr;
    }
}

  getSelectedRec() {
    var selectedRecords = this.template.querySelector("lightning-datatable").getSelectedRows();
    if (selectedRecords.length > 0) {

        // console.log('selectedRecords are ', JSON.stringify(selectedRecords));
        selectedRecords.map((currentItem) => {
            this.arr.push(currentItem.Id);
            // alert(currentItem.Id);
        });
        //// this.selectedIds = ids.replace(/^,/, '');
        // this.lstSelectedRecords = selectedRecords;
        // this.arr = selectedIds;
        // alert(this.selectedIds);
        this.deleteRec();

    }
    else {
        this.showNonSelectedDeleteToast();
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