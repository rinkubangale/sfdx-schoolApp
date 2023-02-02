import {
    LightningElement,
    track
} from "lwc";

export default class AdminTransportMgmt extends LightningElement {
    @track openCreateRoute = false;
    @track openAssignStudents = false;
    
    handleAddRouteChange() {
        this.openCreateRoute = !this.openCreateRoute;
    }

    handleStuAssignChange() {
        this.openAssignStudents = !this.openAssignStudents;
    }




    @track viewfirstRoute = false;
    @track viewSecondRoute = false;
    handleShowLesson(e) {
        console.log(e.target.name);
        switch (e.target.name) {
            case "velacheryRoute":
                this.viewfirstRoute = !this.viewfirstRoute;
                this.viewSecondRoute = false;
                break;
            case "adyarRoute":
                this.viewSecondRoute = !this.viewSecondRoute;
                this.viewfirstRoute = false;
                break
            default:
                this.viewfirstRoute = false;
                this.viewSecondRoute = false;
                break;
        }
    }
}