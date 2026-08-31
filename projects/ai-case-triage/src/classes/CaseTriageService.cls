public with sharing class CaseTriageService {
    public class TriageSuggestion {
        @AuraEnabled
        public String suggestionType;

        @AuraEnabled
        public String summary;

        @AuraEnabled
        public String priority;

        @AuraEnabled
        public String routingQueue;

        public TriageSuggestion(String suggestionType, String summary, String priority, String routingQueue) {
            this.suggestionType = suggestionType;
            this.summary = summary;
            this.priority = priority;
            this.routingQueue = routingQueue;
        }
    }

    @AuraEnabled
    public static List<TriageSuggestion> getSuggestions(Id caseId) {
        if (caseId == null) {
            return new List<TriageSuggestion>();
        }

        Case currentCase = [
            SELECT Id, Subject, Status, Priority, Origin, Description, CaseNumber
            FROM Case
            WHERE Id = :caseId
            LIMIT 1
        ];

        String priority = String.isBlank(currentCase.Priority) ? 'Medium' : currentCase.Priority;
        String routingQueue = determineQueue(currentCase.Origin, currentCase.Subject);

        List<TriageSuggestion> suggestions = new List<TriageSuggestion>();

        suggestions.add(new TriageSuggestion(
            'Priority',
            'Review the customer impact and determine whether this issue requires escalation or a faster SLA response.',
            priority,
            routingQueue
        ));

        suggestions.add(new TriageSuggestion(
            'Routing',
            'Route this case to the queue most aligned to the issue type and business impact.',
            priority,
            routingQueue
        ));

        suggestions.add(new TriageSuggestion(
            'Response Draft',
            'Draft a brief acknowledgement and request any missing details required to continue the request promptly.',
            priority,
            routingQueue
        ));

        return suggestions;
    }

    private static String determineQueue(String origin, String subject) {
        if (subject != null && subject.toLowerCase().contains('login')) {
            return 'Technical Support';
        }
        if (origin == 'Phone') {
            return 'Priority Support';
        }
        return 'General Support';
    }
}
