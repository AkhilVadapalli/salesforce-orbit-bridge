public with sharing class TimeEntryController {
    @AuraEnabled(cacheable=true)
    public static List<Time_Entry__c> getEntriesForCurrentUser() {
        Id uid = UserInfo.getUserId();
        return [SELECT Id, Name, Date__c, Start_Time__c, End_Time__c, Break_Minutes__c, Hours__c, Approved__c, User__c
                FROM Time_Entry__c
                WHERE User__c = :uid
                ORDER BY Date__c DESC
                LIMIT 200];
    }

    @AuraEnabled
    public static Time_Entry__c approveEntry(Id entryId) {
        Time_Entry__c e = [SELECT Id, Approved__c FROM Time_Entry__c WHERE Id = :entryId LIMIT 1];
        e.Approved__c = true;
        update e;
        return e;
    }
}
