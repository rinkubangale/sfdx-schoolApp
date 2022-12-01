import { LightningElement } from "lwc";

export default class SubmitIdea extends LightningElement {
  handleModalChange() {
    this.dispatchEvent(new CustomEvent("back", { detail: false }));
  }
}