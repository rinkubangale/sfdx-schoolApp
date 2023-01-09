import {
    LightningElement
} from 'lwc';

export default class AddAssignments extends LightningElement {

    // open_btn = template.querySelector('.open-btn');
    // close_btn = template.querySelector('.close-btn');
    // popup = template.querySelector('.popup');
    // main_popup = template.querySelector('.main-popup');

    // openbtn() {
    //     this.popup.style.display = 'flex';
    //     this.main_popup.style.cssText = 'animation:slide-in .5s ease; animation-fill-mode: forwards;';
    // }


    closebtn() {
       this.dispatchEvent(new CustomEvent('close', { detail:false }))
    }

    // popupoverlay() {
    //     main_popup.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
    //     setTimeout(() => {
    //         popup.style.display = 'none';
    //     }, 500);
    // }

}