import { LightningElement, track } from "lwc";

export default class MyClassroom extends LightningElement {
  isTimetable = true;
  @track columns = [];
  handleNoColumn(e) {
    this.columns = new Array(+e.target.value).fill(0);
    console.log(this.columns, e.target.value);
  }
}
