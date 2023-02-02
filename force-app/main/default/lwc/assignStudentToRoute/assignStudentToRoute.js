import { LightningElement } from 'lwc';

export default class AssignStudentToRoute extends LightningElement {
    options = [{
        label: "Boys",
        value: "Boys"
    },
    {
        label: "Girls",
        value: "Girls"
    }
];



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