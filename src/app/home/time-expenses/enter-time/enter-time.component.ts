import { Component, Injector } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { IDatePickerConfig } from 'ng2-date-picker';
import { ITimeSelectConfig } from 'ng2-date-picker/time-select/time-select-config.model';

import { AccordionNavDirective } from '../../sidenav/sidenav-menu/accordion-nav.directive';
import { BaseComponent } from '../../shared/components/base.component';
import { LinesToAdd } from './models/LinesToAdd';
import { LineToSubmit } from './models/LinesToSubmit';

// Service Imports
import { TimeRecordsService } from '../time-records.service';
import { EmployeeService } from '../../shared/services/user/employee.service';

// Model Imports
import { Project } from '../../../models/domain/Project';
import { Employee } from '../../../models/domain/Employee';
import { CostCode } from '../../../models/domain/CostCode';
import { System } from '../../../models/domain/System';
import { Phase } from '../../../models/domain/Phase';
import {Line} from 'tslint/lib/test/lines';


@Component({
    templateUrl: './enter-time.component.html'
})
export class EnterTimeComponent extends BaseComponent {

    private _tenantEmployees: Array<Employee>;
    private _indirectCodes: Array<CostCode>;

    private _timeThreshold = 8;

    // working model to add
    public linesToAdd: LinesToAdd;

    // view config
    public dpCalendarConfig: IDatePickerConfig = {
        allowMultiSelect: true
    };
    public dpTimeConfig: ITimeSelectConfig = {
        minutesInterval: 5,
        showTwentyFourHours: false,
        showSeconds: false
    };
    public accordionOpen: boolean;
    public dateFormat: string;
    public groupCardsBy: string;  // Date, Employee, Project
    public moment = moment;

    // the actual lines we want to create
    public linesToSubmit: Array<LineToSubmit>;
    public groupedLines: _.Dictionary<Array<LineToSubmit>>;

    // data
    public projects: Array<Project>;
    public costCodes: Array<CostCode>;
    public employees: Array<Employee>;
    public systems: Array<System>;
    public phases: Array<Phase>;

    constructor(private _injector: Injector, private timeRecordsService: TimeRecordsService) {

        super(_injector, [
        //     {
        //         service: 'ProjectService',
        //         callback: 'projectServiceCallback'
        //     },
        //     {
        //         service: 'IndirectCostCodesService',
        //         callback: 'indirectCostCodeServiceCallback'
        //     },
        //     {
        //         service: 'EmployeeService',
        //         callback: 'employeeServiceCallback'
        //     }
        ]);


        this.accordionOpen = true;

        this.dateFormat = 'MMM. Do, YYYY';
        this.groupCardsBy = 'Date';

        this.initLinesToAdd();
        this.linesToSubmit = [];

        this.systems = [];

        this.phases = [];
    }

    // projectServiceCallback (projects) {
    //
    //     this.projects = projects['Value'] as Array<Project>;
    //     this.mockEntryFlag();
    //     // console.log(projects['Value']);
    // }
    //
    // employeeServiceCallback (employees) {
    //
    //     // console.log(employees);
    //     this._tenantEmployees = this.concatName(employees);
    //     this.employees = this._tenantEmployees;
    // }
    //
    // indirectCostCodeServiceCallback (costCodes) {
    //
    //     // console.log(costCodes);
    //     this._indirectCodes = this.mapCostCodes(costCodes['Value']) as Array<CostCode>;
    //     this.costCodes = this._indirectCodes;
    // }

    // public addLines() {
    //     // console.log(this.linesToAdd);
    //     this.generateNewLines(this.linesToAdd);
    //     this.accordionOpen = false;
    //     this.initLinesToAdd();
    // }
    //
    // public removeDate(removeDate: moment.Moment) {
    //     let indexToRemove: number;
    //     this.linesToAdd.selectedDates.forEach((date, idx) => {
    //         if (date.isSame(removeDate)) {
    //             indexToRemove = idx;
    //         }
    //     });
    //
    //     if (indexToRemove != null) {
    //         this.linesToAdd.selectedDates.splice(indexToRemove--, 1);
    //         // TODO UI won't update but developer has resolved this issue, should resolve itself once merged and updated on npm
    //         //    see commit associated with https://github.com/vlio20/angular-datepicker/issues/127
    //     }
    // }

    public deleteAllLines() {
        this.linesToSubmit = [];
        this.groupedLines = null;
        this.accordionOpen = true;
        this.employees = this._tenantEmployees;
        this.costCodes = this._indirectCodes;
        this.systems = [];
        this.phases = [];
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

    // public linesToAddCount(): number {
    //     return this.linesToAdd.selectedDates.length * this.linesToAdd.employees.length;
    // }

    // public selectAllEmployees() {
    //
    //     this.linesToAdd.employees = [];
    //     this.employees.forEach(employee => {
    //         this.linesToAdd.employees.push(employee);
    //     });
    // }
    //
    // public selectNoneEmployees() {
    //     this.linesToAdd.employees = [];
    // }

    public updateGrouping(by: string, doNotScroll?: boolean) {
        this.groupCardsBy = by;
        this.groupLinesToSubmit(this.linesToSubmit, by);
        if (!doNotScroll) document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    // e is of type Project
    // public projectChanged(e) {
    //
    //     this.linesToAdd.project = e;
    //     this.linesToAdd.employees = [];
    //     // TODO reload and repopulate dropdowns based on newly selected project
    //
    //     this.checkDefaultSystem(e.Systems);
    //     this.checkDefaultCostCode(e.CostCodes);
    //     this.filterEmployees(e.Id);
    //     // console.log(this.employees);
    // }
    //
    // public systemChanged(e) {
    //
    //     this.checkDefaultPhase(e.Phases);
    // }
    //
    // selectEmployee (event) {
    //
    //     console.log('SelectEmployee', event);
    // }

    public submitTime() {

    }

    // private checkDefaultSystem (systems: Array<System>) {
    //
    //     this.systems = systems;
    //     if (systems.length === 1) {
    //
    //         this.linesToAdd.system = systems[0];
    //         this.checkDefaultPhase(systems[0].Phases);
    //     } else {
    //
    //         this.linesToAdd.phase = null;
    //         this.phases = [];
    //     }
    // }
    //
    // private checkDefaultPhase (phases: Array<Phase>) {
    //
    //     this.phases = phases;
    //     if (phases.length === 1) {
    //
    //         this.linesToAdd.phase = phases[0];
    //     }
    // }
    //
    // private checkDefaultCostCode (costCodes: Array<CostCode>) {
    //
    //     this.costCodes = costCodes;
    //     if (costCodes.length === 1) {
    //
    //         this.linesToAdd.costCode = costCodes[0];
    //     } else {
    //
    //         this.linesToAdd.costCode = null;
    //     }
    // }

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
            break: {
                in: null,
                out: null
            },
            note: null
        }
    }

