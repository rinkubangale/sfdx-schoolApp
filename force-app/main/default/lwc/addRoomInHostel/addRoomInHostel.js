import {
    LightningElement
} from 'lwc';

export default class AddRoomInHostel extends LightningElement {

    options3 = [{
            label: "Ground floor",
            value: "groundfloor"
        },
        {
            label: "1st floor",
            value: "firstfloor"
        },
        {
            label: "2nd floor",
            value: "secondfloor"
        },
        {
            label: "3rd floor",
            value: "thirdfloor"
        }
    ];

    options4 = [{
            label: "Yes",
            value: "yes"
        },
        {
            label: "No",
            value: "no"
        }
    ];

    options5 = [{
            label: "AC",
            value: "AC"
        },
        {
            label: "Non-AC",
            value: "nonAC"
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