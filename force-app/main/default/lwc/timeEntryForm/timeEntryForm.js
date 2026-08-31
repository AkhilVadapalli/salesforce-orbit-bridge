import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import userId from '@salesforce/user/Id';

const OBJ_API_NAME = 'Time_Entry__c';

export default class TimeEntryForm extends LightningElement {
    @track date = new Date().toISOString().slice(0,10);
    @track startTime = '';
    @track endTime = '';
    @track breakMinutes = 0;

    handleDateChange(e) { this.date = e.target.value; }
    handleStartChange(e) { this.startTime = e.target.value; }
    handleEndChange(e) { this.endTime = e.target.value; }
    handleBreakChange(e) { this.breakMinutes = e.target.value || 0; }

    computeHours() {
        if (!this.date || !this.startTime || !this.endTime) return 0;
        // build ISO datetimes
        const start = new Date(`${this.date}T${this.startTime}`);
        const end = new Date(`${this.date}T${this.endTime}`);
        let diffMs = end - start;
        if (diffMs < 0) {
            // assume end is next day
            diffMs = (end.getTime() + 24*60*60*1000) - start.getTime();
        }
        const hours = diffMs / (1000 * 60 * 60) - (Number(this.breakMinutes) / 60);
        return Math.max(0, Math.round(hours * 100) / 100);
    }

    async saveEntry() {
        const hours = this.computeHours();
        const fields = {
            'Date__c': this.date,
            'Start_Time__c': this.startTime,
            'End_Time__c': this.endTime,
            'Break_Minutes__c': this.breakMinutes,
            'Hours__c': hours,
            'User__c': userId
        };
        const recordInput = { apiName: OBJ_API_NAME, fields };
        try {
            const result = await createRecord(recordInput);
            this.dispatchEvent(new ShowToastEvent({ title: 'Saved', message: 'Time entry saved', variant: 'success' }));
            // reset form
            this.date = new Date().toISOString().slice(0,10);
            this.startTime = '';
            this.endTime = '';
            this.breakMinutes = 0;
        } catch (err) {
            this.dispatchEvent(new ShowToastEvent({ title: 'Error', message: err.body ? err.body.message : err.message, variant: 'error' }));
        }
    }
}
