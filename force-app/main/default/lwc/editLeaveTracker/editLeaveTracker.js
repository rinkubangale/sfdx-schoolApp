import { LightningElement, track, wire, api } from "lwc";
import leaveTracker from "@salesforce/apex/leaveTrackerClass.leaveTracker";
import holidayRecordShow from "@salesforce/apex/leaveTrackerClass.holidayRecordShow";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";
const columns = [
  {
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
  { type: 'action', typeAttributes: { rowActions: actions } }
];
export default class EditLeaveTracker extends LightningElement {
  @api recordId;
  @track ImageAddress;
  @track dataList;
  @track Holiday_Name__c;
  @track Name;
  @track LeaveDate;
  @track LeaveLocation;
  @track Description;
  get reminderOptions() {
    return [
      {
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
  @wire(holidayRecordShow) wiredAccounts({ data, error }) {
    if (data) {
      console.log("AA", data);
      this.dataList = data.map((item) => {
        return {
          Id: item.Id,
          Name: `${item.Name}`,
          Leave_Date__c: `${item.Leave_Date__c}`,
          Applicable_For__c: `${item.Applicable_For__r.Name}`,
          Leave_Description__c: `${item.Leave_Description__c}`
        };
      });
    } else if (error) {
      console.log(error);
    }
  }
  columns = columns;
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  showSuccessToast() {
    const evt = new ShowToastEvent({
      title: "New Holiday Created",
      message: "New Holiday record has been created",
      variant: "success",
      mode: "dismissable"
    });
    this.dispatchEvent(evt);
  }

  handleName(event) {
    this.Name = event.target.value;
    console.log("Name", typeof this.Name);
  }

  handleDate(event) {
    this.LeaveDate = event.target.value;
    console.log("LeaveDate", typeof this.LeaveDate);
  }

  handleLocation(event) {
    this.LeaveLocation = event.target.value;
    console.log("LeaveLocation", typeof this.LeaveLocation);
  }

  handleDescription(event) {
    this.Description = event.target.value;
    console.log("Description", typeof this.Description);
  }

  handleImageAddress(event){
this.ImageAddress = event.target.value;
console.log('ImageAddress', typeof this.ImageAddress);
  }

  saveHandler() {
    console.log("Hiiiiiiiiiiiiiiiiiiiiiiii");
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

  goBack() {
    // history.back();
    this.dispatchEvent(
      new CustomEvent("backbtn", {
        detail: false
      })
    );
  }
}