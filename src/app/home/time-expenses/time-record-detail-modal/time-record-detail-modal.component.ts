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
    }
}



// CostCode
//     :
//     null
// Employee
//     :
// {$id: "9", Address: {…}, LaborClassId: "c5d1ff94-da50-4498-a0e8-ce30d630f6cd", AddToNewProjects: false, FirstName: "Test", …}
// Hours
//     :
// {$id: "11", DoubleTime: 0, Overtime: 0, RegularTime: 4, Date: "2017-09-22T07:00:00Z"}
// HoursOverridden
//     :
//     false
// Id
//     :
//     "c8b1531a-15a5-469f-887e-0a666fdc7c2b"
// IndirectCost
//     :
// {$id: "10", Id: "76a199de-2dce-47f9-8074-c905baa76774", Description: "Sick Time", Code: null}
// ManualHours
//     :
//     false
// Project
//     :
//     null
// Punch
//     :
//     null
// SecondLvlApprovedByUserId
//     :
//     null
// SecondLvlApprovedDate
//     :
//     null
// Signed
//     :
//     false
// SignedDate
//     :
//     null
// TimeRecordStatus
//     :
//     "Pending"
// Timestamps
//     :
// {$id: "12", ClientCreated: "2017-09-30T22:26:28.91Z", ClientUpdated: "2017-09-30T22:26:28.91Z", Created: "2017-09-30T22:26:28.91Z", CreatedBy: null, …}
// Units
//     :
//     null
