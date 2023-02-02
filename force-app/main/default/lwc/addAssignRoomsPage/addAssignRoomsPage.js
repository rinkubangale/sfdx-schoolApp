import { LightningElement } from 'lwc';

export default class AddAssignRoomsPage extends LightningElement {


handleModalChange() {
    this.dispatchEvent(
        new CustomEvent("modalchange", {
            detail: false
        })
    );
}

handleLoading() {
    this.isLoading = false;
}
}