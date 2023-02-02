import {
    LightningElement
} from 'lwc';

export default class AdminHostelMgmt extends LightningElement {
    addHostelPage = false;
    openManageRoomsPage = false;
    openHostelmgmt = true;

    handleAddChange() {
        this.addHostelPage = !this.addHostelPage;
        this.openHostelmgmt = !this.openHostelmgmt;
    }


    handleManageRoomChange() {
        this.openManageRoomsPage = !this.openManageRoomsPage;
        this.openHostelmgmt = !this.openHostelmgmt;
    }



    handleBookAssignChange() {
        this.addBookPage = false;
        this.assignBookIssue = !this.assignBookIssue;
        this.showListView = !this.showListView;
    }
}