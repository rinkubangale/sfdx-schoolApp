import { LightningElement, track, api } from "lwc";

export default class ChatPopup extends LightningElement {
  @api userProfile;
  userImgChar;

  @track messages = [
    {
      Id: 1,
      className: "container darker",
      timeClass: "time-left",
      textMsg: "Hello. How are you today?",
      textTime: "11:00 AM"
    },
    {
      Id: 2,
      className: "container",
      timeClass: "time-right",
      textMsg: "Hey! I'm fine. Thanks for asking!",
      textTime: "11:01 AM"
    }
  ];

  textMsg = "";
  handleTextChange(e) {
    this.textMsg = e.target.value;
  }

  clearMsgInputBox() {
    let input = this.template.querySelector("input");
    input.value = "";
    this.textMsg = "";
  }

  enterPressed(event) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }

  sendMessage() {
    console.log("sending message");
    let text = this.textMsg;
    let lastMessage = this.messages[this.messages.length - 1];
    const currTime = new Date(new Date());
    let hour =
      currTime.getHours() < 10
        ? "0" + currTime.getHours()
        : "" + currTime.getHours();
    let minutes =
      currTime.getMinutes() < 10
        ? "0" + currTime.getMinutes()
        : "" + currTime.getMinutes();
    let ampm = currTime.getHours() > 11 ? "PM" : "AM";
    let currentTImestamp = hour + ":" + minutes + " " + ampm;

    this.messages.push({
      Id: ++lastMessage.Id,
      className: "container",
      timeClass: "time-right",
      textMsg: text,
      textTime: currentTImestamp
    });

    this.clearMsgInputBox();
    this.scrollToBottom();
  }

  closeChat() {
    console.log("from chat 22");
    this.dispatchEvent(new CustomEvent("chatclose", { detail: false }));
  }

  connectedCallback() {
    console.log("from chat 74", JSON.stringify(this.userProfile));
    this.userImgChar = this.userProfile.Name[0];
    console.log("from chat 76", this.userImgChar);
  }

  scrollToBottom() {
    let container = this.template.querySelector(".msgBody");
    container.scrollTop = container.scrollHeight;
    console.log("line83", container.scrollHeight, container.scrollTop);
  }
}
