import {Injectable} from '@angular/core';
import {LineToSubmit} from './models/LinesToSubmit';
import {TimeRecord} from '../../../models/domain/TimeRecord';
import {Hours} from '../../../models/domain/Hours';

@Injectable()
export class EnterTimeTransformService {


    constructor () {}

    public transformLinesToSubmitToTimeRecords (lines: Array<LinesToSubmit>): Array<TimeRecord> {


    }

    // public transformTimeRecordsToLinesToSubmit (records: Array<TimeRecord>): Array<LineToSubmit> {
    //
    //
    // }

    private lineToRecord (line: LineToSubmit, isIndirect: boolean): TimeRecord {

        const record: TimeRecord = new TimeRecord();

        if (isIndirect) {

            record.Id = line.Id;
            record.IndirectCostId = line.CostCode.Id;
            record.EmployeeId = line.Employee.Id;
        } else {

            record.Id = line.Id;
            record.PhaseId = line.Phase.Id;
            record.ProjectId = line.Project.Id;
            record.CostCodeId = line.CostCode.Id;
            record.EmployeeId = line.Employee.Id;
            // record.Hours = line.
            //     Punch: Punch;
            // Comments?: Array<any>;
            // ManualHours?: boolean;
            // Breaks?: Array<any>;
            // BreaksVerified: boolean;
        }

        return record;
    }

    // private recordToLine (record: TimeRecord): LineToSubmit {
    //
    //     const line: LineToSubmit = {
    //         Date: record.,
    //         Employee: ,
    //         Project: ,
    //         CostCode: ,
    //         System: ,
    //         Phase: ,
    //         IsPunch: ,
    //         HoursST: ,
    //         HoursOT: ,
    //         HoursDT: ,
    //         TimeIn: ,
    //         TimeOut: ,
    //         BreakIn: ,
    //         BreakOut: ,
    //         Note:
    //     }
    // }

    private buildHoursFromLine (line: LineToSubmit): Hours {

        
    }
}

