import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as uuidv4 from 'uuid/v4';
import { Subject } from 'rxjs/Subject';

import { CostCode } from '../../../models/domain/CostCode';
import { Project } from '../../../models/domain/Project';
import { Employee } from '../../../models/domain/Employee';
import {LineToSubmit} from './models/LinesToSubmit';
import { TimeRecord } from '../../../models/domain/TimeRecord';
import {BrowserMode, EntryCard, TimeEntry, TimeEntryMode} from './models/TimeEntry';
import { TimeEntryState } from './models/TimeEntry';
import { TimeSettings } from '../../../models/domain/TimeSettings';
import {FormGroup} from '@angular/forms';

@Injectable()
export class EnterTimeManager {

    // Public Observables
    public _cards$ = new Subject<EntryCard>();
    public _projectRow$ = new Subject();
    public _indirectRow$ = new Subject();
    public _processing$ = new Subject<boolean>();

    // Private
    private _settings: TimeSettings;
    private _timeRecords: Array<TimeRecord>;
    private _indirectCodes: Array<CostCode>;
    private _projects: Array<Project>;
    private _employees: Array<Employee>;
    private _timeEntryState: TimeEntryState;
    private _linesToSubmit: Array<LineToSubmit>;
    private _indirectToSubmit: Array<LineToSubmit>;
    private _groupBy = 'Date';
    private _timeThreshold: number;
    private _enterTimeFormData;
    private _groupedLines;
    private _browserMode: BrowserMode;


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

    get projectRow$ () {

        return this._projectRow$.asObservable();
    }

    get indirectRow$ () {

        return this._indirectRow$.asObservable();
    }

    get cards$ () {

        return this._cards$.asObservable();
    }

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/
    public setProcessing (processing: boolean) {

        this._processing$.next(processing);
    }

    public setBrowserMode (mode: BrowserMode) {

        this._browserMode = mode;
    }

    public getBrowserMode () {

        return this._browserMode;
    }

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

    public getSettings (): TimeSettings {

        return this._settings;
    }

