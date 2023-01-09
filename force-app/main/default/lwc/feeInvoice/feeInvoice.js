import {
  LightningElement,
  track
} from 'lwc';
const actions = [

  {
    label: 'Assigned Fees Summary',
    name: 'AssignedFeesSummary'
  },
];

const columns = [{
    label: 'Invoice Name',
    fieldName: 'InvoiceName',
    type: 'button',
    typeAttributes: {
      label: {
        fieldName: 'InvoiceName'
      },
      variant: 'base'
    },
    wrapText: true
  },
  // { label: 'Invoice Name', fieldName: 'InvoiceName', },
  {
    label: 'Invoice Type',
    fieldName: 'InvoiceType',
    wrapText: true
  },
  // { label: 'Fee Plan Start Date', fieldName: 'FeePlanStartDate',  },
  // { label: 'Fee Plan End Date', fieldName: 'FeePlanEndDate',},
  {
    label: 'Total Students',
    fieldName: 'TotalStudentFeeAssinged',
    wrapText: true
  },
  {
    label: 'Not Paid',
    fieldName: 'NotPaid',
    wrapText: true
  },
  {
    label: 'Partially Paid',
    fieldName: 'PartiallyPaid',
    wrapText: true
  },
  {
    label: 'Fully Paid',
    fieldName: 'FullyPaid',
    wrapText: true
  },
  {
    label: 'Cancelled',
    fieldName: 'Cancelled',
    wrapText: true
  },
  {
    type: 'action',
    typeAttributes: {
      rowActions: actions
    }
  }
];



export default class FeeInvoice extends LightningElement {
  columns = columns;
  @track createmodal = false;
  @track label;
  @track data;

  data = [{
    InvoiceName: "New Fee",
    InvoiceType: "Term-Fees",
    // FeePlanStartDate: "01-02-2024",
    // FeePlanEndDate: "03-01-2024",
    TotalStudentFeeAssinged: "  3  ",
    NotPaid: "   -   ",
    PartiallyPaid: "  -   ",
    FullyPaid: "  2  ",
    Cancelled: "   1   ",

  }]
 

  closeModal() {
    // to close modal set isModalOpen tarck value as false
    this.createmodal = false;
  }
  submitDetails() {
    // to close modal set isModalOpen tarck value as false
    //Add your code to call apex method or do some processing
    this.isModalOpen = false;
  }
  openModal() {
    this.createmodal = !this.createmodal;
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