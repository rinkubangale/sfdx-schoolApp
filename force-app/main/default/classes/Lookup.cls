public without sharing class Lookup {
  @AuraEnabled(cacheable=true)
  public static List<sObject> search(
    String searchTerm,
    string myObject,
    String filter
  ) {
    String myQuery = null;
    if (myObject == 'Academic_Year__c') {
      myQuery =
        'Select Id, Name, From_Year__c, From_Month__c, To_Year__c, To_Month__c from ' +
        myObject +
        ' Where Name Like  \'%' +
        searchTerm +
        '%\'';
    } else if (filter != null && filter != '') {
      myQuery =
        'Select Id, Name from ' +
        myObject +
        ' Where Name Like  \'%' +
        searchTerm +
        '%\' AND ' +
        filter +
        ' LIMIT  5';
    } else {
      myQuery =
        'Select Id, Name from ' +
        myObject +
        ' Where Name Like  \'%' +
        searchTerm +
        '%\' LIMIT  5';
    }
    List<sObject> lookUpList = database.query(myQuery);
    return lookUpList;
  }

  @AuraEnabled
  public static String deleteRecord(string myObject, List<String> recordId) {
    try {
      List<SObject> recordList = new List<SObject>();
      String query = 'SELECT Id FROM ' + myObject + ' WHERE Id IN : recordId';
      recordList = Database.query(query);
      if (recordList.size() < 1) {
        return 'Error: No data Found!';
      } else {
        delete recordList;
        return 'Success';
      }
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}