Case c = new Case(Subject='Login issue - demo run', Status='New', Origin='Email', Priority='High');
insert c;
List<CaseTriageAdvisorService.TriageSuggestion> suggestions = CaseTriageAdvisorService.getSuggestions(c.Id);
	List<String> fieldNames = new List<String>(Schema.SObjectType.Time_Entry__c.fields.getMap().keySet());
	fieldNames.sort();
	System.debug(JSON.serialize(fieldNames));
