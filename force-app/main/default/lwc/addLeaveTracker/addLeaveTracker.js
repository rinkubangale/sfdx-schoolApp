import { LightningElement } from 'lwc';

export default class AddLeaveTracker extends LightningElement {
    headTitle = 'Add Holiday';

    get options5() {
        return [{
          label: '0',
          value: 'option0'
        }, {
          label: '1',
          value: 'option1'
        }, {
          label: '2',
          value: 'option2'
        }, {
          label: '3',
          value: 'option3'
        }, {
          label: '4',
          value: 'option4'
        }, {
          label: '5',
          value: 'option5'
        }, {
          label: '6',
          value: 'option6'
        }, {
          label: '7',
          value: 'option7'
        }, {
          label: '8',
          value: 'option8'
        }, {
          label: '9',
          value: 'option9'
        }, {
          label: '10',
          value: 'option10'
        }, {
          label: '11',
          value: 'option11'
        }, {
          label: '12',
          value: 'option12'
        }];
      }
    handleModalChange() {
        this.dispatchEvent(new CustomEvent("modalchange", {
          detail: false
        }));
      }
}