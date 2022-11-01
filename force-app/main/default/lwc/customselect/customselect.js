import { api, LightningElement } from 'lwc';

export default class Customselect extends LightningElement {
    @api recordTypeOptions;

    handleChange(event){
        let selectValue = event.target.value;
        this.dispatchEvent(new CustomEvent('selectedvalue',{
            detail: {selectValue}
        }))
    }
}