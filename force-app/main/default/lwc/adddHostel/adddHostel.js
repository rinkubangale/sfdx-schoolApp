import {
    LightningElement,
    api,
    track
} from 'lwc';

export default class AdddHostel extends LightningElement {

    options = [{
            label: "Boys",
            value: "Boys"
        },
        {
            label: "Girls",
            value: "Girls"
        }
    ];


    handleAssignClassOptionsChange(event) {
        let value = event.detail.value;
        //do something with the value
    }

    get assignClassOptions() {
        return this.assignOptions;
    }

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