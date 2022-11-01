public with sharing class userLoginController {
  @AuraEnabled
  public static string createAttendanceRecord(
    string checkInTime,
    string checkOutTime,
    string recordIds
  ) {
    String Id;
    try {
      if (recordIds == '' && checkInTime != '' && checkOutTime == '') {
        Attendance__c attnd = new Attendance__c();
        Id userId = userinfo.getUserId();
        attnd.UserAttendance__c = userId;
        attnd.Check_In__c = checkInTime;
        attnd.Date__c = System.today();
        attnd.Status__c = 'Swipe Out Missing';
        insert attnd;
        System.debug(attnd);
        Id = attnd.Id;
      } else if (recordIds != '' && checkInTime != '' && checkOutTime != '') {
        Attendance__c attnd = [
          SELECT id, Check_Out__c, Status__c
          FROM Attendance__c
          WHERE id = :recordIds
        ];
        Id userId = userinfo.getUserId();
        attnd.Check_Out__c = checkOutTime;
        attnd.Status__c = 'Present';
        update attnd;
        Id = attnd.Id;
      }
      return Id;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static List<Attendance__c> getAttendanceRecord() {
    Id userId = userinfo.getUserId();
    try {
      return [
        SELECT
          id,
          UserAttendance__r.Name,
          Date__c,
          Check_In__c,
          Check_Out__c,
          Status__c
        FROM Attendance__c
        WHERE Date__c = :System.today() AND UserAttendance__c = :userId
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static List<User> getUserBirthdayData() {
    Integer currentMonth = System.today().month();
    Integer currentDay = System.today().day();
    try {
      return [
        SELECT Id, Name, Birthday__c, MediumPhotoUrl
        FROM User
        WHERE
          CALENDAR_MONTH(Birthday__c) = :currentMonth
          AND DAY_IN_MONTH(Birthday__c) >= :currentDay
        ORDER BY Birthday__c ASC
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static List<Leave__c> getListOfHolidays() {
    try {
      return [
        SELECT id, Leave_Date__c, Name
        FROM Leave__c
        WHERE Leave_Date__c >= :System.today()
        // CALENDAR_MONTH(Leave_Date__c) >= :System.today().month()
        // AND CALENDAR_YEAR(Leave_Date__c) >= :System.today().year()
        // AND DAY_IN_MONTH(Leave_Date__c) >= :System.today().day()
        ORDER BY Leave_Date__c ASC
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
