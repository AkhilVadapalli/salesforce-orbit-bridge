import { LightningElement, track, wire } from 'lwc';
import getEntriesForCurrentUser from '@salesforce/apex/TimeEntryController.getEntriesForCurrentUser';
import approveEntry from '@salesforce/apex/TimeEntryController.approveEntry';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class TimeEntryReview extends LightningElement {
    @track entries;
    wiredEntriesResult;

    @wire(getEntriesForCurrentUser)
    wiredEntries(result) {
        this.wiredEntriesResult = result;
        if (result.data) {
            this.entries = result.data;
        } else if (result.error) {
            this.entries = undefined;
        }
    }

    async approve(e) {
        const id = e.target.dataset.id;
        try {
            await approveEntry({ entryId: id });
            this.dispatchEvent(new ShowToastEvent({ title: 'Approved', message: 'Entry approved', variant: 'success' }));
            await refreshApex(this.wiredEntriesResult);
        } catch (err) {
            this.dispatchEvent(new ShowToastEvent({ title: 'Error', message: err.body ? err.body.message : err.message, variant: 'error' }));
        }
    }
}
