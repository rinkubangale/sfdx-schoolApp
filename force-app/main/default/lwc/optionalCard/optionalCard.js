import { LightningElement, api } from "lwc";

export default class OptionalCard extends LightningElement {
  @api headerLine;
  @api exampleTag;
  @api iconName;
}
