import { LightningElement, api, track } from "lwc";
import { NavigationMixin } from "lightning/navigation";

export default class HomeDefault extends NavigationMixin(LightningElement) {
  @api clicked = false;
  @track academicListView;
  @track departmentListView;
  @track teacherListView;
  @track listClass;
  @track studentListView;
  @track admissionListView;
  @track listSubject;
  @track examListView;
  @track invoiceListView;
  @track schoolSetting;

  connectedCallback() {
    console.log("Home Page Loaded");
  }

  handleBack(e) {
    this.clicked = e.detail;
  }

  closeModal() {
    this.schoolSetting = false;
    this.clicked = false;
  }

  openCard(event) {
    this.clicked = true;
    this.academicListView = false;
    this.departmentListView = false;
    this.teacherListView = false;
    this.listClass = false;
    this.studentListView = false;
    this.admissionListView = false;
    this.listSubject = false;
    this.examListView = false;
    this.invoiceListView = false;
    this.schoolSetting = false;

    switch (event.currentTarget.dataset.name) {
      case "schoolSetting":
        this.schoolSetting = true;
        break;
      case "academicListView":
        this.academicListView = true;
        break;
      case "teacherListView":
        this.teacherListView = true;
        break;
      case "departmentListView":
        this.departmentListView = true;
        break;
      case "listClass":
        this.listClass = true;
        break;
      case "studentListView":
        this.studentListView = true;
        break;
      case "admissionListView":
        this.admissionListView = true;
        break;
      case "listSubject":
        this.listSubject = true;
        break;
      case "examListView":
        this.examListView = true;
        console.log("Invoked++++");
        break;
      case "invoiceListView":
        this.invoiceListView = true;
        break;
      default:
        console.log("Sorry, we are out of data.");
    }
  }
}