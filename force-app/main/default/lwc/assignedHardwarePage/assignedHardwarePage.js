import { LightningElement, api, wire, track } from 'lwc';
import assignedHardwares from '@salesforce/apex/AssetUtils.assignedHardwares';
import bulkUntag from '@salesforce/apex/AssetUtils.bulkUntag';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

const columns = [
    { label: 'Asset ID', fieldName: 'assetName', type: 'url', 
    typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'} 
    },

    { label: 'Product Code', fieldName: 'Inventory', type: 'url',
    typeAttributes: {label: { fieldName: 'Product_Code2__c' }, target: '_blank'}
    },

    { label: 'Product Family', fieldName: 'Product_Family__c' },
    //{ label: 'Active', fieldName: 'Active__c', type: 'boolean', editable: true},
    { label: 'Serial Number', fieldName: 'Serial_Number__c' },
    {label: 'Untag',type: 'button-icon', typeAttributes: {
        label:'Untag',
        iconName:'utility:edit',
        position: 'center'
    }},
];
export default class AssignedHardwarePage extends LightningElement {
    columns = columns;
    isBackButton = false;
    @track isModalOpen= false;

    @track ConfirmationPage= false;

    @track count;

    @track data;

    @api recordId;

    @track assetId;

    @wire (assignedHardwares, {empID: '$recordId'})
    wiredHardwares({error,data}){
        if(data){
            let tempAssetList = []; 
            
            data.forEach((record) => {
                let tempAssetRec = Object.assign({}, record);  
                tempAssetRec.Inventory = '/' + tempAssetRec.Inventory__c;
                tempAssetRec.assetName = '/' + tempAssetRec.Id;
                tempAssetList.push(tempAssetRec);
                
            });
            console.log('data',data);
            this.data= tempAssetList;
            this.count= this.data.length;
            console.log('count', this.count);

            // this.count = data.count(Id);
        }
        else if(error){
            console.log('error', error);
        }
    }

    handleRowAction(event){
        if(event.detail.action.label=='Untag'){
            this.isModalOpen= true;
            this.assetId= event.detail.row.Id;
        }
    }

    // openModel(){
    //     this.isModalOpen= true;
    // }

    closeModel(){
        this.isModalOpen= false;
    }

    // refresh(){
    //     refreshApex(this.data);
    //     console.log('working');
    // }

    selectedAssets=[];

    handleSelectedRow(event){
        this.selectedAssets= event.detail.selectedRows.map(row => { return row.Id });
        console.log(this.selectedAssets);
    }

    OpenConfirmationPage(){
        if(this.selectedAssets.length>0){
            this.ConfirmationPage =true;
        }
        else{
            this.dispatchEvent(    
            new ShowToastEvent({
                    title: 'Error',
                    message: 'Select atleast one Asset to untag',
                    variant: 'error'
                })
            )
        }
        
    }

    closeConfirmPage(){
        this.ConfirmationPage =false;
    }

    untagAssets(){
        bulkUntag({assetId: this.selectedAssets})
        .then(res=> {location.reload();
            this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Selected Assets successfully moved to inventory',
                variant: 'success'
            })
        )
    })
        .catch(console.log('error'))
    }
}