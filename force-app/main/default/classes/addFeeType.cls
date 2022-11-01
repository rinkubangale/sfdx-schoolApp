public with sharing class addFeeType {
    @AuraEnabled
    public static string addFeeType(String feeTypeName){
        try {
            Fee_Types__c feeType = new Fee_Types__c();
            feeType.Name = feeTypeName;
            insert feeType;
            return feeTypeName;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Fee_Types__c> getFeeList(){
        try {
            return [Select Id, Name, LastModifiedBy.Name, LastModifiedDate From Fee_Types__c Order By LastModifiedDate];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Fee_plan__c> getFeePlanList(){
        try {
            return [Select Id, Name, LastModifiedBy.Name, LastModifiedDate From Fee_plan__c Order By LastModifiedDate];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Adhoc_Fee__c> getAdhocFeeList(){
        try {
            return [Select Id, Name, LastModifiedBy.Name, LastModifiedDate From Adhoc_Fee__c Order By LastModifiedDate];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}