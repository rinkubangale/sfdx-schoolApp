public with sharing class searchfee {
    @AuraEnabled(cacheable=true)
    public static List<Fee_Types__c> findfee(String searchKey) {
        String key = '%' + searchKey + '%';
        system.System.debug(key);
        return [
            SELECT  Id, Name, LastModifiedBy.Name,LastModifiedDate
            FROM Fee_Types__c
            WHERE Name LIKE :key 
        ];
    }
}