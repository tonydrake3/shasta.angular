import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';

import { CostCode } from '../../../models/domain/CostCode';
import { Project } from '../../../models/domain/Project';
import { Employee } from '../../../models/domain/Employee';
import {IndirectToSubmit, LineToSubmit} from './models/LinesToSubmit';
import { TimeRecord } from '../../../models/domain/TimeRecord';
import {EntryCard, TimeEntry, TimeEntryMode} from './models/TimeEntry';
import { TimeEntryState } from './models/TimeEntry';

@Injectable()
export class EnterTimeManager {

    public _cards$ = new Subject<EntryCard>();
    // public _gridLines$ = new Subject();
    public _processing$ = new Subject<boolean>();

    // Private
    private _timeRecords: Array<TimeRecord>;
    private _indirectCodes: Array<CostCode>;
    private _projects: Array<Project>;
    private _employees: Array<Employee>;
    private _timeEntryState: TimeEntryState;
    private _linesToSubmit: Array<LineToSubmit>;
    private _indirectToSubmit: Array<IndirectToSubmit>;
    private _groupBy = 'Date';
    private _timeThreshold = 8;
    private _enterTimeFormData;
    private _groupedLines;
    private _settings;

    // Private Consts
    private _INDIRECT = 'Indirect Costs';

    constructor () {

        this._timeEntryState = new TimeEntryState();
        this._timeRecords = [];
        this._linesToSubmit = [];
        this._indirectToSubmit = [];
        this._projects = [];
        this._employees = [];
        this._indirectCodes = [];
    }

    get processing$ () {

        return this._processing$.asObservable();
    }

    get cards$ () {

        return this._cards$.asObservable();
    }

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/
    public setIndirectCodes (codes: Array<CostCode>) {

        this._indirectCodes = _.cloneDeep(codes);
        // console.log('EnterTimeManager loadIndirectCodes', this._indirectCodes);
    }

    public getIndirectCodes () {

        return this._indirectCodes;
    }

    public setProjects (projects: Array<Project>) {

        this._projects = projects;
        // console.log('EnterTimeManager loadProjects', this._projects);
    }

    public getProjects () {

        return this._projects;
    }

    public setEmployees (employees: Array<Employee>) {

        this._employees = employees;
        // console.log('EnterTimeManager setEmployees', this._employees);
    }

    public getSettings () {

        return this._settings;
    }

    public setSettings (settings) {

        this._settings = settings;
        // console.log('EnterTimeManager setEmployees', this._employees);
    }

    public getEmployees () {

        // console.log('EnterTimeManager getEmployees', this._employees);
        return this._employees;
    }

    public getSelectedDatesCount () {

        return this._timeEntryState.SelectedDates.length;
    }

    public setSelectedDates (dates: Array<moment.Moment>) {

        this._timeEntryState.SelectedDates = _.sortBy(_.cloneDeep(dates), (date) => {
            return date.startOf('day').format();
        });
    }

    public clearSelectedDates () {
        this._timeEntryState.SelectedDates = [];
    }

    public setTimeEntryMode (entryMode: TimeEntryMode) {

        this._timeEntryState.TimeEntryMode = _.cloneDeep(entryMode);
        // console.log('setTimeEntryMode', this._timeEntryState.TimeEntryMode);
    }

    public getGroupBy () {

        return this._groupBy;
    }

    public setGroupBy (groupBy: string) {

        this._groupBy = groupBy;
        // return this.groupLinesToSubmit(this._linesToSubmit, this._indirectToSubmit);
        this.groupLinesToSubmit(this._linesToSubmit, this._indirectToSubmit);
    }

    public getLineCount () {

        return this._linesToSubmit.length + this._indirectToSubmit.length +
            ((this._timeEntryState.SelectedDates ? this._timeEntryState.SelectedDates.length : 0) *
            (this._enterTimeFormData ? this._enterTimeFormData.employees.length : 0));
    }

    public filterEmployees (projectId: string): Array<Employee> {

        return _.filter(this._employees, function (employee) {
            return employee.ProjectIds.includes(projectId);
        });
    }

    public setLineData (formData, times: TimeEntry) {

        this._processing$.next(true);
        this._enterTimeFormData = _.cloneDeep(formData.value);
        this._timeEntryState.Times = _.cloneDeep(times);

        // console.log('EnterTimeManager setLineData', this._enterTimeFormData, this._timeEntryState);
        // TODO: Clear Private Property values?
        this.resetManager();
    }

