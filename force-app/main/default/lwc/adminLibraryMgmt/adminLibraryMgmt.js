import { LightningElement } from "lwc";

export default class AdminLibraryMgmt extends LightningElement {
  addBookPage = false;
  assignBookPage = false;
  assignBookIssue = false;
  showListView = true;
  handleAddChange() {
    this.addBookPage = !this.addBookPage;
    this.assignBookPage = false;
    this.showListView = !this.showListView;
  }
  handleAssignChange() {
    this.addBookPage = false;
    this.assignBookPage = !this.assignBookPage;
    this.showListView = !this.showListView;
  }
  handleBookAssignChange() {
    this.addBookPage = false;
    this.assignBookIssue = !this.assignBookIssue;
    this.showListView = !this.showListView;
  }
}