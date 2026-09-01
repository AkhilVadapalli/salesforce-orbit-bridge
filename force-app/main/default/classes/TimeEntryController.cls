public with sharing class TimeEntryController {
    private static final String APPROVED_PREFIX = '[APPROVED] ';

    public class EmployeeOption {
        @AuraEnabled public Id value;
        @AuraEnabled public String label;

        public EmployeeOption(Id value, String label) {
            this.value = value;
            this.label = label;
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Time_Entry__c> getAllEntries() {
        return [SELECT Id, Name, Date__c, Start_Time__c, End_Time__c
                FROM Time_Entry__c
                ORDER BY Date__c DESC
                LIMIT 200];
    }

    @AuraEnabled(cacheable=true)
    public static List<EmployeeOption> getEmployeeOptions() {
        List<EmployeeOption> options = new List<EmployeeOption>();
        for (Employee__c employee : [SELECT Id, Name FROM Employee__c ORDER BY Name ASC LIMIT 1000]) {
            options.add(new EmployeeOption(employee.Id, employee.Name));
        }
        return options;
    }

    @AuraEnabled
    public static Id createTimeEntry(Id employeeId, Date entryDate, Time startTime, Time endTime) {
        if (employeeId == null) {
            throw new AuraHandledException('Please select an employee.');
        }
        if (entryDate == null || startTime == null || endTime == null) {
            throw new AuraHandledException('Please fill date, start time, and end time.');
        }

        Employee__c employee = [SELECT Id, Name FROM Employee__c WHERE Id = :employeeId LIMIT 1];

        Time_Entry__c entryRecord = new Time_Entry__c();
        entryRecord.Name = employee.Name;
        entryRecord.Date__c = entryDate;
        entryRecord.Start_Time__c = startTime;
        entryRecord.End_Time__c = endTime;

        Map<String, Schema.SObjectField> fieldMap = Time_Entry__c.SObjectType.getDescribe().fields.getMap();
        if (fieldMap.containsKey('Employee__c')) {
            entryRecord.put('Employee__c', employee.Id);
        }

        insert entryRecord;
        return entryRecord.Id;
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
