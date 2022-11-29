import { LightningElement } from "lwc";

export default class FeatureRequest extends LightningElement {
  submitIdea = false;
  handleSubmitIdea() {
    this.submitIdea = true;
  }
}
