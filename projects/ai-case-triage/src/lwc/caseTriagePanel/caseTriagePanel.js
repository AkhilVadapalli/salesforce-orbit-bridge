import { LightningElement, api, wire } from 'lwc';
import getSuggestions from '@salesforce/apex/CaseTriageService.getSuggestions';

export default class CaseTriagePanel extends LightningElement {
    @api recordId;
    suggestions = [];
    error;

    @wire(getSuggestions, { caseId: '$recordId' })
    wiredSuggestions({ error, data }) {
        if (data) {
            this.suggestions = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.suggestions = [];
        }
    }

    get hasSuggestions() {
        return Array.isArray(this.suggestions) && this.suggestions.length > 0;
    }
}
