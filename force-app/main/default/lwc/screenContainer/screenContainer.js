import { LightningElement, track, api } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import externalVidCSS from "@salesforce/resourceUrl/externalVidCSS";

export default class ScreenContainer extends LightningElement {
  isCssLoaded = false;
  renderedCallback() {
    if (this.isCssLoaded) return;
    this.isCssLoaded = true;
    Promise.all([loadStyle(this, externalVidCSS)])
      .then(() => {
        console.log("Files loaded");
      })
      .catch((error) => {
        console.log(error.body.message);
      });
  }

  @track showContainer = {
    admission: false,
    home: true,
    fee: false,
    settings: false,
    subscription: false,
    showCheckin: false,
    backbtn: false,
    visitortracking: false,
    inbox: false
  };

  @track toggle = false;

  handleBtnClick(e) {
    this.showContainer = e.detail;
    console.log(JSON.stringify(this.showContainer));
  }

  handleToggle(e) {
    this.toggle = e.detail;
  }

  get yContainerLeft() {
    return this.toggle ? "yContainerLeft toggle" : "yContainerLeft";
  }
}