import { LightningElement, api } from "lwc";

export default class ViewIdeaCard extends LightningElement {
  @api textBody;
  handleModalChange() {
    this.dispatchEvent(new CustomEvent("back", { detail: false }));
  }
}