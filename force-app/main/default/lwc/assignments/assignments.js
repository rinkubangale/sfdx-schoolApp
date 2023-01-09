import CompletedDateTime from "@salesforce/schema/Task.CompletedDateTime";
import {
  LightningElement,
  track,
  api
} from "lwc";

const actions = [{
    label: "Evaluate",
    name: "evaluate",
    iconName: "utility:asset_audit",
    alternativeText: "evaluate",
    title: "evaluate"
  },
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

const columns = [{
    label: "Assignment Name",
    fieldName: "Name",
    type: 'button',
    typeAttributes: {
      label: {
        fieldName: 'Name'
      },
      variant: 'base'
    },
    wrapText: true
  },
  {
    label: "Submitted",
    fieldName: "submitted"
  },
  {
    label: "Due",
    fieldName: "due"
  },
  {
    label: "Completed",
    fieldName: "completed"
  },
  {
    label: "Submit Date",
    fieldName: "submitDate"
  },
  {
    label: "Due Date",
    fieldName: "dueDate"
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
  @track calendarView = true;
  @api headTitle = 'View Assignment';
  @track viewPage = false;
  @track evaluatePage = false;

  dataList = [{
    Name: "English",
    submitted: "18",
    due: "11",
    completed: "7",
    submitDate: "22-Jan-2022",
    dueDate: "11-Feb-2022",
  }];

  openModal() {
    this.isModalOpen = !this.isModalOpen;
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

  backToListView() {
    this.viewPage = false;
  }

  goBack() {
    this.evaluatePage = false;
  }

  rowActionHandler(e) {
    if (e.detail.action.name == "evaluate") {
      this.evaluatePage = true;
      this.viewPage = false;
    } else {
      this.viewPage = true;
    }
  }
}