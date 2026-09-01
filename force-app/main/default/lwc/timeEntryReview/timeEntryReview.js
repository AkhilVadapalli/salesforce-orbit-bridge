import { LightningElement, track, wire } from 'lwc';
import getAllEntries from '@salesforce/apex/TimeEntryController.getAllEntries';
import approveEntry from '@salesforce/apex/TimeEntryController.approveEntry';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import canApproveTimeEntries from '@salesforce/customPermission/Approve_Time_Entries';

const APPROVED_PREFIX = '[APPROVED] ';

export default class TimeEntryReview extends LightningElement {
    @track entries;
    @track isModalOpen = false;
    wiredEntriesResult;

    @wire(getAllEntries)
    wiredEntries(result) {
        this.wiredEntriesResult = result;
        if (result.data) {
            this.entries = result.data.map((entry) => this.mapEntry(entry));
        } else if (result.error) {
            this.entries = undefined;
        }
    }

    get hasEntries() {
        return Array.isArray(this.entries) && this.entries.length > 0;
    }

    get modalTitle() {
        return 'Approve Hours';
    }

    get hasApproveAccess() {
        return canApproveTimeEntries;
    }

    openModal() {
        if (!this.hasApproveAccess) {
            this.dispatchEvent(new ShowToastEvent({
                title: 'No Access',
                message: 'You do not have permission to approve entries.',
                variant: 'error'
            }));
            return;
        }
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    mapEntry(entry) {
        return {
            ...entry,
            displayName: this.getDisplayName(entry.Name),
            isApproved: this.isApproved(entry.Name),
            displayStartTime: this.formatTime(entry.Start_Time__c),
            displayEndTime: this.formatTime(entry.End_Time__c),
            calculatedHours: this.calculateHours(entry.Start_Time__c, entry.End_Time__c)
        };
    }

    calculateHours(startTime, endTime) {
        if (!startTime || !endTime) {
            return 0;
        }

        const startMs = this.normalizeTimeValue(startTime);
        const endMs = this.normalizeTimeValue(endTime);

        if (startMs === null || endMs === null) {
            return 0;
        }

        let diffMs = endMs - startMs;
        if (diffMs < 0) {
            diffMs += 24 * 60 * 60 * 1000;
        }

        return Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100;
    }

    normalizeTimeValue(timeValue) {
        if (typeof timeValue === 'number') {
            return timeValue;
        }

        if (typeof timeValue === 'string') {
            if (/^\d+$/.test(timeValue)) {
                return Number(timeValue);
            }

            const parts = timeValue.replace('Z', '').split(':').map((value) => Number(value));
            if (parts.length >= 2 && parts.every((value) => !Number.isNaN(value))) {
                const [hours, minutes, seconds = 0] = parts;
                return ((hours * 60 * 60) + (minutes * 60) + seconds) * 1000;
            }
        }

        return null;
    }

    formatTime(timeValue) {
        const totalMs = this.normalizeTimeValue(timeValue);
        if (totalMs === null) {
            return '';
        }

        const totalMinutes = Math.floor(totalMs / 60000);
        const hours = Math.floor(totalMinutes / 60) % 24;
        const minutes = totalMinutes % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
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
        if (!this.hasApproveAccess) {
            this.dispatchEvent(new ShowToastEvent({
                title: 'No Access',
                message: 'You do not have permission to approve entries.',
                variant: 'error'
            }));
            return;
        }

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
