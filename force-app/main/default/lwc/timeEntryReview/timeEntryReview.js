import { LightningElement, track, wire } from 'lwc';
import getAllEntries from '@salesforce/apex/TimeEntryController.getAllEntries';
import approveEntry from '@salesforce/apex/TimeEntryController.approveEntry';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

const APPROVED_PREFIX = '[APPROVED] ';

export default class TimeEntryReview extends LightningElement {
    @track entries;
    wiredEntriesResult;

    @wire(getAllEntries)
    wiredEntries(result) {
        this.wiredEntriesResult = result;
        if (result.data) {
            this.entries = result.data.map((entry) => ({
                ...entry,
                displayName: this.getDisplayName(entry.Name),
                isApproved: this.isApproved(entry.Name),
                calculatedHours: this.calculateHours(entry.Start_Time__c, entry.End_Time__c)
            }));
        } else if (result.error) {
            this.entries = undefined;
        }
    }

    calculateHours(startTime, endTime) {
        if (!startTime || !endTime) {
            return 0;
        }

        const start = new Date(`1970-01-01T${startTime}`);
        const end = new Date(`1970-01-01T${endTime}`);
        let diffMs = end - start;
        if (diffMs < 0) {
            diffMs += 24 * 60 * 60 * 1000;
        }

        return Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100;
    }

    isApproved(name) {
        return typeof name === 'string' && name.startsWith(APPROVED_PREFIX);
    }

    getDisplayName(name) {
        if (!name) {
            return '';
        }
        return this.isApproved(name) ? name.replace(APPROVED_PREFIX, '') : name;
    }

    async handleApprove(event) {
        const entryId = event.target.dataset.id;
        try {
            await approveEntry({ entryId });
            this.dispatchEvent(new ShowToastEvent({
                title: 'Approved',
                message: 'Time entry marked as approved',
                variant: 'success'
            }));
            await refreshApex(this.wiredEntriesResult);
        } catch (error) {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: error.body ? error.body.message : error.message,
                variant: 'error'
            }));
        }
    }
}