    public setSettings (settings: TimeSettings) {

        this._settings = settings;
        this._timeThreshold = settings.Overridable.OvertimeThresholdDaily;
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

    public getTotalLines () {

        return this._linesToSubmit.length + this._indirectToSubmit.length;
    }

    public setLineData (formData, times: TimeEntry) {

        // this._processing$.next(true);
        this._enterTimeFormData = _.cloneDeep(formData.value);
        this._timeEntryState.Times = _.cloneDeep(times);

        // console.log('EnterTimeManager setLineData', this._enterTimeFormData, this._timeEntryState);
        // TODO: Clear Private Property values?
        this.resetManager();
    }

    public getGroupedLines () {

        // console.log('EnterTimeManager getGroupedLines');
        this.generateNewLines(this._enterTimeFormData);
    }

    public getProjectLines (): Array<LineToSubmit> {

        return this._linesToSubmit;
    }

    public insertProjectLine (record: LineToSubmit) {

        // console.log('insertProjectLine', record);
        this._linesToSubmit.push(record);

        this._linesToSubmit = _.sortBy(this._linesToSubmit, (line) => {
           return line.Date;
        });
    }

    public updateProjectLine (lineId: string, propertyName: string, newValue: any) {

        // console.log('updateProjectLine propertyName', propertyName);
        // console.log('updateProjectLine newValue', newValue);
        const record = _.filter(this._linesToSubmit, (line) => {
            return line.Id === lineId;
        });

        record[0][propertyName] = newValue;
        // console.log('updateProject Linerecord[0]', record[0]);
    }

    public deleteProjectById (id: string) {

        this._linesToSubmit = _.remove(this._linesToSubmit, (line) => {

            return id !== line.Id;
        });
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

    public getIndirectLines (): Array<LineToSubmit> {

        return this._indirectToSubmit;
    }

    public insertIndirectLine (record: LineToSubmit) {

        this._indirectToSubmit.push(record);

        this._indirectToSubmit = _.sortBy(this._indirectToSubmit, (line) => {
            return line.Date;
        });
    }

    public updateIndirectLine (lineId: string, propertyName: string, newValue: any) {

        // console.log('updateIndirectLine propertyName', propertyName);
        // console.log('updateIndirectLine newValue', newValue);
        const record = _.filter(this._indirectToSubmit, (line) => {
            return line.Id === lineId;
        });

        record[0][propertyName] = newValue;
        // console.log('updateIndirectLine Linerecord[0]', record[0]);
    }

    public deleteIndirectById (id: string) {

        this._indirectToSubmit = _.remove(this._indirectToSubmit, (line) => {

            return id !== line.Id;
        });
    }

    public deleteIndirectLine (record: LineToSubmit) {

        let keyToDelete: number;

        this._indirectToSubmit.forEach((line, idx) => {
            if (line === record) {
                keyToDelete = idx;
            }
        });

        if (keyToDelete != null) {
            this._indirectToSubmit.splice(keyToDelete--, 1);
        }
    }

    public deleteCardGroup (rowsToDelete: Array<FormGroup>, indirectRowsToDelete: Array<FormGroup>) {

        if (rowsToDelete.length > 0) {

            _.forEach(rowsToDelete, (formGroup) => {

                _.forEach(this._linesToSubmit, (line) => {

                    if (line && _.isEqual(line.Id, formGroup.get('id').value)) {

                        this.deleteProjectLine(line);
                    }
                });
            });
        }

        if (indirectRowsToDelete.length > 0) {

            _.forEach(indirectRowsToDelete, (formGroup) => {

                _.forEach(this._indirectToSubmit, (line) => {

                    if (line && _.isEqual(line.Id, formGroup.get('id').value)) {

                        this.deleteIndirectLine(line);
                    }
                });
            });
        }
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

        this._linesToSubmit = _.sortBy(this._linesToSubmit, (line) => {
            return line.Date;
        });
    }

    private processIndirectLines (lines) {

        // console.log('EnterTimeManager processIndirectLines', lines);
        _.forEach(this._timeEntryState.SelectedDates, (date) => {

            _.forEach(lines.employees, (employee) => {

                let model: LineToSubmit;

                model = this.buildIndirectHoursToSubmit(date, employee, lines);

                this._indirectToSubmit.push(model);
            });
        });

        this._indirectToSubmit = _.sortBy(this._indirectToSubmit, (line) => {
            return line.Date;
        });
    }

    private buildHoursToSubmit (date, employee, lines): LineToSubmit {

        return {
            Id: uuidv4(),
            Date: _.cloneDeep(date),
            Employee: employee,
            Project: _.cloneDeep(lines.project),
            CostCode: _.cloneDeep(lines.costCode),
            System: _.cloneDeep(lines.system),
            Phase: _.cloneDeep(lines.phase),
            IsPunch: false,
            HoursST: Number(lines.standardHours),
            HoursOT: Number(lines.overtimeHours),
            HoursDT: Number(lines.doubleTimeHours),
            TimeIn: null,
            TimeOut: null,
            BreakIn: null,
            BreakOut: null,
            Note: lines.notes,
            CardIndex: -1
        };
    }

    private buildIndirectHoursToSubmit (date, employee, lines): LineToSubmit {

        return {
            Id: uuidv4(),
            Date: _.cloneDeep(date),
            Employee: employee,
            EmployeeId: '',
            IndirectCostId: lines.costCode.Id,
            CostCode: _.cloneDeep(lines.costCode),
            HoursST: Number(lines.standardHours),
            HoursOT: Number(lines.overtimeHours),
            HoursDT: Number(lines.doubleTimeHours),
            Note: lines.notes,
            CardIndex: -1
        };
    }

    private buildTimeToSubmit (date, employee, lines): LineToSubmit {

        const timeSubmission: LineToSubmit = {
            Id: uuidv4(),
            Date: _.cloneDeep(date),
            Employee: employee,
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
            Note: lines.notes,
            CardIndex: -1
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

        // console.log(timeDuration.hours(), this._timeThreshold);
        if (timeDuration && (timeDuration.hours() > this._timeThreshold)) {

            timeSubmission.HoursST = this._timeThreshold;
            timeSubmission.HoursOT = (timeDuration.hours() + (timeDuration.minutes() / 60)) - this._timeThreshold;
            timeSubmission.HoursDT = 0;
        } else if (timeDuration) {

            timeSubmission.HoursST = (timeDuration.hours() + (timeDuration.minutes() / 60));
            timeSubmission.HoursOT = 0;
            timeSubmission.HoursDT = 0;
        }
        // console.log(timeSubmission);

        return timeSubmission;
    }

    // // take the TimeRecords that are ready to submit, and group them and turn them into display friendly cards
    private groupLinesToSubmit (projectLines: Array<LineToSubmit>, indirectLines: Array<LineToSubmit>) {

        this._processing$.next(true);
        if (this._groupBy === 'Date') {

            this.groupLinesByDate(projectLines, indirectLines);
        } else if (this._groupBy === 'Employee') {

            this.groupLinesByEmployee(projectLines, indirectLines);
        } else if (this._groupBy === 'Project') {

            this.groupLinesByProject(projectLines, indirectLines);
        }
    }

    private groupLinesByDate (projectLines: Array<LineToSubmit>, indirectLines: Array<LineToSubmit>) {

        // console.log('groupLinesByDate');
        const projectDates = this.getUniqueDates(projectLines);
        const indirectDates = this.getUniqueDates(indirectLines);

        const dateArray = _.sortBy(_.uniqBy(projectDates.concat(indirectDates), (date) => {

            return date.startOf('day').format();
        }), (uniqueDate) => {

            return uniqueDate.startOf('day').format();
        });

        dateArray.forEach((date, cardIndex) => {

            const dateIndex = date.format();

            const line: EntryCard = new EntryCard();
            line.Key = dateIndex;

            this._cards$.next(line);

            // console.log('EnterTimeManager groupedLines', this._groupedLines);
            projectLines.forEach((projectLine, index) => {
                if (projectLine.Date.startOf('day').isSame(date, 'day')) {

                    projectLine.CardIndex = cardIndex;
                    this._projectRow$.next(projectLine);
                    // console.log('groupLinesByDate projectLines', projectLine);
                }
            });
            indirectLines.forEach((indirectLine, index) => {
                if (indirectLine.Date.startOf('day').isSame(date, 'day')) {

                    indirectLine.CardIndex = cardIndex;
                    this._indirectRow$.next(indirectLine);
                }
            });
        });

        // this._processing$.next(false);
    }

    private groupLinesByEmployee (projectLines: Array<LineToSubmit>, indirectLines: Array<LineToSubmit>) {

        // console.log('groupLinesByEmployee');
        const projectEmployees = this.getUniqueEmployees(projectLines);
        const indirectEmployees = this.getUniqueEmployees(indirectLines);

        const employeeArray = _.uniqBy(projectEmployees.concat(indirectEmployees), (line) => {
            return line.Id;
        });

        employeeArray.forEach((employee, cardIndex) => {

            const line: EntryCard = new EntryCard();
            line.Key = employee.Name;

            this._cards$.next(line);

            // console.log('EnterTimeManager groupedLines', this._groupedLines);
            projectLines.forEach((projectLine, index) => {
                if (_.isEqual(projectLine.Employee.Id, employee.Id)) {

                    projectLine.CardIndex = cardIndex;
                    this._projectRow$.next(projectLine);
                }
            });
            indirectLines.forEach((indirectLine, index) => {
                if (_.isEqual(indirectLine.Employee.Id, employee.Id)) {

                    indirectLine.CardIndex = cardIndex;
                    this._indirectRow$.next(indirectLine);
                }
            });
        });
    }

    private groupLinesByProject (projectLines: Array<LineToSubmit>, indirectLines: Array<LineToSubmit>) {

        // console.log('groupLinesByProject');
        const projects = this.getUniqueProjects(projectLines);

        let currentCardIndex = 0;

        projects.forEach((project, cardIndex) => {

            const line: EntryCard = new EntryCard();
            line.Key = project.Name;

            this._cards$.next(line);

            projectLines.forEach((projectLine) => {
                if (_.isEqual(projectLine.Project.Id, project.Id)) {

                    projectLine.CardIndex = cardIndex;
                    this._projectRow$.next(projectLine);
                }
            });

            currentCardIndex++;
        });

        if (indirectLines.length > 0) {

            const line: EntryCard = new EntryCard();
            line.Key = this._INDIRECT;

            this._cards$.next(line);

            indirectLines.forEach((indirectLine) => {
                indirectLine.CardIndex = currentCardIndex;
                this._indirectRow$.next(indirectLine);
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
