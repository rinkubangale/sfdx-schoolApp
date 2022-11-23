import {
  LightningElement,
  track
} from 'lwc';

export default class ManageBranch extends LightningElement {
  @track isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  handleModalChange() {
    this.dispatchEvent(new CustomEvent("modalchange", {
      detail: false
    }));
  }
}