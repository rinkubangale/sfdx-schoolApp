import { LightningElement, track, api } from "lwc";

export default class ContentScreen extends LightningElement {
  @api showAdmission;
  @api showHome;
  @api showFee;
  @api showSetting;
  @api showSubscription;
  @api showCheckin;
  @api showInbox;
  @api showFeatures;
  @api showMyClassroom;
  @api showAssignment;
  @api showTeacherSetting;
  @api goBack;
}
