import { LightningElement,track,wire } from 'lwc';
import listClass from "@salesforce/apex/listClass.listClass";

export default class ManageClassroom extends LightningElement {
    @track data;
    @track sectionlist = [{"Name":"A","Class__c":"a0H6D000004KgdiUAC","LastModifiedById":"0056D000005sejwQAA","Id":"a0U6D000004pZynUAE","Class__r":{"Name":"8","Id":"a0H6D000004KgdiUAC"},"LastModifiedBy":{"Name":"Rinku Bangale","Id":"0056D000005sejwQAA"}},{"Name":"B","Class__c":"a0H6D000004KgdiUAC","LastModifiedById":"0056D000005sejwQAA","Id":"a0U6D000004pZyoUAE","Class__r":{"Name":"8","Id":"a0H6D000004KgdiUAC"},"LastModifiedBy":{"Name":"Rinku Bangale","Id":"0056D000005sejwQAA"}}];
    @wire(listClass)
    wiredClasses({ error, data }) {
      if (data) {
        this.data = data.map((item) => {
          return {
            Id: item.Id,
            Name: item.Name,
            Class__c: item.Class__r.Name,
            // Sections__r: item.Sections__r.Name,
            // Department__c: item.Department__r.Name,
            LastModifiedBy: item.LastModifiedBy.Name
          };
        });
        this.error = undefined;
      } else if (error) {
        this.error = error;
        this.data = undefined;
      }
    }
}