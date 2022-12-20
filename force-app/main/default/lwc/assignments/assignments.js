import CompletedDateTime from "@salesforce/schema/Task.CompletedDateTime";
import { LightningElement, track } from "lwc";

const actions = [
  {
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

const columns = [
  {
    label: "Name",
    fieldName: "Name"
  },
  {
    label: "Class",
    fieldName: "Class"
  },
  {
    label: "Subject",
    fieldName: "Subject"
  },
  {
    label: "Start Date",
    fieldName: "StartDate"
  },
  {
    label: "Submission Date",
    fieldName: "SubmissionDate"
  },
  {
    label: "Status",
    fieldName: "Status"
  },
  {
    type: "action",
    typeAttributes: {
      rowActions: actions
    }
  }
];
export default class Assignments extends LightningElement {
  @track isModalOpen = false;
  @track dataList;
  @track calendarView = true;

  dataList = [
    {
      Name: "Srihari N",
      Class: "LKG-A",
      Subject: "Science",
      StartDate: "22-Jan-2022",
      SubmissionDate: "11-Feb-2022",
      Status: "Completed"
    }
  ];

  openModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  submitDetails() {
    this.isModalOpen = false;
  }

  columns = columns;

  goBack() {
    // history.back();
    this.dispatchEvent(
      new CustomEvent("backbtn", {
        detail: false
      })
    );
  }

  get buttonLabel() {
    return this.calendarView ? "List" : "Calendar";
  }

  handleView() {
    this.calendarView = !this.calendarView;
  }
}
