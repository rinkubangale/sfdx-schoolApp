/**
 * @name: FullCalendarController
 * @description: Controller class of fullCalendarJs lightning web component
 * @usage: it is used to fetch, create, delete events from lwc component.
 
 * @author: www.auraenabled.com
 */

 public with sharing class FullCalendarController {

    public class EventException extends Exception {}

    @AuraEnabled(cacheable=true)
    public static List<Exam_Scheduler__c> fetchEvents(String id) {
     System.debug(id);
        return [SELECT Id, Name, Class__r.Name,  Start_Date__c, End_Date__c
                FROM Exam_Scheduler__c where Id=:id];
    }

    

    @AuraEnabled
    public static Id createEvent(String event){

        //The following logic to be replaced with your respective event object
        if(String.isBlank(event)){
            return null;
        }
        Map<String, Object> eventMap = (Map<String, Object>) JSON.deserializeUntyped(event);
       
        Exam_Scheduler__c newEvent = new Exam_Scheduler__c();
        newEvent.Subject__c = eventMap.get('title') != null ? (String)eventMap.get('title') : null;

        String startdate = eventMap.get('start') != null ?
                            ((String)eventMap.get('start')).replace('T', ' ').replace('.000Z', '') :
                            null;
        String endDate = eventMap.get('end') != null ?
                            ((String)eventMap.get('end')).replace('T', ' ').replace('.000Z', '') :
                            null;

        newEvent.Description__c = eventMap.get('description') != null ?  (String)eventMap.get('description') : null;                

        newEvent.StartDateTime__c = startdate != null ? Datetime.valueOfGmt(startdate) : null;
        newEvent.EndDateTime__c = endDate != null ? Datetime.valueOfGmt(endDate) : null;

        // newEvent.IsAllDayEvent = eventMap.get('start') != null ? eventMap.get('start') : null;
        insert newEvent;

        return newEvent.Id;

    }

    /**
     * @description To delete an event from web component
     * @param eventid - event id to delete from the component
     */
    @AuraEnabled
    public static void deleteEvent(Id eventid) {
       
        if(eventid != null){
            delete [SELECT Id FROM Exam_Scheduler__c Where Id=:eventid];
        }else{
            throw new EventException('Event id is not passed');
        }

    }
}
   
    /**
     * @description: To retrieve the most recent events
     */

  // @AuraEnabled(cacheable=true)
    // public static List<Event> fetchEvents() {
    //     return [SELECT Id, Subject, StartDateTime, IsAllDayEvent, EndDateTime, Description
    //             FROM Event
    //             ORDER BY CreatedDate DESC
    //             LIMIT 100];.
    // }

    /**
     * @description To create an event from web component
     * @param event - json string with event details - title, start and end for now
     */

    // @AuraEnabled
    // public static Id createEvent(String event){

    //     //The following logic to be replaced with your respective event object
    //     if(String.isBlank(event)){
    //         return null;
    //     }
    //     Map<String, Object> eventMap = (Map<String, Object>) JSON.deserializeUntyped(event);
       
    //     Event newEvent = new Event();
    //     newEvent.Subject = eventMap.get('title') != null ? (String)eventMap.get('title') : null;

    //     String startdate = eventMap.get('start') != null ?
    //                         ((String)eventMap.get('start')).replace('T', ' ').replace('.000Z', '') :
    //                         null;
    //     String endDate = eventMap.get('end') != null ?
    //                         ((String)eventMap.get('end')).replace('T', ' ').replace('.000Z', '') :
    //                         null;

    //     newEvent.Description = eventMap.get('description') != null ?  (String)eventMap.get('description') : null;                

    //     newEvent.StartDateTime = startdate != null ? Datetime.valueOfGmt(startdate) : null;
    //     newEvent.EndDateTime = endDate != null ? Datetime.valueOfGmt(endDate) : null;

    //     // newEvent.IsAllDayEvent = eventMap.get('start') != null ? eventMap.get('start') : null;
    //     insert newEvent;

    //     return newEvent.Id;

    // }