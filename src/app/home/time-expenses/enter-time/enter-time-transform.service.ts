import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as uuidv4 from 'uuid/v4';

import {LineToSubmit} from './models/LinesToSubmit';
import {TimeRecord} from '../../../models/domain/TimeRecord';
import {Hours} from '../../../models/domain/Hours';
import {Punch} from '../../../models/domain/Punch';
import {CommentType} from '../../../models/domain/CommentType';
import {Break} from '../../../models/domain/Break';
import {Comment} from '../../../models/domain/Comment';
import {FormGroup} from '@angular/forms';
import {Project} from '../../../models/domain/Project';
import {Employee} from '../../../models/domain/Employee';
import {CostCode} from '../../../models/domain/CostCode';
import {DateHelperService} from '../../shared/services/date-helper.service';

@Injectable()
export class EnterTimeTransformService {


    constructor (private _dateHelper: DateHelperService) {}

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/
    public transformFormGroupRowsToLinesToSubmit (formGroups: Array<FormGroup>): Array<LineToSubmit> {

        const lines = [];

        _.forEach(formGroups, (formGroup) => {

            lines.push(this.transformFormGroupToLineToSubmit(formGroup));
        });

        return lines;
    }

    public transformFormGroupToLineToSubmit (form: FormGroup): LineToSubmit {

        const timeEntry: FormGroup = form.controls['timeEntry'] as FormGroup;

        const timeGroup = timeEntry.controls['time'] as FormGroup;
        const breakGroup = timeEntry.controls['break'] as FormGroup;

        // console.log('formGroupToLine', timeGroup.controls['in'].value, breakGroup.controls['in'].value);

        const line: LineToSubmit = {
            Id: form.get('id').value,
            Date: form.get('date').value,
            Employee: form.get('employee').value,
            Project: form.get('project').value,
            CostCode: form.get('costCode').value,
            System: form.get('system').value,
            Phase: form.get('phase').value,
            IsPunch: form.get('isPunch').value,
            HoursST: Number(form.get('standardHours').value),
            HoursOT: Number(form.get('overtimeHours').value),
            HoursDT: Number(form.get('doubleTimeHours').value)
        };

        if (form.get('isPunch').value) {

            line.TimeIn = timeGroup.controls['in'].value;
            line.TimeOut = timeGroup.controls['out'].value;
            line.BreakIn = breakGroup.controls['in'].value;
            line.BreakOut = breakGroup.controls['out'].value;
        }

        if (form.get('notes').value) {

            line.Note = form.get('notes').value;
        }

        // console.log('transformFormGroupToLineToSubmit', line);

        return line;
    }

    public transformIndirectFormGroupToLineToSubmit (form: FormGroup): LineToSubmit {

        const line: LineToSubmit = {
            Id: form.get('id').value,
            Date: form.get('date').value,
            Employee: form.get('employee').value,
            CostCode: form.get('costCode').value,
            IndirectCostId: form.get('costCode').value.Id,
            HoursST: Number(form.get('standardHours').value),
            HoursOT: 0,
            HoursDT: 0
        };

        if (form.get('notes').value) {

            line.Note = form.get('notes').value;
        }

        // console.log('transformFormGroupToLineToSubmit', line);

        return line;
    }

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

    public transformIndirectLinesToSubmitToTimeRecords (lines: Array<LineToSubmit>): Array<TimeRecord> {

        const timeRecords = [];
        // console.log('transformLinesToSubmitToTimeRecords lines', lines);
        _.forEach(lines, (line) => {

            // console.log('transformLinesToSubmitToTimeRecords line', line);
            timeRecords.push(this.lineToRecord(line, true));
        });

        // console.log('transformLinesToSubmitToTimeRecords timeRecords', timeRecords);
        return timeRecords;
    }

    public transformTimeRecordToLineToSubmit (record: TimeRecord, project: Project): LineToSubmit {

        return this.recordToLine(record, project);
    }

    public transformTimeRecordToIndirectToSubmit (record: TimeRecord): LineToSubmit {

        return this.recordToIndirectLine(record);
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/
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

                record.Punch = this._dateHelper.buildPunch(line.Date, line.TimeIn, line.TimeOut);
            }
            if (line.BreakIn) {

                record.Breaks = [];
                record.Breaks.push(this._dateHelper.buildBreak(line.Date, line.BreakIn, line.BreakOut));
                record.BreaksVerified = false;
            }
            if (line.Note && line.Note !== '') {

                record.Comments = [];
                record.Comments.push(new Comment(line.Note, CommentType.BackOffice));
            }
        }

        return record;
    }

    private recordToLine (record: TimeRecord, project: Project): LineToSubmit {

        // Get System
        const matchingSystem = _.filter(project.Systems,
            (system) => {
                return system.Id === record.Project.System.Id;
            }
        );

        // Get Phase
        const matchingPhase = _.filter(matchingSystem[0].Phases,
            (phase) => {
                return phase.Id === record.Project.System.Phase.Id;
            }
        );

        // Get Cost Code
        const matchingCode = _.filter(project.CostCodes,
            (costCode) => {
                return costCode.Id === record.CostCode.Id;
            }
        );

        const line: LineToSubmit = {
            Id: record.Id,
            Date: moment(record.Hours.Date),
            Employee: record.Employee,
            Project: project,
            CostCode: matchingCode[0],
            System: matchingSystem[0],
            Phase: matchingPhase[0],
            IsPunch: record.Punch ? true : false,
            HoursST: record.Hours.RegularTime,
            HoursOT: record.Hours.Overtime,
            HoursDT: record.Hours.DoubleTime,
            TimeIn: undefined,
            TimeOut: undefined,
            BreakIn: undefined,
            BreakOut: undefined,
            Note: ''
        };

        line.Employee.Name = record.Employee.FirstName + ' ' + record.Employee.LastName;

        if (record.Punch) {

            line.TimeIn = moment(record.Punch.PunchIn).format('HH:mm');
            line.TimeOut = moment(record.Punch.PunchOut).format('HH:mm');
        }

        if (record.Breaks && record.Breaks.length > 0) {

            line.BreakIn = moment(record.Breaks[0].TimeIn).format('HH:mm');
            line.BreakOut = moment(record.Breaks[0].TimeOut).format('HH:mm');
        }

        return line;
    }

    private recordToIndirectLine (record: TimeRecord): LineToSubmit {

        const costCode = new CostCode();
        costCode.Id = record.IndirectCost.Id;
        costCode.Code = record.IndirectCost.Code;
        costCode.Name = record.IndirectCost.Description;

        const line: LineToSubmit = {
            Id: record.Id,
            Date: moment(record.Hours.Date),
            Employee: record.Employee,
            CostCode: costCode,
            IsPunch: false,
            HoursST: record.Hours.RegularTime,
            HoursOT: record.Hours.Overtime,
            HoursDT: record.Hours.DoubleTime,
            Note: ''
        };

        line.Employee.Name = record.Employee.FirstName + ' ' + record.Employee.LastName;

        return line;
    }

}

