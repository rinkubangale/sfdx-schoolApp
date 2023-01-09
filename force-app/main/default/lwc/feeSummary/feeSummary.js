import { LightningElement } from 'lwc';

export default class FeeSummary extends LightningElement {
    goBack() {
        // history.back();
        this.dispatchEvent(
          new CustomEvent("backbtn", {
            detail: false
          })
        );
      }
}