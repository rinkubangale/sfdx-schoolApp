public with sharing class searchdep {    
    @AuraEnabled(cacheable=true)
    public static List<Department__c> findDepartment(String searchKey) {
        String key = '%' + searchKey + '%';
        system.System.debug(key);
        return [
            SELECT Id, Name,Department_ID__c
            FROM Department__c
            WHERE Name LIKE :key 
        ];
    }
}