import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';

import { CostCode } from '../../../models/domain/CostCode';
import { Project } from '../../../models/domain/Project';
import { Employee } from '../../../models/domain/Employee';
import {IndirectToSubmit, LineToSubmit} from './models/LinesToSubmit';
import { TimeRecord } from '../../../models/domain/TimeRecord';
import {EntryCard, EntryGridLine, TimeEntry, TimeEntryMode} from './models/TimeEntry';
import { TimeEntryState } from './models/TimeEntry';

@Injectable()
export class EnterTimeManager {

    public _cards$ = new Subject<EntryCard>();
    public _gridLines$ = new Subject();
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

    // Private Consts
    private _INDIRECT = 'Indirect Costs';

    constructor () {

        this._timeEntryState = new TimeEntryState();
        this._timeRecords = [];
        this._linesToSubmit = [];
        this._indirectToSubmit = [];
    }

    get gridLines$ () {

        return this._gridLines$.asObservable();
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
        // console.log('EnterTimeManager loadEmployees', this._employees);
    }

    public getEmployees () {

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

    public setTimeEntryMode (entryMode: TimeEntryMode) {

        this._timeEntryState.TimeEntryMode = _.cloneDeep(entryMode);
    }

    public getGroupBy () {

        return this._groupBy;
    }

    public setGroupBy (groupBy: string) {

        this._groupBy = groupBy;
        // return this.groupLinesToSubmit(this._linesToSubmit, this._indirectToSubmit);
        this.groupLinesToSubmit(this._linesToSubmit, this._indirectToSubmit);
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

        console.log('EnterTimeManager setLineData', this._enterTimeFormData);
        // TODO: Clear Private Property values?
        this.resetManager();
    }

    public getGroupedLines () {

        console.log('EnterTimeManager getGroupedLines');
        // return this.generateNewLines(this._enterTimeFormData);
        this.generateNewLines(this._enterTimeFormData);

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

        // console.log('EnterTimeManager processProjectLines', lines);
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
            Note: lines.notes,
        };
    }

    private buildIndirectHoursToSubmit (date, employee, lines): IndirectToSubmit {

        return {
            Date: date,
            Employee: employee,
            CostCode: lines.costCode,
            HoursST: lines.standardHours,
            HoursOT: lines.overtimeHours,
            HoursDT: lines.doubleTime,
            Note: lines.notes,
        };
    }

    private buildTimeToSubmit (date, employee, lines): LineToSubmit {

        const punchIn = this._timeEntryState.Times.In ? this._timeEntryState.Times.In : moment();
        const punchOut = this._timeEntryState.Times.Out ? this._timeEntryState.Times.Out : moment();

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
            TimeIn: punchIn.format('h:mm A'),
            TimeOut: punchOut.format('h:mm A'),
            BreakIn: null,
            BreakOut: null,
            Note: lines.notes
        };


        let timeDuration = moment.duration(punchOut.diff(punchIn));
        // console.log(timeDuration.hours());

        let breakIn, breakOut, breakDuration;

        if (this._timeEntryState.Times && this._timeEntryState.Times.BreakIn && this._timeEntryState.Times.BreakOut) {

            breakIn = this._timeEntryState.Times.BreakIn ? this._timeEntryState.Times.BreakIn : null;
            breakOut = this._timeEntryState.Times.BreakOut ? this._timeEntryState.Times.BreakOut : null;

            timeSubmission.BreakIn = breakIn.format('h:mm A');
            timeSubmission.BreakOut = breakOut.format('h:mm A');

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

        console.log('groupLinesByDate');
        const lines = [];

        const projectDates = this.getUniqueDates(projectLines);
        const indirectDates = this.getUniqueDates(indirectLines);

        const dateArray = _.uniqBy(projectDates.concat(indirectDates), (date) => {

            return date.startOf('day').format();
        });

        _.forEach(dateArray, (date) => {

            const dateIndex = date.format();

            const line: EntryCard = new EntryCard();
            line.Key = dateIndex;

            this._cards$.next(line);

            // console.log('EnterTimeManager groupedLines', this._groupedLines);
            projectLines.forEach((projectLine, index) => {
                this._processing$.next(true);
                if (projectLine.Date.startOf('day').isSame(date, 'day')) {
                    setTimeout(() => {
                        line.ProjectLines.push(projectLine);
                        if (index === projectLines.length - 1) {
                            this._processing$.next(false);
                        }
                        // const gridLine = new EntryGridLine();
                        // gridLine.Key = dateIndex;
                        // gridLine.ProjectLine = projectLine;
                        // this._gridLines$.next(gridLine);
                    }, 20 * index);
                }
            });
            // _.forEach(indirectLines, (indirectLine) => {
            //     if (indirectLine.Date.startOf('day').isSame(date, 'day')) {
            //         line.indirectLines.push(indirectLine);
            //     }
            // });

            // lines.push(line);
        });
        return lines;
    }

    private groupLinesByEmployee (projectLines: Array<LineToSubmit>, indirectLines: Array<IndirectToSubmit>) {

        console.log('groupLinesByEmployee');
        const lines = [];

        const projectEmployees = this.getUniqueEmployees(projectLines);
        const indirectEmployees = this.getUniqueEmployees(indirectLines);

        const employeeArray = _.uniq(projectEmployees.concat(indirectEmployees));

        _.forEach(employeeArray, (employee) => {

            const line: EntryCard = new EntryCard();
            line.Key = employee.FullName;

            this._cards$.next(line);

            // console.log('EnterTimeManager groupedLines', this._groupedLines);
            projectLines.forEach((projectLine, index) => {
                if (_.isEqual(projectLine.Employee.Id, employee.Id)) {
                    setTimeout(() => {
                        // line.projectLines.push(projectLine);
                        this._gridLines$.next(line);
                    }, 20 * index);
                }
            });
            // _.forEach(indirectLines, (indirectLine) => {
            //     if (_.isEqual(indirectLine.Employee.Id, employee.Id)) {
            //         line.indirectLines.push(indirectLine);
            //     }
            // });

            lines.push(line);
        });

        return lines;
    }

    private groupLinesByProject (projectLines: Array<LineToSubmit>, indirectLines: Array<IndirectToSubmit>) {

        console.log('groupLinesByProject');
        const lines = [];

        const projects = this.getUniqueProjects(projectLines);

        _.forEach(projects, (project) => {

            const line: EntryCard = new EntryCard();
            line.Key = project.Name;

            this._cards$.next(line);

            // console.log('EnterTimeManager groupedLines', this._groupedLines);
            projectLines.forEach((projectLine, index) => {
                if (_.isEqual(projectLine.Project.Id, project.Id)) {
                    setTimeout(() => {
                        line.ProjectLines.push(projectLine);
                    }, 20 * index);
                }
            });

            lines.push(line);
        });

        // if (indirectLines.length > 0) {
        //
        //     const line = {
        //         key: this._INDIRECT,
        //         'indirectLines': []
        //     };
        //
        //     _.forEach(indirectLines, (indirectLine) => {
        //         line.indirectLines.push(indirectLine);
        //     });
        //
        //     lines.push(line);
        // }

        return lines;
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
                    FullName: uniqueLines.Employee.FullName
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
