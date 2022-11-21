import { ShowToastEvent } from "lightning/platformShowToastEvent";

export function showError(message) {
  const event = new ShowToastEvent({
    title: "Error!",
    message: message,
    variant: "error"
  });
  dispatchEvent(event);
}

export function showSuccess(message) {
  const event = new ShowToastEvent({
    title: "Success!",
    message: message,
    variant: "success"
  });
  dispatchEvent(event);
}
