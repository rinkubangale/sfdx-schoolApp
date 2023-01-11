import { LightningElement, track, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import Id from "@salesforce/user/Id";
import ProfileId from "@salesforce/schema/User.ProfileId";

export default class ParentHome extends LightningElement {
  isTeacher;
  @wire(getRecord, {
    recordId: Id,
    fields: [ProfileId]
  })
  userDetails({ error, data }) {
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
  }
  closeLeaveReq() {
    this.openLeaveRequestPage = false;
  }

  @track listDisplay = true;
  @track grxDisplay = false;

  handleListGxBtn(e) {
    this.listDisplay = e.currentTarget.dataset.name === "list" ? true : false;
    this.grxDisplay = e.currentTarget.dataset.name === "grx" ? true : false;
  }

  @track holidayImg = [
    {
      img: "https://cdn.kekastatic.net/assets/images/dashboard/holidays/ugadi.svg",
      title: "Gudi Padwa"
    },
    {
      img: "https://cdn.kekastatic.net/assets/images/dashboard/holidays/india-republic-day.svg",
      title: "Republic Day"
    },
    {
      img: "https://cdn.kekastatic.net/assets/images/dashboard/holidays/shivratri.svg",
      title: "Shivratri"
    },
    {
      img: "https://cdn.kekastatic.net/assets/images/dashboard/holidays/holi.svg",
      title: "Holi"
    },
    {
      img: "https://cdn.kekastatic.net/assets/images/dashboard/holidays/dussehra.svg",
      title: "Maha Ashtami"
    },
    {
      img: "https://cdn.kekastatic.net/assets/images/dashboard/holidays/srirama-navami.svg",
      title: "Rama Navami"
    },
    {
      img: "https://cdn.kekastatic.net/assets/images/dashboard/holidays/rakshabandhan.svg",
      title: "Raksha Bandhan"
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
}
