public with sharing class feeManagement {
    @AuraEnabled
    public static string saveFeePlan(Fee_plan__c feePlanObj){
        Integer flag = 0;
        try {
            if(flag == 0){
                insert feePlanObj;
                flag = 1;
                return 'success';
            }
            return 'Too many DML operations';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static string saveAdhocFees(Adhoc_Fee__c adhocFeeObj){
        Integer flag = 0;
        try {
            if(flag == 0){
                insert adhocFeeObj;
                flag = 1;
                return 'success';
            }
            return 'Too many DML operations';
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}