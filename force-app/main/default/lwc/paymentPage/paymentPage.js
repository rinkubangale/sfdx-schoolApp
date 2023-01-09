import { LightningElement,track } from 'lwc';
const columns = [{
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
  },
 

];
export default class PaymentPage extends LightningElement {
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
    {
        TermName: "",
        FeeType: "",
        InvoiceDate:"",
        InvoiceDueDate:"",
        BillingFrequency:"",
        Refundable:"",
        FeeAmount:"",
        Penalty:"",
        Status:"",
        PaidDate:"Total Amount :",
        TotalAmount:"0"
    }, 
    {
        TermName: "",
        FeeType: "",
        InvoiceDate:"",
        InvoiceDueDate:"",
        BillingFrequency:"",
        Refundable:"",
        FeeAmount:"",
        Penalty:"",
        Status:"",
        PaidDate:"Discount Amount :",
        TotalAmount:"0"
    }, 
    {
        TermName: "",
        FeeType: "",
        InvoiceDate:"",
        InvoiceDueDate:"",
        BillingFrequency:"",
        Refundable:"",
        FeeAmount:"",
        Penalty:"",
        Status:"",
        PaidDate:"Penalty Amount : ",
        TotalAmount:"0"
    }, 
    {
        TermName: "",
        FeeType: "",
        InvoiceDate:"",
        InvoiceDueDate:"",
        BillingFrequency:"",
        Refundable:"",
        FeeAmount:"",
        Penalty:"",
        Status:"",
        PaidDate:"Sibling Discount :",
        TotalAmount:"0"
    }, 
    {
        TermName: "",
        FeeType: "",
        InvoiceDate:"",
        InvoiceDueDate:"",
        BillingFrequency:"",
        Refundable:"",
        FeeAmount:"",
        Penalty:"",
        Status:"",
        PaidDate:"Grand Total Amount : ",
        TotalAmount:"0"
    }, 
    ]
    value = 'None';
    get options() {
        return [
            { label: 'cash', value: 'Male' },
            { label: 'cheque', value: 'Female' },
            { label: 'Demand draft', value: 'Others' },
        ];
    }

  
    get btnLabel() {
      return this.headTitle;
    }
  
    openModal() {
      this.isModalOpen = true;
    }
  
    closeModal() {
      this.isModalOpen = false;
    }
  
    goBack() {
      // history.back();
      this.dispatchEvent(
        new CustomEvent("backbtnn", {
          detail: false
        })
      );
  }
  
}