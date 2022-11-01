import { LightningElement, track,wire,api } from 'lwc';
import createAdmissions from '@salesforce/apex/createAdmission.admissionName';
import fetchAcademicYear from '@salesforce/apex/createAdmission.fetchAcademicYear';
// import checkPermissionSet from '@salesforce/apex/createAdmission.checkCustomPermission';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from "lightning/navigation";



export default class CreateSubject extends NavigationMixin(LightningElement) {

 
    value = 'Open';

    get options() {

        return [
            { label: 'Open', value: 'Open' },
            { label: 'Closed', value: 'Closed' },
        ];
    }
   // @track selectStatus;

    @track isBoolean =true
    @track Year=[];
    @track Date;
    @track Status;
    @track Class;
    @track objIds=[] ;
    @track isError=false;

    @track isLoading = false;   
    @track isModalOpen = true;
    @track openPopup = true;

    handleSelectValue(event){
        console.log('Eventtttttttttttttttttt--->'+JSON.stringify(event.detail))
        this.objIds=event.detail
    }
    popup() {
        this.isModalOpen = true;
        // this.dispatchEvent(new CustomEvent('open',{
        //     detail:true
        // }))

    }

    @wire(fetchAcademicYear) 
    wiredFetchAY({error, data}){
        if(data){
            console.log(data)
            let obj=[];
            for( let x of data){
                obj.push({'label': x.From_Year__c +'-'+x.To_Year__c, 'value': x.From_Year__c +'-'+x.To_Year__c})
            }
            this.Year = obj
            // this.options = data.map(item=>{
            //     return 
            //          {label: item.From_Year__c, value: item.From_Year__c};
            // })
            console.log('Optionssss->' +JSON.stringify(this.Year));

        } 
        else{
            console.log(error);
        }
    }

    handleChange(event){
        console.log('eventtttttttt3')

        this.value = event.detail.value;   
        console.log('Status-------->'+this.value)
     }
    handleDate(event){
        this.Date=event.target.value;

     }
     handleAccountSelection(event){
        console.log('eventtttttttt1')
        this.Year=event.detail;
        console.log(this.Year);
        }

    handleClassSelection(event){
        console.log('eventtttttttt2')
        this.Class=event.detail;
        console.log(this.Class);

    }
     handleClick() {
        console.log('Save')

        if(this.Year==null || this.Year == undefined){
            this.isError = true;
            return;
        }
        this.isLoading = true;
        console.log('runCode');
        console.log(this.Year);
        console.log(this.Date);
        console.log(this.Status);
        console.log(this.objIds);
        
        let fieldErrorMsg="Please Enter the";
        this.template.querySelectorAll("lightning-input").forEach(item => {
            // this.isLoading = false;

            let fieldValue=item.value;
            let fieldLabel=item.label;            
            if(!fieldValue){
                item.setCustomValidity(fieldErrorMsg+' '+fieldLabel);
            }
			// else{
            //     if(!this.Year ){
            //         console.log('error');
            //         // this.isLoading = false;

            //         const evt = new ShowToastEvent({
            //             title: 'Error',
            //             message: 'Please enter the Academic Year',
            //             variant: 'error',
            //             mode: 'dismissable'
            //         });
            //         this.dispatchEvent(evt); 
            //         return   
            //     }
            //     if(this.objIds.length==0){
            //     console.log('error');
            //     // this.isLoading = false;

            //         const evt = new ShowToastEvent({
            //             title: 'Error',
            //             message: 'Please enter the Assign Classes',
            //             variant: 'error',
            //             mode: 'dismissable'
            //         });
            //         this.dispatchEvent(evt);  
            //         return 
            //    }


            //    @wire(checkPermissionSet)
            //    permissionSet(result){

            //    }

            
                

  
              
            if(this.isInputValid()){
            createAdmissions({admYear:this.Year,admDate:this.Date,admStatus:this.value,adminClasses:this.objIds})
            .then((res) => {
                console.log('runCode2'+res);
                //this.result = res;

                let obj = JSON.parse(res);
                console.log('b4 if')
                if(obj.isSuccess){
                    console.log('Inside If ');
                    const toastEvent = new ShowToastEvent({
                        title: 'Success!',
                        message: obj.message,
                        variant: 'success'
                    });
                    this.dispatchEvent(toastEvent);
                    // this[NavigationMixin.Navigate]({
                    //     type: 'standard__recordPage',
                    //     attributes: {
                    //         recordId: obj.data,
                    //         objectApiName: 'Admission__c',
                    //         actionName: 'view'
                    //     }
                    // });


                    this.dispatchEvent(new CustomEvent('save',{
                        detail:false
                    }))
                    this.isLoading=false;
                    location.reload();
 
                }
                else{
                    this.dispatchEvent( new ShowToastEvent({
                        title: 'Error!',
                        message: 'This class has been created already in this Academic Year ',
                        variant: 'Error'
                    }))

                }
            
               
            })
            .catch(error => {
                console.log('errorrrrr' + JSON.stringify(error));
            });
         }
            //     item.setCustomValidity("");
        //}
            // item.reportValidity();
		});

    
     
    }

    closePopup(){
        // this.isModalOpen=false;
        this.dispatchEvent(new CustomEvent('close',{
            detail:false
        }))
        // this[NavigationMixin.Navigate]({
        //     type: 'standard__navItemPage',
        //     attributes: {
        //         //recordId: obj.data,
        //         apiName: 'AdmissionListView'
        //     }
        // });
    }


    connectedCallback() {
        console.log('check1111')

    }


}

//     handleChange(event) {
//         this.value = event.detail.value;
//     }



//     handleAccountSelection(event){
//         console.log("the selected record id is"+event.detail);
//     }

//     @wire(createAdmissions,({admId:'$RecordId'}))
//     getadmId; 

//     @api RecordId;
//     @track Name ;

//     @track openPopup = true;
//     popup() {
//         this.openPopup = true;
//     }
//     closePopup() {
//         this.openPopup = false;
//     }
 

//     subjectNameHandler(event) {
//         this.Name = event.target.value;
//     }
       
//     handleClickSave() {
//         console.log('runCode');
//         const isInputsCorrect = [...this.template.querySelectorAll('lightning-input')]
//             .reduce((validSoFar, inputField) => {
//                 inputField.reportValidity();
//                 return validSoFar && inputField.checkValidity();
//             }, true);
//         if (isInputsCorrect){
//             createAdmissions({admName:JSON.stringify(this.Name) })

       
//             .then((res) => {
//                 console.log('runCode2');
//                 this.result = res;
//                 console.log(this.result);
//                 this.result=window.history.back();

//                 const toastEvent = new ShowToastEvent({
//                     title: 'Success!',
//                     message: '_Name created successfully',
//                     variant: 'success'
//                 });
//                 this.dispatchEvent(toastEvent);
//             })
//             .catch(error => {
//                 console.log('errorrrrr' + JSON.stringify(error));
//             });
           
//         }
        
        
//     }
    
//     connectedCallback(){
//         console.log('check1111')
//         // createSubjects()
//         // .then(result => {
//         //     console.log(Create)
//         //     this.Name = result;
//         //     this.error = undefined;
//         // })
//         // .catch(error => {
//         //     this.error = error;
//         //     this.Name = undefined;
//         // });
        
//    }


// }