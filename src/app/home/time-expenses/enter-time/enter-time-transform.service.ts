import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

import {LineToSubmit} from './models/LinesToSubmit';
import {TimeRecord} from '../../../models/domain/TimeRecord';
import {Hours} from '../../../models/domain/Hours';
import {Punch} from '../../../models/domain/Punch';
import {CommentType} from '../../../models/domain/CommentType';
import {Break} from '../../../models/domain/Break';
import {Comment} from '../../../models/domain/Comment';

@Injectable()
export class EnterTimeTransformService {


    constructor () {}

    public transformLinesToSubmitToTimeRecords (lines: Array<LineToSubmit>): Array<TimeRecord> {

        const timeRecords = [];
        // console.log('transformLinesToSubmitToTimeRecords lines', lines);
        _.forEach(lines, (line) => {

            // console.log('transformLinesToSubmitToTimeRecords line', line);
            timeRecords.push(this.lineToRecord(line));
        });

        // console.log('transformLinesToSubmitToTimeRecords timeRecords', timeRecords);
        return timeRecords;
    }

    // public transformTimeRecordsToLinesToSubmit (records: Array<TimeRecord>): Array<LineToSubmit> {
    //
    //
    // }

    private lineToRecord (line: LineToSubmit, isIndirect?: boolean): TimeRecord {

        const record: TimeRecord = new TimeRecord();

        if (isIndirect) {

            record.Id = line.Id;
            record.IndirectCostId = line.CostCode.Id;
            record.EmployeeId = line.Employee.Id;
            record.Hours = new Hours(line.HoursST, 0, 0, line.Date.toISOString());
            if (line.Note && line.Note !== '') {

                record.Comments = [];
                record.Comments.push(new Comment(line.Note, CommentType.BackOffice));
            }
        } else {

            record.Id = line.Id;
            record.PhaseId = line.Phase.Id;
            record.ProjectId = line.Project.Id;
            record.CostCodeId = line.CostCode.Id;
            record.EmployeeId = line.Employee.Id;
            record.Hours = new Hours(line.HoursST, line.HoursOT, line.HoursDT, line.Date.toISOString());
            if (line.IsPunch) {

                record.Punch = this.buildPunch(line.Date, line.TimeIn, line.TimeOut);
            }
            if (line.BreakIn) {

                record.Breaks = [];
                record.Breaks.push(this.buildBreak(line.Date, line.BreakIn, line.BreakOut));
                record.BreaksVerified = false;
            }
            if (line.Note && line.Note !== '') {

                record.Comments = [];
                record.Comments.push(new Comment(line.Note, CommentType.BackOffice));
            }
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

    // Helpers
    private buildPunch(date: moment.Moment, timeIn: string, timeOut: string): Punch {

        const punchIn = moment(date.format('YYYY-MM-DD') + ' ' + timeIn);
        const punchOut = moment(date.format('YYYY-MM-DD') + ' ' + timeOut);

        return new Punch(punchIn.toISOString(), punchOut.toISOString());
    }

    private buildBreak(date: moment.Moment, brIn: string, brOut: string): Break {

        const breakIn = moment(date.format('YYYY-MM-DD') + ' ' + brIn);
        const breakOut = moment(date.format('YYYY-MM-DD') + ' ' + brOut);

        return new Break(breakIn.toISOString(), breakOut.toISOString());
    }

}

