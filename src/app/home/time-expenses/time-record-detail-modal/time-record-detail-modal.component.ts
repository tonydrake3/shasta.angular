import { Component, Inject, OnInit } from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {TimeRecord} from '../../../models/domain/TimeRecord';

@Component({
  selector: 'esub-time-record-detail-modal',
  templateUrl: './time-record-detail-modal.component.html',
  styleUrls: ['./time-record-detail-modal.component.scss']
})
export class TimeRecordDetailModalComponent implements OnInit {

    timeRecord: TimeRecord;

    constructor (
        public dialogRef: MdDialogRef<TimeRecordDetailModalComponent>,
        @Inject(MD_DIALOG_DATA) public data
    ) {}

    ngOnInit () {
        console.log('Initializing modal. The data is');
        console.log(this.data);
        this.initializeTimeRecordFromInputData();
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
        this.timeRecord = new TimeRecord();
        this.timeRecord.CostCodeId = this.data['CostCodeId'];
        this.timeRecord.Breaks = this.data['Breaks'];
        this.timeRecord.Comments = this.data['Comments'];
        this.timeRecord.CostCode = this.data['CostCode'];
        this.timeRecord.IndirectCost = this.data['IndirectCost'];
        this.timeRecord.Project = this.data['Project'];
        this.timeRecord.CostCodeId = this.data['CostCodeId'];
        this.timeRecord.IndirectCostId = this.data['IndirectCostId'];
        this.timeRecord.ProjectId = this.data['ProjectId'];
        this.timeRecord.EmployeeId = this.data['EmployeeId'];
        this.timeRecord.Employee = this.data['Employee'];
        this.timeRecord.HoursOverriden = this.data['HoursOverriden'];
        this.timeRecord.Id = this.data['Id'];
        this.timeRecord.ManualHours = this.data['ManualHours'];
        this.timeRecord.Punch = this.data['Punch'];
        this.timeRecord.Signed = this.data['Signed'];
        this.timeRecord.TimeRecordStatus = this.data['TimeRecordStatus'];
        this.timeRecord.Timestamps = this.data['Timestamps'];
        console.log('initialized timerecord from data passed to modal');
        console.log(this.timeRecord);
    }
}
