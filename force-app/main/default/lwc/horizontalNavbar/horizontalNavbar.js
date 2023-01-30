import { LightningElement, track, wire } from "lwc";
// import getUserInfo from "@salesforce/apex/getInfo.getUserInfo";
import { getRecord } from "lightning/uiRecordApi";
import Id from "@salesforce/user/Id";
import USER_NAME from "@salesforce/schema/User.Name";
import MEDIUM_PHOTO_URL from "@salesforce/schema/User.MediumPhotoUrl";
import ProfileId from "@salesforce/schema/User.ProfileId";

export default class HorizontalNavbar extends LightningElement {
  @track showListVar = false;
  @track showProfile = false;
  // userInfo;
  @track userImg;
  @track userName;
  profileName;
  @wire(getRecord, {
    recordId: Id,
    fields: [USER_NAME, MEDIUM_PHOTO_URL, ProfileId]
  })
  userDetails({ error, data }) {
    if (data) {
      this.userImg = data.fields.MediumPhotoUrl.value;
      this.userName = data.fields.Name.value;
      this.profileName =
        data.fields.ProfileId.value === "00e6D000000Ri7wQAC"
          ? "Teacher"
          : data.fields.ProfileId.value === "00e6D000000Rj45QAC"
          ? "Student"
          : "Admin";
    } else if (error) {
      this.error = error;
    }
  }
  // @wire(getUserInfo)
  // wiredUserInfo({ error, data }) {
  //     if (data) {
  //         this.userImg = data[0].MediumPhotoUrl;
  //         this.userName = data[0].Name;
  //         console.log("I'm Data: ", data);
  //         console.log("userImg Link: ", this.userImg);
  //         console.log("userName: ", this.userName);
  //     }
  //     else if (error) {
  //         console.error(error);
  //     }

  // }

  showList() {
    !this.showProfile ? (this.showListVar = true) : (this.showListVar = false);
  }

  hideList() {
    this.showListVar = false;
  }

  showProfileHandler() {
    this.showListVar = false;
    this.showProfile = !this.showProfile;
  }
}
