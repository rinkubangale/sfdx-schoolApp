import { LightningElement, track } from "lwc";

export default class MyClassroom extends LightningElement {
  @track isTimetable = false;
  @track columns = [0, 0, 0, 0, 0];
  handleNoColumn(e) {
    this.columns = new Array(+e.target.value).fill(0);
    console.log(this.columns, e.target.value);
  }
  showTimetable() {
    this.isTimetable = true;
  }
}
