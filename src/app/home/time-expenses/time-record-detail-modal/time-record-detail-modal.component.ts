import { Component, Inject, OnInit } from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {TimeRecord} from '../../../models/domain/TimeRecord';
import {IndirectCostTimeModalDisplayData, TimeModalDisplayData} from './ModalModels';

@Component({
  selector: 'esub-time-record-detail-modal',
  templateUrl: './time-record-detail-modal.component.html',
  styleUrls: ['./time-record-detail-modal.component.scss']
})
export class TimeRecordDetailModalComponent implements OnInit {

    timeRecord: TimeRecord;
    timeRecordData: TimeModalDisplayData;

    constructor (
        public dialogRef: MdDialogRef<TimeRecordDetailModalComponent>,
        @Inject(MD_DIALOG_DATA) public data
    ) {}

    ngOnInit () {
        console.log('Initializing modal. The data is');
        console.log(this.data);
        this.initializeTimeRecordFromInputData();
        this.initializeTimeRecordInputData();
    }

    public close () {
        console.log('Close modal without saving');
        this.dialogRef.close();
    }

    public save () {
        console.log('Save this record');
        this.dialogRef.close();
    }

    private initializeTimeRecordFromInputData() {
        this.timeRecord = TimeRecord.fromAPIData(this.data);
        console.log('initialized timerecord from data passed to modal');
        console.log(this.timeRecord);
    }

    private initializeTimeRecordInputData() {
        if (this.timeRecord.IndirectCost) { // Initialize with Indirect Cost Data
            console.log('Initializing Modal Data from Indirect Cost Record');
            this.timeRecordData = new IndirectCostTimeModalDisplayData(this.timeRecord);
            console.log(this.timeRecordData);
        }
    }
}
