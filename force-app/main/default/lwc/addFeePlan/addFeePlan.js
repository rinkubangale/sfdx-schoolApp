import {
  LightningElement,
  track,
  api
} from 'lwc';

export default class AddFeePlan extends LightningElement {
  @api fields;
  @track headTitle = "Create Fee Plan";
  @api objectName;
  @api subHeadTitle = "Add New Fee Plan";
  @track allFields;
  @track isLoading = false;
  @track showDiscFields = false;
  @track showPenaltyFields = false;


  get btnLabel() {
    return this.headTitle;
  }

  setBoxes(event) {
    let boxes = this.template.querySelector('lightning-input').getElementsByClassName('discPenaltyCheckbox');
    let currentBox = event.target.name;
    console.log(currentBox);
    console.log(Array.from(boxes));
    const boxArray = Array.from(boxes);
    console.log(boxArray)
    for (let i = 0; i < boxes.length; i++) {
      let box = boxes[i];
      console.log(box.name);
      console.log(box.checked);
      if (box.name !== currentBox && box.checked) {
        box.checked = false;
        console.log(box.checked);
      }
    }
  }
  onDiscountChange(e) {
    var discountChecked = e.target.checked;
    console.log(discountChecked, 'discountChecked');
    if (discountChecked) {
      console.log("hiiiiiiiiii");
      this.showDiscFields = true;
      this.penaltyDisabled = true;
    } else {
      this.showDiscFields = false;
      this.penaltyDisabled = false;
    }
  }

  onPenaltyChange(e) {
    var penaltyChecked = e.target.checked;
    console.log(penaltyChecked, 'penaltyChecked');
    if (penaltyChecked) {
      this.showPenaltyFields = true;
      this.discountDisabled = true;
    } else {
      this.showPenaltyFields = false;
      this.discountDisabled = false;
    }
  }


  handleModalChange() {
    this.dispatchEvent(new CustomEvent("modalchange", {
      detail: false
    }));
  }

  handleLoading() {
    this.isLoading = false;
  }
}