import { LightningElement, track } from "lwc";

export default class FeatureRequest extends LightningElement {
  submitIdea = false;
  viewAllIdea = true;
  handleSubmitIdea() {
    this.submitIdea = !this.submitIdea;
    this.viewAllIdea = !this.viewAllIdea;
  }
  viewIdeaCard = false;
  handleViewCard() {
    this.viewIdeaCard = !this.viewIdeaCard;
    this.viewAllIdea = !this.viewAllIdea;
  }
  @track textBody =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas integer eget aliquet. Sit amet est placerat in egestas erat.";
}