    // take the lines the user wants to add, and make them into TimeRecords that are ready to submit
    // private generateNewLines(lines: LinesToAdd) {
    //
    //     lines.selectedDates.forEach((date, dateIdx) => {
    //         lines.employees.forEach((employee, employeeIdx) => {
    //
    //             let model: LineToSubmit;
    //
    //             if (!lines.timeInTimeOut) {
    //
    //                 model = this.buildHoursToSubmit(date, employee, lines);
    //             } else {
    //
    //                 model = this.buildTimeToSubmit(date, employee, lines);
    //             }
    //
    //             this.linesToSubmit.push(model);
    //         })
    //     });
    //
    //     this.groupLinesToSubmit(this.linesToSubmit, this.groupCardsBy);
    // }

    private buildHoursToSubmit (date, employee, lines: LinesToAdd): LineToSubmit {

        return {
            Date: date,
            Employee: employee,
            Project: lines.project,
            CostCode: lines.costCode,
            System: lines.system,
            Phase: lines.phase,
            IsPunch: false,
            HoursST: lines.hoursWorked.st,
            HoursOT: lines.hoursWorked.ot,
            HoursDT: lines.hoursWorked.dt,
            TimeIn: moment().startOf('day').format('h:mm A'),
            TimeOut: moment().startOf('day').format('h:mm A'),
            BreakIn: moment().startOf('day').format('h:mm A'),
            BreakOut: moment().startOf('day').format('h:mm A'),
            Note: lines.note,
        };
    }

    private buildTimeToSubmit (date, employee, lines: LinesToAdd): LineToSubmit {

        let timeSubmission: LineToSubmit = {
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
            TimeIn: lines.timeInTimeOut.in ? lines.timeInTimeOut.in.format('h:mm A') : moment().format('h:mm A'),
            TimeOut: lines.timeInTimeOut.out ? lines.timeInTimeOut.out.format('h:mm A') : moment().format('h:mm A'),
            BreakIn: lines.break.in,
            BreakOut: lines.break.out,
            Note: lines.note
        };

        const punchIn = lines.timeInTimeOut.in ? lines.timeInTimeOut.in : moment();
        const punchOut = lines.timeInTimeOut.out ? lines.timeInTimeOut.out : moment();

        let timeDuration = moment.duration(punchOut.diff(punchIn));
        // console.log(timeDuration.hours());

        let breakIn, breakOut, breakDuration;

        if (lines.break) {

            breakIn = lines.break.in ? lines.break.in : null;
            breakOut = lines.break.out ? lines.break.out : null;

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

    private calculateTotalTimeFromPunch (timeIn, timeOut) {

        const punchIn = timeIn ? timeIn : moment();
        const punchOut = timeOut ? timeOut : moment();

        const duration = moment.duration(punchOut.diff(punchIn));

        return (duration.hours() + (duration.minutes() / 60));
    }

    // take the TimeRecords that are ready to submit, and group them and turn them into display friendly cards
    private groupLinesToSubmit(lines: Array<LineToSubmit>, groupBy: string) {

        if (groupBy === 'Date') {

            this.groupedLines = _.groupBy(lines, groupBy);
        } else if (groupBy === 'Employee') {

            this.groupedLines = _.groupBy(lines, value => {
                return value[groupBy]['FullName'];
            });
        } else if (groupBy === 'Project') {

            this.groupedLines = _.groupBy(lines, value => {
                return value[groupBy]['Name'];
            });
        }


        console.log(this.groupedLines);
    }

    private mapCostCodes (costCodes: Array<any>) {

        return _.map(costCodes, function(code) {
            return _.extend({}, code, {Name: code.Description});
        });
    }

    // TODO: Remove when settings flag is added
    private mockEntryFlag () {

        this.projects.forEach(

            (project, index) => {

                if (index % 2) {

                    project['timeEntryMethod'] = 'hoursWorked';
                } else {

                    project['timeEntryMethod'] = 'timeInTimeOut';
                }
            }
        )
    }

    private concatName (employees: Array<Employee>) {

        return _.map(employees, function(employee) {
            return _.extend({}, employee, {FullName: employee.FirstName + ' ' + employee.LastName});
        });
    }

    private filterEmployees (projectId: string) {

        this.employees = _.filter(this._tenantEmployees, function (employee) {
            return employee.ProjectIds.includes(projectId);
        });
    }
}




