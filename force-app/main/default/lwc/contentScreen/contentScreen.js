import { LightningElement, wire, api } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import Id from "@salesforce/user/Id";
import ProfileId from "@salesforce/schema/User.ProfileId";

export default class ContentScreen extends LightningElement {
  isTeacher;
  isParent;
  @wire(getRecord, { recordId: Id, fields: [ProfileId] })
  userDetails({ error, data }) {
    if (data) {
      this.isTeacher =
        data.fields.ProfileId.value === "00e6D000000Ri7wQAC" ? true : false;
      this.isParent =
        data.fields.ProfileId.value === "00e6D000000Rj45QAC" ? true : false;
    } else if (error) {
      this.error = error;
    }
  }
  @api showAdmission;
  @api showAcademic;
  @api showHome;
  @api showFee;
  @api showSetting;
  @api showSubscription;
  @api showCheckin;
  @api showInbox;
  @api showFeatures;
  @api showMyClassroom;
  @api showAssignment;
  @api showExam;
  @api showTeacherSetting;
  @api showFacility;
  @api showCertificate;
  @api showAdmin;
  @api goBack;
  @api showVisitorTracking;
}
