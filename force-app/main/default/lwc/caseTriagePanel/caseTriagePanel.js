import { LightningElement, api, wire } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getSuggestions from '@salesforce/apex/CaseTriageAdvisorService.getSuggestions';

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

    async handleReview() {
        if (!this.recordId || !this.hasSuggestions) return;
        const priority = this.suggestions[0].priority || 'Medium';
        const fields = { Id: this.recordId, Priority: priority };
        try {
            await updateRecord({ fields });
            this.dispatchEvent(new ShowToastEvent({
                title: 'Updated',
                message: `Priority set to ${priority}`,
                variant: 'success'
            }));
        } catch (err) {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: err.body ? err.body.message : err.message,
                variant: 'error'
            }));
        }
    }

    async handleEscalate() {
        if (!this.recordId) return;
        const fields = { Id: this.recordId, Priority: 'High' };
        try {
            await updateRecord({ fields });
            this.dispatchEvent(new ShowToastEvent({
                title: 'Escalated',
                message: 'Priority set to High',
                variant: 'success'
            }));
        } catch (err) {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: err.body ? err.body.message : err.message,
                variant: 'error'
            }));
        }
    }
}
