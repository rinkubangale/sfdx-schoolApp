public with sharing class getInfo {
    @AuraEnabled(cacheable=true)
    public static List<User> getUserInfo() {
        try {
            Id userId = UserInfo.getUserId();
            return [SELECT Id, Name, MediumPhotoUrl FROM User WHERE Id = :userId];        
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}