import {
    LightningElement
} from 'lwc';

export default class ManageRoomsInHostel extends LightningElement {
    openAssignRoom = false;
    openDisplayRooms = false;
    manageRooms = true;
    openAddRooms  = false;

    handleAssignRoomsChange() {
        this.openAssignRoom = !this.openAssignRoom;
        this.manageRooms = !this.manageRooms;
    }

    displayManageRooms() {
        this.openDisplayRooms = !this.openDisplayRooms;
        this.manageRooms = !this.manageRooms;
    }

    openAddRoomModal(){
        this.openAddRooms = !this.openAddRooms;
        this.manageRooms = !this.manageRooms;
    }

    goBack() {
        this.dispatchEvent(
            new CustomEvent("modalchange", {
                detail: false
            })
        );
    }
}