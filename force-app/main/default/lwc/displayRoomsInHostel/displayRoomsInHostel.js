import { LightningElement } from 'lwc';

export default class DisplayRoomsInHostel extends LightningElement {
    openAssignRoom = false;

    handleAssignRoomsChange() {
        this.openAssignRoom = !this.openAssignRoom;
    }


    goBack() {
        this.dispatchEvent(
            new CustomEvent("modalchange", {
                detail: false
            })
        );
    }
}