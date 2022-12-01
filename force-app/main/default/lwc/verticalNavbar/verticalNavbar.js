import { LightningElement, track } from "lwc";

export default class VerticalNavbar extends LightningElement {
  toAdmission() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          admission: true,
          home: false,
          fee: false,
          settings: false,
          subscription: false,
          backbtn: false
        }
      })
    );
  }

  toHome() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          admission: false,
          home: true,
          fee: false,
          settings: false,
          subscription: false
        }
      })
    );
  }

  toFee() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          admission: false,
          home: false,
          fee: true,
          settings: false,
          subscription: false
        }
      })
    );
  }
  toSettings() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          admission: false,
          home: false,
          fee: false,
          settings: true,
          subscription: false
        }
      })
    );
  }
  toSubscription() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          admission: false,
          home: false,
          fee: false,
          settings: false,
          subscription: true
        }
      })
    );
  }
  toCheckin() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          admission: false,
          home: false,
          fee: false,
          settings: false,
          subscription: false,
          showCheckin: true
        }
      })
    );
  }

  toInbox() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          admission: false,
          home: false,
          fee: false,
          settings: false,
          subscription: false,
          showCheckin: false,
          inbox: true,
          newFeatures: false
        }
      })
    );
  }

  toSuggestions() {
    this.dispatchEvent(
      new CustomEvent("btnclick", {
        detail: {
          admission: false,
          home: false,
          fee: false,
          settings: false,
          subscription: false,
          showCheckin: false,
          inbox: false,
          newFeatures: true
        }
      })
    );
  }

  get hide() {
    return this.toggle ? "" : "iconTile";
  }

  @track toggle = false;
  handleToggle() {
    this.dispatchEvent(
      new CustomEvent("togglebtn", {
        detail: !this.toggle
      })
    );
    console.log("toggle");
    this.toggle = !this.toggle;
  }
}