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
      img: "https://img.freepik.com/free-vector/happy-makar-sankranti-festival-beautiful-banner-design_1017-22869.jpg?w=1060&t=st=1673268018~exp=1673268618~hmac=ac8efa1ba4b5ebf6c0356ea2a2266b37cd3de6588734a088d88771483a21f61d",
      title: "Makar Sankranti"
    },
    {
      img: "https://img.freepik.com/premium-vector/tamil-lettering-happy-pongal-font-with-traditional-dish-cooking-bonfire-floral-garland-toran-decorated-brown-background_1302-30515.jpg?w=1060",
      title: "Pongal"
    },
    {
      img: "https://img.freepik.com/free-vector/hindu-traditional-happy-holi-festival-banner_1017-23576.jpg?w=1060&t=st=1673267913~exp=1673268513~hmac=87aa4f5026038699fe12ca0f31abc27381eca15abd62c351d43928ad3ff1ec96",
      title: "Holi"
    },
    {
      img: "https://img.freepik.com/premium-vector/different-religion-people-doing-namaste-welcome-show-unity-diversity-india_1302-22655.jpg?w=1060",
      title: "Independence Day"
    },
    {
      img: "https://img.freepik.com/free-vector/happy-diwali-creative-festival-banner-design_1017-28118.jpg?w=1060&t=st=1673268027~exp=1673268627~hmac=ce88a4b20ab77ec49a372ffb9aa20bbf4aafb2106d54fd4efcf0246acb191b9e",
      title: "Diwali"
    }
  ];
}
