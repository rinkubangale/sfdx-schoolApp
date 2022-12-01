import { LightningElement, api } from "lwc";

export default class InboxInfoCard extends LightningElement {
  @api days = false;
  @api approved = false;
  @api typeLeave = false;
}
