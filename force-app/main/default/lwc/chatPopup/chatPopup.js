import { LightningElement } from "lwc";

export default class ChatPopup extends LightningElement {
  messages = [
    {
      Id: 1,
      className: "container darker",
      timeClass: "time-left",
      textMsg: "Hello. How are you today?",
      textTime: "11:00"
    },
    {
      Id: 2,
      className: "container",
      timeClass: "time-right",
      textMsg: "Hey! I'm fine. Thanks for asking!",
      textTime: "11:01"
    }
  ];
}
