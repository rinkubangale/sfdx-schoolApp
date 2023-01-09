import { LightningElement } from "lwc";

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
  { label: "Name", fieldName: "Name" },
  { label: "Parent Name", fieldName: "ParentName" },
  { label: "Parent Email", fieldName: "ParentEmail" },
  { label: "Class Applied", fieldName: "ClassApplied" },
  { label: "Enrollment Status", fieldName: "EnrollmentStatus" },
  { label: "Assesment", fieldName: "Assesment" },
  { type: "action", typeAttributes: { rowActions: actions } }
];

export default class OnlineAdmission extends LightningElement {
  columns = columns;
  data = [
    {
      Name: "Raj R S",
      ParentName: "Rajesh S",
      ParentEmail: "r@gmail.com",
      ClassApplied: "LKG",
      EnrollmentStatus: "Submitted",
      Assesment: ""
    },
    {
      Name: "Raju R S",
      ParentName: "Rajesh S",
      ParentEmail: "r@gmail.com",
      ClassApplied: "LKG",
      EnrollmentStatus: "Submitted",
      Assesment: ""
    }
  ];
  goBack() {
    // history.back();
    this.dispatchEvent(
      new CustomEvent("backbtn", {
        detail: false
      })
    );
  }
}