    public getGroupedLines () {

        // console.log('EnterTimeManager getGroupedLines');
        // return this.generateNewLines(this._enterTimeFormData);
        this.generateNewLines(this._enterTimeFormData);
    }

    public insertProjectLine (record: LineToSubmit) {

        let keyToAdd: number;

        this._linesToSubmit.forEach((line, idx) => {
            if (line === record) {
                keyToAdd = idx;
            }
        });

        if (keyToAdd != null) {
            this._linesToSubmit.splice(keyToAdd + 1, 0, record);
        }
    }

    public deleteProjectLine (record: LineToSubmit) {

        let keyToDelete: number;

        this._linesToSubmit.forEach((line, idx) => {
            if (line === record) {
                keyToDelete = idx;
            }
        });

        if (keyToDelete != null) {
            this._linesToSubmit.splice(keyToDelete--, 1);
        }
    }

    public deleteCardGroup (card: EntryCard) {

        card.ProjectLines.forEach(record => {
            this.deleteProjectLine(record);
        });
    }

    public clearLines () {

        this._groupedLines = {};
        this._linesToSubmit = [];
        this._indirectToSubmit = [];
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/
    // take the lines the user wants to add, and make them into TimeRecords that are ready to submit
    private generateNewLines (lines) {

        // console.log('EnterTimeManager generateNewLines', lines);
        if (!_.isEmpty(lines.project)) {

            this.processProjectLines(lines);
        } else {

            this.processIndirectLines(lines);
        }

        // return this.groupLinesToSubmit(this._linesToSubmit, this._indirectToSubmit);
        this.groupLinesToSubmit(this._linesToSubmit, this._indirectToSubmit);
    }

    private processProjectLines (lines) {

        // console.log('EnterTimeManager processProjectLines TimeEntryMode', this._timeEntryState.TimeEntryMode);
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
    }

    private processIndirectLines (lines) {

        // console.log('EnterTimeManager processIndirectLines', lines);
        _.forEach(this._timeEntryState.SelectedDates, (date) => {

            _.forEach(lines.employees, (employee) => {

                let model: IndirectToSubmit;

                model = this.buildIndirectHoursToSubmit(date, employee, lines);

                this._indirectToSubmit.push(model);
            });
        });
    }

    private buildHoursToSubmit (date, employee, lines): LineToSubmit {

        return {
            Date: _.cloneDeep(date),
            Employee: _.cloneDeep(employee),
            Project: _.cloneDeep(lines.project),
            CostCode: _.cloneDeep(lines.costCode),
            System: _.cloneDeep(lines.system),
            Phase: _.cloneDeep(lines.phase),
            IsPunch: false,
            HoursST: Number(lines.standardHours),
            HoursOT: Number(lines.overtimeHours),
            HoursDT: Number(lines.doubleTimeHours),
            TimeIn: moment().startOf('day').format('h:mm A'),
            TimeOut: moment().startOf('day').format('h:mm A'),
            BreakIn: moment().startOf('day').format('h:mm A'),
            BreakOut: moment().startOf('day').format('h:mm A'),
            Note: lines.notes,
        };
    }

    private buildIndirectHoursToSubmit (date, employee, lines): IndirectToSubmit {

        return {
            Date: _.cloneDeep(date),
            Employee: _.cloneDeep(employee),
            EmployeeId: '',
            IndirectCostId: '',
            CostCode: _.cloneDeep(lines.costCode),
            HoursST: Number(lines.standardHours),
            HoursOT: Number(lines.overtimeHours),
            HoursDT: Number(lines.doubleTimeHours),
            Note: lines.notes
        };
    }

    private buildTimeToSubmit (date, employee, lines): LineToSubmit {

        //
        // const punchIn = lines.timeIn ? moment(lines.timeIn, ['h:mm A']) : null;
        // const punchOut = lines.timeOut ? moment(lines.timeOut, ['h:mm A']) : null;

        const timeSubmission: LineToSubmit = {
            Date: _.cloneDeep(date),
            Employee: _.cloneDeep(employee),
            Project: _.cloneDeep(lines.project),
            CostCode: _.cloneDeep(lines.costCode),
            System: _.cloneDeep(lines.system),
            Phase: _.cloneDeep(lines.phase),
            IsPunch: true,
            HoursST: 0,
            HoursOT: 0,
            HoursDT: 0,
            TimeIn: null,
            TimeOut: null,
            BreakIn: null,
            BreakOut: null,
            Note: lines.notes
        };

        let timeDuration, breakIn, breakOut, breakDuration;

        if (lines.timeEntry.time.in && lines.timeEntry.time.out) {

            const punchIn = moment(lines.timeEntry.time.in, ['hh:mm']);
            const punchOut = moment(lines.timeEntry.time.out, ['hh:mm']);

            timeSubmission.TimeIn = punchIn.format('HH:mm');
            timeSubmission.TimeOut = punchOut.format('HH:mm');

            if (punchIn && punchOut) {

                timeDuration = moment.duration(punchOut.diff(punchIn));
            }
        }

        if (lines.timeEntry.break.in && lines.timeEntry.break.out) {

            breakIn = moment(lines.timeEntry.break.in, ['hh:mm']);
            breakOut = moment(lines.timeEntry.break.out, ['hh:mm']);

            timeSubmission.BreakIn = breakIn.format('HH:mm');
            timeSubmission.BreakOut = breakOut.format('HH:mm');

            if (breakIn && breakOut) {

                breakDuration = moment.duration(breakOut.diff(breakIn));
                timeDuration = timeDuration.subtract(breakDuration);
            }
        }

        if (timeDuration && (timeDuration.hours() > this._timeThreshold)) {

            timeSubmission.HoursST = this._timeThreshold;
            timeSubmission.HoursOT = (timeDuration.hours() + (timeDuration.minutes() / 60)) - this._timeThreshold;
            timeSubmission.HoursDT = 0;
        } else if (timeDuration) {

            timeSubmission.HoursST = (timeDuration.hours() + (timeDuration.minutes() / 60));
            timeSubmission.HoursOT = 0;
            timeSubmission.HoursDT = 0;
        }
        console.log(timeSubmission);

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
    private groupLinesToSubmit (projectLines: Array<LineToSubmit>, indirectLines: Array<IndirectToSubmit>) {

        if (this._groupBy === 'Date') {

            this.groupLinesByDate(projectLines, indirectLines);
        } else if (this._groupBy === 'Employee') {

            this.groupLinesByEmployee(projectLines, indirectLines);
        } else if (this._groupBy === 'Project') {

            this.groupLinesByProject(projectLines, indirectLines);
        }
    }

    // private publishLines () {
    //
    //     groupedLines.forEach((groupedLine, index) => {
    //
    //         // console.log('EnterTimeManager groupLinesToSubmit', groupedLine);
    //         setTimeout(() => {
    //
    //             // console.log('EnterTimeManager groupLinesToSubmit', index);
    //             this._gridLines$.next(groupedLine);
    //         }, index * 20);
    //     });
    // }

    private groupLinesByDate (projectLines: Array<LineToSubmit>, indirectLines: Array<IndirectToSubmit>) {

        // console.log('groupLinesByDate');
        const projectDates = this.getUniqueDates(projectLines);
        const indirectDates = this.getUniqueDates(indirectLines);

        const dateArray = _.sortBy(_.uniqBy(projectDates.concat(indirectDates), (date) => {

            return date.startOf('day').format();
        }), (uniqueDate) => {

            return uniqueDate.startOf('day').format();
        });

        _.forEach(dateArray, (date) => {

            const dateIndex = date.format();

            const line: EntryCard = new EntryCard();
            line.Key = dateIndex;

            this._cards$.next(line);

            // console.log('EnterTimeManager groupedLines', this._groupedLines);
            projectLines.forEach((projectLine, index) => {
                if (projectLine.Date.startOf('day').isSame(date, 'day')) {
                    this._processing$.next(true);
                    setTimeout(() => {
                        // console.log('groupLinesByDate projectLines', projectLine);
                        line.ST += projectLine.HoursST;
                        line.OT += projectLine.HoursOT;
                        line.DT += projectLine.HoursDT;
                        line.ProjectLines.push(projectLine);
                        if (index === projectLines.length - 1) {
                            this._processing$.next(false);
                        }
                    }, 20 * index);
                }
            });
            indirectLines.forEach((indirectLine, index) => {
                if (indirectLine.Date.startOf('day').isSame(date, 'day')) {
                    this._processing$.next(true);
                    setTimeout(() => {
                        // console.log('groupLinesByDate indirectLines', index);
                        line.ST += indirectLine.HoursST;
                        line.IndirectLines.push(indirectLine);
                        if (index === indirectLines.length - 1) {
                            this._processing$.next(false);
                        }
                    }, 20 * index);
                }
            });

        });
    }

    private groupLinesByEmployee (projectLines: Array<LineToSubmit>, indirectLines: Array<IndirectToSubmit>) {

        // console.log('groupLinesByEmployee');
        const projectEmployees = this.getUniqueEmployees(projectLines);
        const indirectEmployees = this.getUniqueEmployees(indirectLines);

        const employeeArray = _.uniqBy(projectEmployees.concat(indirectEmployees), (line) => {
            return line.Id;
        });

        _.forEach(employeeArray, (employee) => {

            const line: EntryCard = new EntryCard();
            line.Key = employee.Name;

            this._cards$.next(line);

            // console.log('EnterTimeManager groupedLines', this._groupedLines);
            projectLines.forEach((projectLine, index) => {
                if (_.isEqual(projectLine.Employee.Id, employee.Id)) {
                    this._processing$.next(true);
                    setTimeout(() => {
                        line.ST += projectLine.HoursST;
                        line.OT += projectLine.HoursOT;
                        line.DT += projectLine.HoursDT;
                        line.ProjectLines.push(projectLine);
                        if (index === projectLines.length - 1) {
                            this._processing$.next(false);
                        }
                    }, 20 * index);
                }
            });
            indirectLines.forEach((indirectLine, index) => {
                if (_.isEqual(indirectLine.Employee.Id, employee.Id)) {
                    this._processing$.next(true);
                    setTimeout(() => {
                        line.ST += indirectLine.HoursST;
                        line.IndirectLines.push(indirectLine);
                        if (index === indirectLines.length - 1) {
                            this._processing$.next(false);
                        }
                    }, 20 * index);
                }
            });
        });
    }

    private groupLinesByProject (projectLines: Array<LineToSubmit>, indirectLines: Array<IndirectToSubmit>) {

        // console.log('groupLinesByProject');
        const projects = this.getUniqueProjects(projectLines);

        _.forEach(projects, (project) => {

            const line: EntryCard = new EntryCard();
            line.Key = project.Name;

            this._cards$.next(line);

            // console.log('EnterTimeManager groupedLines', this._groupedLines);
            projectLines.forEach((projectLine, index) => {
                if (_.isEqual(projectLine.Project.Id, project.Id)) {
                    this._processing$.next(true);
                    setTimeout(() => {
                        line.ST += projectLine.HoursST;
                        line.OT += projectLine.HoursOT;
                        line.DT += projectLine.HoursDT;
                        line.ProjectLines.push(projectLine);
                        if (index === projectLines.length - 1) {
                            this._processing$.next(false);
                        }
                    }, 20 * index);
                }
            });
        });

        if (indirectLines.length > 0) {

            const line: EntryCard = new EntryCard();
            line.Key = this._INDIRECT;

            this._cards$.next(line);

            indirectLines.forEach((indirectLine, index) => {
                this._processing$.next(true);
                setTimeout(() => {
                    line.ST += indirectLine.HoursST;
                    line.IndirectLines.push(indirectLine);
                    if (index === indirectLines.length - 1) {
                        this._processing$.next(false);
                    }
                }, 20 * index);
            });
        }
    }

    private getUniqueDates (array: any[]) {

        return _.map(
            _.uniqBy(array,
                (line) => {
                    return line.Date.startOf('day');
                }),
            (uniqueLines) => {
                return uniqueLines.Date;
            });
    }

    private getUniqueEmployees (array: any[]) {

        return _.map(
            _.uniqBy(array,
                (line) => {
                    return line.Employee.Id;
                }),
            (uniqueLines) => {
                return {
                    Id: uniqueLines.Employee.Id,
                    Name: uniqueLines.Employee.Name
                };
            });
    }

    private getUniqueProjects (array: any[]) {

        return _.map(
            _.uniqBy(array,
                (line) => {
                    return line.Project.Name;
                }),
            (uniqueLines) => {
                return {
                    Id: uniqueLines.Project.Id,
                    Name: uniqueLines.Project.Name
                };
            });
    }

    private resetManager () {

    }
}
