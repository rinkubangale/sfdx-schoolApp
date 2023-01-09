import { LightningElement,track} from 'lwc';
// const actions = [
    
//     {label: 'Record Payment', name: 'RecordPayment',},
//     {label: 'Edit Invoice Summary', name: 'EditInvoiceSummary'},
//     {label: 'Cancel Invoice', name: 'CancelInvoice'},
//     {label: 'Send Reminder', name: 'SendReminder'},   
// ];



const actions = [{
  label: "Record Payment",
  name: "RecordPayment",
  alternativeText: "Record Payment",
  title: "Record Payment"
}, {
  label: "Edit Invoice Summary",
  name: "EditInvoiceSummary",
  alternativeText: "Edit Invoice Summary",
  title: "Edit Invoice Summary"
},
{
  label: "Cancel Invoice",
  name: "CancelInvoice",
  alternativeText: "Cancel Invoice",
  title: "Cancel Invoice"
},
{
  label: "Send Reminder",
  name: "SendReminder",
  alternativeText: "Send Reminder",
  title: "Send Reminder"
}
];

const columns = [
    { label: 'Student Name', fieldName: 'StudentName',},
    { label: 'Terms', fieldName: 'Terms',},
    { label: 'Paid Amount', fieldName: 'PaidAmount',  },
    { label: 'pending amount', fieldName: 'pendingamount',},
    { label: 'Total Amount', fieldName: 'TotalAmount', },
    { label: 'Status', fieldName: 'Status', },
    
    
    {
       type: "action",
        typeAttributes: {rowActions: actions},
    },
];
const columns1 = [{
  label: "Term Name",
  fieldName: "TermName"
},
{
  label: "Fee Type",
  fieldName: "FeeType"
},
{
  label: "Invoice Date",
  fieldName: "InvoiceDate"
},
{
  label: "Invoice Due Daten",
  fieldName: "InvoiceDueDate"
},
{
  label: "Billing Frequency",
  fieldName: "BillingFrequency"
},
{
  label: "Refundable ",
  fieldName: "Refundable"
},
{
  label: "Fee Amount(₹)",
  fieldName: "FeeAmount"
},
{
  label: "Penalty",
  fieldName: "Penalty"
},
{
  label: "Status",
  fieldName: "Status"
},
{
  label: "Paid Date",
  fieldName: "PaidDate"
},
{
  label: "Total Amount(₹)",
  fieldName: "TotalAmount"
}


];



export default class AssingStudentList extends LightningElement {
  @track fullModalPopup =true;
  @track recordPayment = false ;
  @track editInvoice = false ;
  @track sendReminder = false ;
  @track cancelInvoice = false ;
    @track label; 
    @track createmodal ;
   columns = columns;
    data = [
        {
            StudentName : "Srihari" ,
            Terms: "4/4",
            PaidAmount: "₹260",
            pendingamount: "₹240",
            TotalAmount: "  ₹500  ",
            Status: "Pending",
          }
    ]
    handleClick(){
    this.label = !this.label;
    }
      closeCancelInvoice() {
        this.cancelInvoice = false;
        this.fullModalPopup=true;
      
      }
      // OpenSendReminder(){
      //   this.sendReminder = !this.sendReminder;
      // }
      closeSendReminder(){
        this.sendReminder = false;
        this.fullModalPopup = true;
      }
      openEditInvoice(){
        this.editInvoice=!this.editInvoice;
      }
      // closeEditInvoice(){
      //   this.editInvoice=false;
      // }
      openRecordPayment(){
        this.recordPayment=!this.recordPayment;
      }


      closeRecordPayment(){
        this.fullModalPopup=true;
        this.recordPayment=false;
      }

      closeEditInvoice(){
        this.editInvoice = false;
        this.fullModalPopup = true;
      }


      closeModal() {
        this.isModalOpen = false;
      }
      submitDetails() {
        this.isModalOpen = false;
      }
     handelModel(){
        this.createmodal = !this.createmodal;
     }
      handleModalChange(event) {
        this.isModalOpen = event.detail;
      }
      handleFullModalPopup(){
        this.fullModalPopup = false;
      }

      goBack() {
        // history.back();
        this.dispatchEvent(
          new CustomEvent("backbtnn", {
            detail: false
          })
        );
      }

      closeFeeSummary() {
        this.isFeeSummaryOpen = false;
        this.isCreateFeeOpen = false;
    }

      rowActionHandler(event) {    
        if (event.detail.action.name === "CancelInvoice") {
          this.fullModalPopup = true;
          this.cancelInvoice = true;
        }
        if (event.detail.action.name === "SendReminder") {
          this.fullModalPopup = true;
          this.sendReminder =true;

        }
        if (event.detail.action.name === "EditInvoiceSummary") {
          this.fullModalPopup = false;
          this.editInvoice=true;

        }
        if (event.detail.action.name === "RecordPayment") {
          console.log('hit1');
          this.fullModalPopup = false;
          this.recordPayment=true;
          console.log('hit');
        }
        
      }
      @track isModalOpen = false;

      columns = columns;
    
      dataList = [{
          TermName: "Term1",
          FeeType: "",
          InvoiceDate:"",
          InvoiceDueDate:"",
          BillingFrequency:"",
          Refundable:"",
          FeeAmount:"₹3,332",
          Penalty:"₹0",
          Status:"Not Paid",
          PaidDate:"",
          TotalAmount:"₹3,332"
      }, {
          TermName: "",
          FeeType: "New fee",
          InvoiceDate:"16-Jan-2024",
          InvoiceDueDate:"24-Jan-2024",
          BillingFrequency:"Recurring",
          Refundable:"No",
          FeeAmount:"₹3,332",
          Penalty:"-",
          Status:"Not Paid",
          PaidDate:"-",
          TotalAmount:""
      }, 
      ]
      columns1 = columns1;
    
      dataList1 = [{
          TermName: "Term 1",
          FeeType: "",
          InvoiceDate:"",
          InvoiceDueDate:"",
          BillingFrequency:"",
          Refundable:"",
          FeeAmount:"₹3,332",
          Penalty:"₹0",
          Status:"Not Paid",
          PaidDate:"",
          TotalAmount:"₹3,332"
      }, {
          TermName: "",
          FeeType: "New fee",
          InvoiceDate:"16-Jan-2024",
          InvoiceDueDate:"24-Jan-2024",
          BillingFrequency:"Recurring",
          Refundable:"No",
          FeeAmount:"₹3,332",
          Penalty:"-",
          Status:"Not Paid",
          PaidDate:"-",
          TotalAmount:""
      },
      {
        TermName: "Term 2",
        FeeType: "",
        InvoiceDate:"",
        InvoiceDueDate:"",
        BillingFrequency:"",
        Refundable:"",
        FeeAmount:"₹3,332",
        Penalty:"₹0",
        Status:"Not Paid",
        PaidDate:"",
        TotalAmount:"₹3,332"
    }, {
        TermName: "",
        FeeType: "New fee",
        InvoiceDate:"16-Jan-2024",
        InvoiceDueDate:"24-Jan-2024",
        BillingFrequency:"Recurring",
        Refundable:"No",
        FeeAmount:"₹3,332",
        Penalty:"-",
        Status:"Not Paid",
        PaidDate:"-",
        TotalAmount:""
    }
      ]
      value = 'None';
      get options() {
          return [
              { label: 'Cash', value: 'Cash' },
              { label: 'Cheque', value: 'Cheque' },
              { label: 'Demand Draft', value: 'Demand Draft' },
          ];
      }
}