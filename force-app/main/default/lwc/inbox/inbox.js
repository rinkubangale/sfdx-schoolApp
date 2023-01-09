import {
  track,
  LightningElement
} from "lwc";

const actions = [{
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
  },
  {
    label: "Print",
    name: "Print",
    iconName: "utility:print",
    alternativeText: "Print",
    title: "Print"
  },
  {
    label: "Send",
    name: "Send",
    iconName: "utility:send",
    alternativeText: "Send",
    title: "Send"
  }
];

const columns = [{
    label: "Certificate Id",
    fieldName: "requestId"
  },
  {
    label: "Certificate Type",
    fieldName: "requestType"
  },
  {
    label: "Student Name",
    fieldName: "studentName"
  },
  {
    label: "Parent Name",
    fieldName: "parentName"
  },
  {
    label: "Status",
    fieldName: "status"
  },
  {
    label: "Created By",
    fieldName: "createdBy"
  },
  {
    label: "Verified by",
    fieldName: "verifiedBy"
  },
  {
    type: "action",
    typeAttributes: {
      rowActions: actions
    }
  }
];
export default class Inbox extends LightningElement {

  dataList = [{

    requestId: "CC-01",
    requestType: "Conduct Certificate",
    studentName: "Kshitij",
    parentName: "Manu",
    createdBy: "School Admin",
    status: "Couriered",
    createdBy: "Manu",
    verifiedBy: "Hitesh",

  }]

  columns = columns;




  viewInbox = true;
  @track user;
  @track details = false;
  @track details2 = false;
  handleViewCard(e) {
    this.user = e.target.user;
    this.details = true;
    this.details2 = false;
  }
  handleViewCard2(e) {
    this.user = e.target.user;
    this.details2 = true;
    this.details = false;
  }
}