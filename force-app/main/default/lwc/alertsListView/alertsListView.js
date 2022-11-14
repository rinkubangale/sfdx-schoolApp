import { LightningElement, track, api, wire } from "lwc";
const actions = [
  {
    label: "Edit",
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
  { label: "SUBJECT NAME", fieldName: "Name" },
  { label: "EVENT TYPE", fieldName: "eventType" },
  { label: "CREATED DATE & TIME", fieldName: "LastModifiedDate" },
  { label: "PUBLISHED DATE & TIME", fieldName: "LastModifiedDate" },
  { label: "DUE DATE", fieldName: "LastModifiedDate" },
  { type: "action", typeAttributes: { rowActions: actions } }
];
export default class AlertsListView extends LightningElement {
  @track isModalOpen = false;
  openModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  columns = columns;
  dataList = [
    {
      Name: "New Year Eve",
      eventType: "Holiday",
      LastModifiedDate: "14-Nov-2022"
    }
  ];
  goBack() {
    this.dispatchEvent(
      new CustomEvent("backbtn", {
        detail: false
      })
    );
  }
}
