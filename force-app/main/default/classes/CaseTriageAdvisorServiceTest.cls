@IsTest
private class CaseTriageAdvisorServiceTest {
    @IsTest
    static void getSuggestionsReturnsExpectedResults() {
        Case testCase = new Case(
            Subject = 'Login issue reported by customer',
            Status = 'New',
            Origin = 'Email',
            Priority = 'High'
        );

        insert testCase;

        Test.startTest();
        List<CaseTriageAdvisorService.TriageSuggestion> suggestions = CaseTriageAdvisorService.getSuggestions(testCase.Id);
        Test.stopTest();

        System.assertNotEquals(0, suggestions.size(), 'Suggestions should be returned for a valid case.');
        System.assertEquals('Priority', suggestions[0].suggestionType, 'The first suggestion should be the priority review.');
        System.assertEquals('High', suggestions[0].priority, 'The case priority should be carried forward.');
        System.assertEquals('Technical Support', suggestions[1].routingQueue, 'A login issue should route to technical support.');
    }
}
