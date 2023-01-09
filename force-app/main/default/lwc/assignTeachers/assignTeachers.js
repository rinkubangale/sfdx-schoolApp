import {
  LightningElement,
  track
} from 'lwc';


const actions = [{
  label: "Assign",
  name: "Assign",
  iconName: "utility:change_owner",
  alternativeText: "Assign",
  title: "Assign"
}];


const columns = [{
    label: "Teacher Name",
    fieldName: "teacherName"
  },
  {
    label: "Is Admin",
    fieldName: "isAdmin",
    type: "boolean"
  },
  {
    type: "action",
    typeAttributes: {
      rowActions: actions
    }
  }
];


export default class AssignTeachers extends LightningElement {
  @track isModalOpen = false;

  columns = columns;

  dataList = [{
    teacherName: "Jagadish",
    isAdmin: true,
  }, {
    teacherName: "Abilash",
    isAdmin: true,
  }, {
    teacherName: "Subish",
    isAdmin: false,
  }, {
    teacherName: "Hemanth",
    isAdmin: true,
  }, {
    teacherName: "Ranjith",
    isAdmin: true,
  }]

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
    this.dispatchEvent(new CustomEvent("modalchange", {
      detail: false
    }));
  }



}