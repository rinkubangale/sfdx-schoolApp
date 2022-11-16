import { LightningElement, track, wire, api } from "lwc";
import holidayPrepopulate from  "@salesforce/apex/leaveTrackerClass.holidayPrepopulate";
import updateHolidays from "@salesforce/apex/leaveTrackerClass.updateHolidays";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";

// const columns = [
//   {
//     label: "Name",
//     fieldName: "Name"
//   },
//   {
//     label: "Date",
//     fieldName: "Leave_Date__c"
//   },
//   {
//     label: "Location",
//     fieldName: "Applicable_For__c"
//   },
//   {
//     label: "Description",
//     fieldName: "Leave_Description__c"
//   },
//   { type: 'action', typeAttributes: { rowActions: actions } }
// ];
export default class EditLeaveTracker extends LightningElement {
  @api recordId;
  @track ImageAddress;
  @track dataList;
  @track Holiday_Name__c;
  @track Name;
  @track LeaveDate;
  @track LeaveLocation;
  @track Description;

  @api isShowModal;
  @track isModalOpenn = false;
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
   //@wire(holidayPrepopulate, ({ recId: '$recordId' }))
   updateHolidays ({ error, data })
   {
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
  
  

  isShowModal = false;

  openModal() {
    this.isShowModal = true;
  }
  closeModal() {
    this.isShowModal = false;
    const selectEvent = new CustomEvent('modalchange', {
    detail: this.isShowModal
    });
    this.dispatchEvent(selectEvent);
  }

  
    

  showSuccessToast() {
    const evt = new ShowToastEvent({
      title: "Holiday Updated",
      message: "Holiday record has been Updated",
      variant: "success",
      mode: "dismissable"
    });
    this.dispatchEvent(evt);

    setTimeout(() => {
      location.reload();
    }, 1500);
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

  updateHandler() {
    console.log("Hiiiiiiiiiiiiiiiiiiiiiiii");
    updateHolidays({
      recId: this.recordId,
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