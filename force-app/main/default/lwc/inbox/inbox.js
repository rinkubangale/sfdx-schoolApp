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
    label: "Approve",
    name: "approve",
    iconName: "utility:check",
    alternativeText: "Approve",
    title: "Approve"
  },
  {
    label: "Reject",
    name: "reject",
    iconName: "utility:close",
    alternativeText: "Reject",
    title: "Reject"
  },
  {
    label: "Print",
    name: "print",
    iconName: "utility:print",
    alternativeText: "Print",
    title: "Print"
  },
  {
    label: "Send",
    name: "send",
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
  @track editPage = false;
  @track deleteConfirmation = false;
  @track approveconfirmation = false;
  @track rejectconfirmation = false;
  @track sendPage = false;
  @track opengeneratecertificate = false;


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

  rowActionHandler(e) {
    if (e.detail.action.name == 'edit') {
      this.editPage = true;
    } else if (e.detail.action.name == 'delete') {
      this.deleteConfirmation = true;
    } else if (e.detail.action.name == 'approve') {
      this.approveconfirmation = true;
    } else if (e.detail.action.name == 'reject') {
      this.rejectconfirmation = true;
    } else if (e.detail.action.name == 'send') {
      this.sendPage = true;
    }

  }

  editPageFunc() {
    this.editPage = !this.editPage;
  }
  sendPageFunc() {
    this.sendPage = !this.sendPage;
  }
  deleteConfirmationFunc() {
    this.deleteConfirmation = !this.deleteConfirmation;
  }
  approveConfirmationFunc() {
    this.approveconfirmation = !this.approveconfirmation;
  }
  rejectConfirmationFunc() {
    this.rejectconfirmation = !this.rejectconfirmation;
  }
  openGenerateCertificate() {
    this.opengeneratecertificate = !this.opengeneratecertificate;
  }
  closeGenerateCertificate() {
    this.opengeneratecertificate = false;
  }

}