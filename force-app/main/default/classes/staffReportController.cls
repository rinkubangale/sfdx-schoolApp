public with sharing class staffReportController {    
    @AuraEnabled
    public static List<Attendance__c> AttendanceStatus(Integer NextMonth, Integer PrevMonth, Integer NumberreqMonth, String teacherName, boolean next, boolean previous){
        System.debug('NextMonth--->'+ NextMonth );
        System.debug('NumberReqMonth--->'+ NumberReqMonth );
        
        List<Attendance__c> MonthAttendanceRecords = [SELECT Id, Status__c, Date__c, Staff_Name__r.Name, Staff_Name__c from Attendance__c where CALENDAR_MONTH(Date__c) =: NumberreqMonth and Staff_Name__r.Name =: teacherName ORDER By Date__c ASC];
        // if(teacherName=='All'){

        //     MonthAttendanceRecords = [SELECT Id, Status__c, Date__c, Staff_Name__r.Name, Staff_Name__c from Attendance__c where CALENDAR_MONTH(Date__c) =: NumberreqMonth ORDER By Date__c ASC];
        // }
        // else{
        //     MonthAttendanceRecords = [SELECT Id, Status__c, Date__c, Staff_Name__r.Name from Attendance__c where CALENDAR_MONTH(Date__c) =: NumberreqMonth and Staff_Name__r.Name =: teacherName ORDER By Date__c ASC];
        // }

        if(next==false && previous==false){
            System.debug('Attendance--->'+ MonthAttendanceRecords.size() );
                return MonthAttendanceRecords;
                
        }
        else if(next == true){         
            List<Attendance__c> MonthAttendanceRecordsNext = [SELECT Id, Status__c, Date__c, Staff_Name__r.Name from Attendance__c where CALENDAR_MONTH(Date__c) =: NextMonth and Staff_Name__r.Name =: teacherName ORDER BY Date__c ASC];
                System.debug('Attendance--->'+ MonthAttendanceRecordsNext.size() );
            return MonthAttendanceRecordsNext;
        }
        else{
            List<Attendance__c> MonthAttendanceRecordsPrev = [SELECT Id, Status__c, Date__c, Staff_Name__r.Name from Attendance__c where CALENDAR_MONTH(Date__c) =: PrevMonth and Staff_Name__r.Name =: teacherName ORDER BY Date__c ASC]; 
                return MonthAttendanceRecordsPrev;
        }
    }

    @AuraEnabled
    public static List<Attendance__c> AttendanceStatusPerWeek(String teacherName1, boolean next, boolean previous,boolean isFirstclick, Date dates ){
        List<Attendance__c> AttendanceRecords = [SELECT Id, Status__c, Date__c, Staff_Name__r.Name from Attendance__c where Staff_Name__r.Name =: teacherName1 AND Date__c = THIS_WEEK ORDER By Date__c ASC];
        
        Date LastDate = dates;
       
        if(next==false && previous==false){
            System.debug('AttendanceRecords'+AttendanceRecords);
       
            return AttendanceRecords;
        }
        else if(next==true){
         
        List<Attendance__c> AttendanceRecords1 = [SELECT Id, Status__c, Date__c, Staff_Name__r.Name from Attendance__c where Date__c>: LastDate and Staff_Name__r.Name =: teacherName1 ORDER By Date__c ASC LIMIT 7];
            system.debug('AttendanceRecords1'+AttendanceRecords1);
            return AttendanceRecords1;
            
        }
        // else if(previous == true && isFirstclick == true){
        
         
        //     List<Attendance__c> AttendanceRecords2 = [SELECT Id, Status__c, Date__c, Staff_Name__r.Name from Attendance__c where Date__c<: LastDate and Staff_Name__r.Name =: teacherName1 ORDER By Date__c DESC LIMIT 7];
          
        //     system.debug(AttendanceRecords2);
        //     return AttendanceRecords2;
            
        // }
        else{
            
            List<Attendance__c> AttendanceRecords2 = [SELECT Id, Status__c, Date__c, Staff_Name__r.Name from Attendance__c where Date__c<: LastDate and Staff_Name__r.Name =: teacherName1 ORDER By Date__c DESC LIMIT 7];
          
            system.debug(AttendanceRecords2);
            return AttendanceRecords2;
        }
    }

}