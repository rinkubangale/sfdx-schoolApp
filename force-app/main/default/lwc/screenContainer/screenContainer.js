import { LightningElement, track, wire } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import externalVidCSS from "@salesforce/resourceUrl/externalVidCSS";
import { getRecord } from "lightning/uiRecordApi";
import Id from "@salesforce/user/Id";
import ProfileId from "@salesforce/schema/User.ProfileId";

export default class ScreenContainer extends LightningElement {
  isTeacher;
  isParent;
  branchDisabled;
  @wire(getRecord, { recordId: Id, fields: [ProfileId] })
  userDetails({ error, data }) {
    if (data) {
      this.isTeacher =
        data.fields.ProfileId.value === "00e6D000000Ri7wQAC" ? true : false;
      this.isParent =
        data.fields.ProfileId.value === "00e6D000000Rj45QAC" ? true : false;

      if (this.isParent) {
        this.branchDisabled = true;
      } else {
        this.branchDisabled = false;
      }
    } else if (error) {
      this.error = error;
    }
  }
  isCssLoaded = false;
  renderedCallback() {
    if (this.isCssLoaded) return;
    this.isCssLoaded = true;
    Promise.all([loadStyle(this, externalVidCSS)])
      .then(() => {
        console.log("Files loaded");
      })
      .catch((error) => {
        console.log(error.body.message);
      });
  }

  @track showContainer = {
    admission: false,
    home: true,
    fee: false,
    settings: false,
    subscription: false,
    showCheckin: false,
    backbtn: false,
    visitortracking: false,
    inbox: false
  };

  @track toggle = false;

  handleBtnClick(e) {
    this.showContainer = e.detail;
    console.log(JSON.stringify(this.showContainer));
  }

  handleToggle(e) {
    this.toggle = e.detail;
  }

  get yContainerLeft() {
    return this.toggle ? "yContainerLeft toggle" : "yContainerLeft";
  }
}