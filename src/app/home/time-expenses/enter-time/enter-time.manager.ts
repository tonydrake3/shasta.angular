import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';

import { CostCode } from '../../../models/domain/CostCode';
import { Project } from '../../../models/domain/Project';
import { Employee } from '../../../models/domain/Employee';
import { LineToSubmit } from './models/LinesToSubmit';
import { TimeRecord } from '../../../models/domain/TimeRecord';
import {TimeEntry, TimeEntryMode} from './models/TimeEntry';
import { TimeEntryState } from './models/TimeEntry';

@Injectable()
export class EnterTimeManager {

    // Private
    private _timeRecords: Array<TimeRecord>;
    private _indirectCodes: Array<CostCode>;
    private _projects: Array<Project>;
    private _employees: Array<Employee>;
    private _timeEntryState: TimeEntryState;
    private _linesToSubmit: Array<LineToSubmit>;
    private _groupBy = 'Date';
    private _timeThreshold = 8;

    constructor () {

        this._timeEntryState = new TimeEntryState();
        this._timeRecords = [];
        this._linesToSubmit = [];
    }

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/
    public loadIndirectCodes (codes: Array<CostCode>) {

        this._indirectCodes = _.cloneDeep(codes);
        // console.log('EnterTimeManager loadIndirectCodes', this._indirectCodes);
    }

    public loadProjects (projects: Array<Project>) {

        this._projects = _.cloneDeep(projects);
        // console.log('EnterTimeManager loadProjects', this._projects);
    }

    public loadEmployees (employees: Array<Employee>) {

        this._employees = _.cloneDeep(employees);
        // console.log('EnterTimeManager loadEmployees', this._employees);
    }

    public getSelectedDatesCount () {

        return this._timeEntryState.SelectedDates.length;
    }

    public setSelectedDates (dates: Array<moment.Moment>) {

        this._timeEntryState.SelectedDates = _.cloneDeep(dates);
    }

    public setTimeEntryMode (entryMode: TimeEntryMode) {

        this._timeEntryState.TimeEntryMode = _.cloneDeep(entryMode);
    }

    public filterEmployees (projectId: string): Array<Employee> {

        return _.filter(this._employees, function (employee) {
            return employee.ProjectIds.includes(projectId);
        });
    }

    public processLines (formData, times: TimeEntry) {

        this._timeEntryState.Times = _.cloneDeep(times);
        // console.log(this._timeEntryState);
        // console.log(formData.value);
        this.generateNewLines(_.cloneDeep(formData.value));
        console.log(this._linesToSubmit);

        // Convert records to Lines to Submit

        // Build collection of dropdown contents?

        // Group timecards

        // Clear Private Property values

    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/
    private buildLinesToSubmit () {

    }

    // take the lines the user wants to add, and make them into TimeRecords that are ready to submit
    private generateNewLines (lines) {

        _.forEach(this._timeEntryState.SelectedDates, (date) => {

            _.forEach(lines.employees, (employee) => {

                let model: LineToSubmit;

                if (this._timeEntryState.TimeEntryMode === TimeEntryMode.Hours) {

                    model = this.buildHoursToSubmit(date, employee, lines);
                } else {

                    model = this.buildTimeToSubmit(date, employee, lines);
                }

                this._linesToSubmit.push(model);
            });
        });

        // this.groupLinesToSubmit(this.linesToSubmit, this.groupCardsBy);
    }

    private buildHoursToSubmit (date, employee, lines): LineToSubmit {

        console.log(lines);
        return {
            Date: date,
            Employee: employee,
            Project: lines.project,
            CostCode: lines.costCode,
            System: lines.system,
            Phase: lines.phase,
            IsPunch: false,
            HoursST: lines.standardHours,
            HoursOT: lines.overtimeHours,
            HoursDT: lines.doubleTime,
            TimeIn: moment().startOf('day').format('h:mm A'),
            TimeOut: moment().startOf('day').format('h:mm A'),
            BreakIn: moment().startOf('day').format('h:mm A'),
            BreakOut: moment().startOf('day').format('h:mm A'),
            Note: lines.note,
        };
    }

    private buildTimeToSubmit (date, employee, lines): LineToSubmit {

        const timeSubmission: LineToSubmit = {
            Date: date,
            Employee: employee,
            Project: lines.project,
            CostCode: lines.costCode,
            System: lines.system,
            Phase: lines.phase,
            IsPunch: true,
            HoursST: 0,
            HoursOT: 0,
            HoursDT: 0,
            TimeIn: this._timeEntryState.Times.In ? this._timeEntryState.Times.In.format('h:mm A') : moment().format('h:mm A'),
            TimeOut: this._timeEntryState.Times.Out ? this._timeEntryState.Times.Out.format('h:mm A') : moment().format('h:mm A'),
            BreakIn: this._timeEntryState.Times.BreakIn,
            BreakOut: this._timeEntryState.Times.BreakOut,
            Note: lines.note
        };

        const punchIn = this._timeEntryState.Times.In ? this._timeEntryState.Times.In : moment();
        const punchOut = this._timeEntryState.Times.Out ? this._timeEntryState.Times.Out : moment();

        let timeDuration = moment.duration(punchOut.diff(punchIn));
        // console.log(timeDuration.hours());

        let breakIn, breakOut, breakDuration;

        if (this._timeEntryState.Times && this._timeEntryState.Times.BreakIn && this._timeEntryState.Times.BreakOut) {

            breakIn = this._timeEntryState.Times.BreakIn ? this._timeEntryState.Times.BreakIn : null;
            breakOut = this._timeEntryState.Times.BreakOut ? this._timeEntryState.Times.BreakOut : null;

            if (breakIn && breakOut) {
                breakDuration = moment.duration(breakOut.diff(breakIn));
                timeDuration = timeDuration.subtract(breakDuration);
            }
        }

        if (timeDuration.hours() > this._timeThreshold) {

            timeSubmission.HoursST = this._timeThreshold;
            timeSubmission.HoursOT = (timeDuration.hours() + (timeDuration.minutes() / 60)) - this._timeThreshold;
            timeSubmission.HoursDT = 0;
        } else {

            timeSubmission.HoursST = (timeDuration.hours() + (timeDuration.minutes() / 60));
            timeSubmission.HoursOT = 0;
            timeSubmission.HoursDT = 0;
        }

        return timeSubmission;
    }

    // private calculateTotalTimeFromPunch (timeIn, timeOut) {
    //
    //     const punchIn = timeIn ? timeIn : moment();
    //     const punchOut = timeOut ? timeOut : moment();
    //
    //     const duration = moment.duration(punchOut.diff(punchIn));
    //
    //     return (duration.hours() + (duration.minutes() / 60));
    // }

    // // take the TimeRecords that are ready to submit, and group them and turn them into display friendly cards
    // private groupLinesToSubmit(lines: Array<LineToSubmit>, groupBy: string) {
    //
    //     if (groupBy === 'Date') {
    //
    //         this.groupedLines = _.groupBy(lines, groupBy);
    //     } else if (groupBy === 'Employee') {
    //
    //         this.groupedLines = _.groupBy(lines, value => {
    //             return value[groupBy]['FullName'];
    //         });
    //     } else if (groupBy === 'Project') {
    //
    //         this.groupedLines = _.groupBy(lines, value => {
    //             return value[groupBy]['Name'];
    //         });
    //     }
    //
    //     console.log(this.groupedLines);
    // }
}
