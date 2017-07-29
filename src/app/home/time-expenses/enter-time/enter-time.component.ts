import { Component } from '@angular/core';

import { IDatePickerConfig } from 'ng2-date-picker';

import { TimeRecordsService } from '../time-records.service';

import * as moment from 'moment';
import * as _ from 'lodash';
import { Employee } from '../../../models/time/TimeRecord';
import { AccordionNavDirective } from '../../sidenav/sidenav-menu/accordion-nav.directive';

@Component({
    templateUrl: './enter-time.component.html'
})
export class EnterTimeComponent {

    // view config
    public dpCalendarConfig: IDatePickerConfig = {
        allowMultiSelect: true
    };
    public accordionOpen: boolean;
    public dateFormat: string;
    public groupCardsBy: string;  // Date, Employee, Project
    public moment = moment;

    // working model to add
    public linesToAdd: LinesToAdd;

    // the actual lines we want to create
    public linesToSubmit: Array<LineToSubmit>;
    public groupedLines: _.Dictionary<Array<LineToSubmit>>;

    // dummy data
    public projects: Array<any>;
    public costCodes: Array<any>;
    public employees: Array<any>;
    public systems: Array<any>;
    public phases: Array<any>;

    constructor(private timeRecordsService: TimeRecordsService) {
        this.accordionOpen = true;

        this.dateFormat = 'MMM. Do, YYYY';
        this.groupCardsBy = 'Date';

        this.initLinesToAdd();
        this.linesToSubmit = [];

        this.projects = [
            { name: 'eSUB', value: 'esub', timeEntryMethod: 'hoursWorked' },
            { name: 'Seamgen', value: 'seamgen', timeEntryMethod: 'timeInTimeOut' },
        ];

        this.costCodes = [
            { name: 'Engineering', value: 'engineering' },
            { name: 'Maintenance', value: 'maintenance' },
            { name: 'Overhead', value: 'overhead' }
        ];

        this.systems = [
            { name: 'System A', value: 'a' },
            { name: 'System B', value: 'b' }
        ];

        this.phases = [
            { name: 'First', value: 'first' },
            { name: 'Second', value: 'second' }
        ];

        this.employees = [
            { name: 'Bin Tang', value: 'bint' },
            { name: 'Alex Takabayashi', value: 'alext' },
            { name: 'Guillermo Alvarez', value: 'guillermoa' },
            { name: 'Mike O\'Gorman', value: 'mikeo' },
            { name: 'Tony Drake', value: 'tonyd' }
        ];
    }

    public addLines() {
        this.generateNewLines(this.linesToAdd);
        this.accordionOpen = false;
        this.initLinesToAdd();
    }

    public removeDate(removeDate: moment.Moment) {
        let indexToRemove: number;
        this.linesToAdd.selectedDates.forEach((date, idx) => {
            if (date.isSame(removeDate)) {
                indexToRemove = idx;
            }
        });

        if (indexToRemove != null) {
            this.linesToAdd.selectedDates.splice(indexToRemove--, 1);
            // TODO UI won't update but developer has resolved this issue, should resolve itself once merged and updated on npm
            //    see commit associated with https://github.com/vlio20/angular-datepicker/issues/127
        }
    }

    public deleteAllLines() {
        this.linesToSubmit = [];
        this.groupedLines = null;
        this.accordionOpen = true;
    }

    public deleteGrouping(grouping) {
        grouping.forEach(record => {
            this.deleteRecord(record);
        });
    }

    public deleteRecord(record) {
        let keyToRemove: number;

        this.linesToSubmit.forEach((line, idx) => {
            if (line === record) {
                keyToRemove = idx;
            }
        });

        if (keyToRemove != null) {
            this.linesToSubmit.splice(keyToRemove--, 1);
        }

        this.updateGrouping(this.groupCardsBy, true);
    }

    public linesToAddCount(): number {
        return this.linesToAdd.selectedDates.length * this.linesToAdd.employees.length;
    }

    public selectAllEmployees() {
        this.linesToAdd.employees = [];
        this.employees.forEach(employee => {
            this.linesToAdd.employees.push(employee);
        });
    }

    public selectNoneEmployees() {
        this.linesToAdd.employees = [];
    }

    private initLinesToAdd() {
        this.linesToAdd = {
            selectedDates: [],
            project: null,
            costCode: null,
            system: null,
            phase: null,
            employees: [],
            hoursWorked: {
                st: null,
                ot: null,
                dt: null
            },
            timeInTimeOut: {
                in: null,
                out: null
            },
            comment: null
        }
    }

    // take the lines the user wants to add, and make them into TimeRecords that are ready to submit
    private generateNewLines(lines: LinesToAdd) {

        lines.selectedDates.forEach((date, dateIdx) => {
            lines.employees.forEach((employee, employeeIdx) => {

                const model: LineToSubmit = {
                    Date: date,
                    Employee: employee,
                    Project: lines.project,
                    CostCode: lines.costCode,
                    System: lines.system,
                    Phase: lines.phase,
                    HoursST: lines.hoursWorked.st,
                    HoursOT: lines.hoursWorked.ot,
                    HoursDT: lines.hoursWorked.dt,
                    TimeIn: lines.timeInTimeOut.in,
                    TimeOut: lines.timeInTimeOut.out,
                    Comment: lines.comment,
                };

                this.linesToSubmit.push(model);
            })
        });

        this.groupLinesToSubmit(this.linesToSubmit, this.groupCardsBy);
    }

    public updateGrouping(by: string, doNotScroll?: boolean) {
        this.groupCardsBy = by;
        this.groupLinesToSubmit(this.linesToSubmit, by);
        if (!doNotScroll) document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    // take the TimeRecords that are ready to submit, and group them and turn them into display friendly cards
    private groupLinesToSubmit(lines: Array<LineToSubmit>, groupBy: string) {
        if (groupBy === 'Date') {
            this.groupedLines = _.groupBy(lines, groupBy);
        } else if (groupBy === 'Employee' || groupBy === 'Project') {
            this.groupedLines = _.groupBy(lines, value => {
                return value[groupBy]['value'];
            });
        }
    }

    public submitTime() {

    }
}

class LinesToAdd {
    selectedDates: Array<moment.Moment>;
    project: any;
    costCode: any;
    system: any;
    phase: any
    employees: Array<any>;
    // TODO figure out time typing
    hoursWorked: {
        st: number;
        ot: number;
        dt: number;
    }
    timeInTimeOut: {
        in: any;
        out: any
    };
    comment: string
}

class LineToSubmit {
    Date: moment.Moment;
    Employee: any;
    Project: any;
    CostCode: any;
    System: any;
    Phase: any;
    HoursST: number;
    HoursOT: number;
    HoursDT: number;
    TimeIn: any;
    TimeOut: any;
    Comment: string;
}
