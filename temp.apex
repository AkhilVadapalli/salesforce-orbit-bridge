Case c = new Case(Subject='Login issue - demo run', Status='New', Origin='Email', Priority='High');
insert c;
List<CaseTriageAdvisorService.TriageSuggestion> suggestions = CaseTriageAdvisorService.getSuggestions(c.Id);
System.debug(JSON.serialize(suggestions));
