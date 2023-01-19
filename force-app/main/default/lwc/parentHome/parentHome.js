import {
  LightningElement,
  track,
  wire
} from "lwc";
import {
  getRecord
} from "lightning/uiRecordApi";
import Id from "@salesforce/user/Id";
import ProfileId from "@salesforce/schema/User.ProfileId";

export default class ParentHome extends LightningElement {
  isTeacher;
  @wire(getRecord, {
    recordId: Id,
    fields: [ProfileId]
  })
  userDetails({
    error,
    data
  }) {
    if (data) {
      this.isTeacher =
        data.fields.ProfileId.value === "00e6D000000Ri7wQAC" ? true : false;
    } else if (error) {
      this.error = error;
    }
  }

  @track openLeaveRequestPage = false;

  leaveReq() {
    this.openLeaveRequestPage = true;
    console.log("leave request");
    this.openCocurricularPerformance = false;
    this.openAttendancePerformance = false;
    this.openAcademicPerformance = false;
  }
  closeLeaveReq() {
    this.openLeaveRequestPage = false;
  }

  @track listDisplay = false;
  @track grxDisplay = true;

  handleListGxBtn(e) {
    this.listDisplay = e.currentTarget.dataset.name === "list" ? true : false;
    this.grxDisplay = e.currentTarget.dataset.name === "grx" ? true : false;
  }

  @track holidayImg = [{
      title: "Gudi Padwa",
      class: "gudi"
    },
    {
      title: "Republic Day",
      class: "republicDay"
    },
    {
      title: "Shivratri",
      class: "shivratri"
    },
    {
      title: "Holi",
      class: "holi"
    },
    {
      title: "Maha Ashtami",
      class: "ashtami"
    },
    {
      title: "Rama Navami",
      class: "navami"
    },
    {
      title: "Raksha Bandhan",
      class: "rakshaBandhan"
    }
  ];
  movePrev() {
    let anchor = this.template.querySelector(".imgFlexScroll");
    anchor.scrollLeft -= 420;
  }
  moveNext() {
    let anchor = this.template.querySelector(".imgFlexScroll");
    anchor.scrollLeft += 420;
  }



  @track openLeaveRequestPage = false;
  @track openAcademicPerformance = false;
  @track openCocurricularPerformance = false;
  @track openAttendancePerformance = false;


  academicPerformance() {
    this.openAcademicPerformance = !this.openAcademicPerformance;
    this.openAttendancePerformance = false;
    this.openCocurricularPerformance = false;
    this.openLeaveRequestPage = false;
  }
  cocurricularPerformance() {
    this.openCocurricularPerformance = !this.openCocurricularPerformance;
    this.openAttendancePerformance = false;
    this.openAcademicPerformance = false;
    this.openLeaveRequestPage = false;
  }
  attendancePerformance() {
    this.openAttendancePerformance = !this.openAttendancePerformance;
    this.openAcademicPerformance = false;
    this.openCocurricularPerformance = false;
    this.openLeaveRequestPage = false;
  }

}