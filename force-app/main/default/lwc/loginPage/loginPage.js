import { LightningElement,track } from 'lwc';
import pageUrl from '@salesforce/resourceUrl/recaptchav2';
export default class LoginPage extends LightningElement {
      @track navigateTo;
 
    constructor(){
        super();
        this.navigateTo = pageUrl;
        window.addEventListener("message", this.listenForMessage);//add event listener for message that we post in our recaptchaV2 static resource html file.
    }
 
    captchaLoaded(event){
        if(event.target.getAttribute('src') == pageUrl){
            console.log('Google reCAPTCHA is loaded.');
        } 
    }
 
    listenForMessage(message){
        console.log('message data : ' + message.data);//message.data - The object passed from the other window.
        console.log('message origin : ' + message.origin);//message.origin - The origin of the window that sent the message at the time postMessage was called.
    }
    @track click;
    @track label;
    @track isModalOpen;
    @track createmodal;
    handelmodal(){
        this.label=!this.label;
       
    }
    onhandel(){
        this.click = !this.click;
    }
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
       
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
        
    }
    
    

    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }
    
  handelModel() {
    this.createmodal = !this.createmodal;
    console.log("check" + this.createmodal);
  }
  handleModalChange(event) {
    this.isModalOpen = event.detail;
    this.click = event.detail;
  }

  goBack() {
    // history.back();
    this.dispatchEvent(
      new CustomEvent("backbtn", {
        detail: false
      })
    );
  }
}