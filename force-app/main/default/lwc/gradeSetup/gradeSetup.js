import { LightningElement } from "lwc";

export default class GradeSetup extends LightningElement {
  handleModalChange() {
    this.dispatchEvent(
      new CustomEvent("backbtn", {
        detail: false
      })
    );
  }
}
