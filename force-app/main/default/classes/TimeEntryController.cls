public with sharing class TimeEntryController {
    private static final String APPROVED_PREFIX = '[APPROVED] ';

    @AuraEnabled(cacheable=true)
    public static List<Time_Entry__c> getAllEntries() {
        return [SELECT Id, Name, Date__c, Start_Time__c, End_Time__c
                FROM Time_Entry__c
                ORDER BY Date__c DESC
                LIMIT 200];
    }

    @AuraEnabled
    public static void approveEntry(Id entryId) {
        Time_Entry__c entryRecord = [SELECT Id, Name FROM Time_Entry__c WHERE Id = :entryId LIMIT 1];
        if (entryRecord.Name == null) {
            entryRecord.Name = APPROVED_PREFIX;
        } else if (!entryRecord.Name.startsWith(APPROVED_PREFIX)) {
            entryRecord.Name = APPROVED_PREFIX + entryRecord.Name;
        }
        update entryRecord;
    }
}
