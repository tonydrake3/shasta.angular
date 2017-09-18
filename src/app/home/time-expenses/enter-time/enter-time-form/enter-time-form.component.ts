import {AfterViewInit, Component, EventEmitter, Injector, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ITimeSelectConfig } from 'ng2-date-picker/time-select/time-select-config.model';
import { IDatePickerConfig } from 'ng2-date-picker';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

// Models
import { Project } from '../../../../models/domain/Project';
import { Employee } from '../../../../models/domain/Employee';
import { CostCode } from '../../../../models/domain/CostCode';
import { System } from '../../../../models/domain/System';
import { Phase } from '../../../../models/domain/Phase';

import {EnterTimeManager} from '../enter-time.manager';
import {TimeEntry} from '../models/TimeEntry';
import {TimeEntryMode} from '../models/TimeEntry';
import {DateFlyoutService} from '../../../shared/components/date-flyout/date-flyout.service';
import {Observable} from 'rxjs/Observable';
import {ConfirmationDialogService} from '../../../shared/services/confirmation-dialog.service';
import {EnterTimePreloadManager} from '../enter-time-preload.manager';
import {TimeValidationService} from '../../../shared/services/time-validation.service';

@Component({
    selector: 'esub-enter-time-form',
    templateUrl: './enter-time-form.component.html'
})
export class EnterTimeFormComponent implements OnInit, AfterViewInit, OnDestroy {

    @Output() timeEntryComplete: EventEmitter<boolean> = new EventEmitter<boolean>();

    // Private
    private _tenantEmployees: Array<Employee>;
    private _indirectCodes: Array<CostCode>;

    // Public
    public enterTimeForm: FormGroup;
    public dateFormat: string;
    public projects: Array<Project>;
    public costCodes: Array<CostCode>;
    public employees: Array<Employee>;
    public systems: Array<System>;
    public phases: Array<Phase>;
    public selectedDates: Array<moment.Moment>;
    public time: TimeEntry;
    public timeEntryModeEnum;
    public isTimeIn: boolean;
    public isEmployeeSelectionVisible: boolean;
    public isProjectCostEntry: boolean;
    public enterTimeTabIndex: number;
    public isUnsupportedTime: boolean;
    public isIE: boolean;
    public progressConfig;
    public loading: boolean;

    public filteredProjects: Observable<Project[]>;
    public filteredSystems: Observable<System[]>;
    public filteredPhases: Observable<Phase[]>;
    public filteredCostCodes: Observable<CostCode[]>;
    public filteredEmployees: Observable<Employee[]>;

    public selectedEmployees: Array<Employee>;
    public costCodePlaceholder: string;
    public timeInPeriod: string;
    public timeOutPeriod: string;
    public breakInPeriod: string;
    public breakOutPeriod: string;

    // Calendar Config
    public dpDatepickerConfig: IDatePickerConfig = {
        allowMultiSelect: true,
        max: moment()
    };

    constructor (private _builder: FormBuilder, private _enterTimeManager: EnterTimeManager,
                 private _dateFlyoutService: DateFlyoutService, private _confirmationService: ConfirmationDialogService,
                 private _preloadService: EnterTimePreloadManager, private _timeValidation: TimeValidationService) {

        this.progressConfig = {
            color: 'primary',
            mode: 'indeterminate',
            value: 0
        };
        this.isUnsupportedTime = false;
        this.isIE = false;
        this.dateFormat = 'MMM. Do, YYYY';
        this.costCodePlaceholder = 'Cost Code';
        this.isEmployeeSelectionVisible = true;
        this.isProjectCostEntry = true;
        this.enterTimeTabIndex = 0;
        this.isTimeIn = false;
        this._enterTimeManager.setTimeEntryMode(TimeEntryMode.Hours);
        this.timeEntryModeEnum = TimeEntryMode;
        this.selectedDates = [];
        this.time = new TimeEntry();
        this.projects = [];
        this.systems = [];
        this.phases = [];
        this.employees = [];
        this._tenantEmployees = [];
        this.selectedEmployees = [];
        this.costCodes = [];
        this._indirectCodes = [];
        this.createForm();
    }

    /******************************************************************************************************************
     * Lifecycle Methods
     ******************************************************************************************************************/

    ngOnInit () {

        this.projects = this._enterTimeManager.getProjects();
        this._tenantEmployees = this._enterTimeManager.getEmployees();
        this._indirectCodes = this._enterTimeManager.getIndirectCodes();

        this._preloadService.loading$
            .subscribe(
                (loading) => {

                    if (loading === false) {
                        this.projects = this._enterTimeManager.getProjects();
                        this._tenantEmployees = this._enterTimeManager.getEmployees();
                        this._indirectCodes = this._enterTimeManager.getIndirectCodes();
                    }
                });

        if (this.projects.length === 0 || this._tenantEmployees.length === 0 || this._indirectCodes.length === 0) {

            this.loading = true;
            this._preloadService.load();
        }

        // Browser Detection
        const navigator = window.navigator;
        const userAgent = navigator.userAgent;
        let ieIndex = -1;

        if (navigator.appName === 'Microsoft Internet Explorer') {

            ieIndex = userAgent.toLowerCase().indexOf('msie');
        } else if (navigator.appName === 'Netscape') {

            ieIndex = userAgent.toLowerCase().indexOf('trident');

            if (ieIndex > -1) {
                this.isIE = true;
            }
        }

        const firefoxIndex = userAgent.toLowerCase().indexOf('firefox');

        if (firefoxIndex > -1 || ieIndex > -1) {

            this.isUnsupportedTime = true;
        }
    }

    ngOnDestroy () {

    }

    ngAfterViewInit () {

        if (this.isUnsupportedTime) {

            this.timeInPeriod = moment().format('A').toString();
            this.timeOutPeriod = moment().format('A').toString();
            this.breakInPeriod = moment().format('A').toString();
            this.breakOutPeriod = moment().format('A').toString();
        } else {

            this.enterTimeForm.patchValue({

                timeIn: moment().format('h:mm A'),
                timeOut: moment().format('h:mm A'),
                breakIn: moment().format('h:mm A'),
                breakOut: moment().format('h:mm A')
            });
        }
    }

    /******************************************************************************************************************
     * Callback Handler
     ******************************************************************************************************************/
    // projectServiceCallback (projects) {
    //
    //     this.projects = projects['Value'] as Array<Project>;
    //     this._enterTimeManager.setProjects(this.projects);
    //     // this.projectChange();
    //     // console.log(projects['Value']);
    // }
    //
    // employeeServiceCallback (employees) {
    //
    //     this._tenantEmployees = this.concatName(employees['Value'] as Array<Employee>);
    //     this._enterTimeManager.setEmployees(this._tenantEmployees);
    // }
    //
    // indirectCostCodeServiceCallback (costCodes) {
    //
    //     // console.log(costCodes);
    //     this._indirectCodes = this.mapCostCodes(costCodes['Value']) as Array<CostCode>;
    //     this._enterTimeManager.setIndirectCodes(this._indirectCodes);
    // }

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/
    public tabIndexChange (event) {

        switch (event) {
            case 0:
                this.isProjectCostEntry = true;
                this.isTimeIn = false;
                this.costCodePlaceholder = 'Cost Code';
                this._enterTimeManager.setTimeEntryMode(TimeEntryMode.Hours);
                this.clearForm();
                break;
            case 1:
                this.isProjectCostEntry = true;
                this.isTimeIn = true;
                this.costCodePlaceholder = 'Cost Code';
                this._enterTimeManager.setTimeEntryMode(TimeEntryMode.TimeInTimeOut);
                this.clearForm();
                break;
            case 2:
                this.isProjectCostEntry = false;
                this.isTimeIn = false;
                this.costCodePlaceholder = 'Indirect Cost';
                this._enterTimeManager.setTimeEntryMode(TimeEntryMode.Hours);
                this.clearForm();
                break;
        }
    }

    public onDatesChanged (event) {

        if (event.length !== 0) {

            this.enterTimeForm.markAsDirty();

            let dateFieldValue: string;
            if (event.length > 1) {

                dateFieldValue = event.length + ' dates selected';
            } else {

                dateFieldValue = event[0].format(this.dateFormat);
            }
            this.enterTimeForm.patchValue({
                dates: dateFieldValue
            });
            this._enterTimeManager.setSelectedDates(event);

        } else if (this.enterTimeForm.get('dates').value && event.length === 0) {

            this.enterTimeForm.patchValue({
                dates: ''
            });
        }
    }

    public selectAllEmployees() {

        this.selectedEmployees = [];

        if (this.employees.length > 0) {

            this.employees.forEach((employee) => {
                this.selectedEmployees.push(employee);
            });
        } else {

            this._tenantEmployees.forEach((employee) => {
                this.selectedEmployees.push(employee);
            });
        }

        this.enterTimeForm.patchValue({
           employees: this.selectedEmployees
        });
    }

    public clearEmployeeSelection() {
        this.selectedEmployees = [];
        this.enterTimeForm.patchValue({
            employees: this.selectedEmployees
        });
    }

    public toggleSelectedEmployees () {

        this.isEmployeeSelectionVisible = !this.isEmployeeSelectionVisible;
    }

    public openProjects () {

        const projectSelect = this.enterTimeForm.get('project');

        if (projectSelect.value) {

            this.filteredProjects = this.filterCollection(projectSelect.value, this.projects);
        } else {

            this.filteredProjects = Observable.of(this.projects);
        }
    }

    public openSystems () {

        const systemSelect = this.enterTimeForm.get('system');

        if (this.systems) {

            this.filteredSystems = this.filterCollection(systemSelect.value, this.systems);
        } else {

            this.filteredSystems = Observable.of(this.systems);
        }
    }

    public openPhases () {

        // const systemSelect = this.enterTimeForm.get('system');
        const phaseSelect = this.enterTimeForm.get('phase');

        if (phaseSelect.value) {

            this.filteredPhases = this.filterCollection(phaseSelect.value, this.phases);
        } else {

            this.filteredPhases = Observable.of(this.phases);
        }
    }

    public openCostCodes () {

        const costCodeSelect = this.enterTimeForm.get('costCode');

        if (this.costCodes.length > 0) {

            if (costCodeSelect.value) {

                this.filteredCostCodes = this.filterProjectCodes(costCodeSelect.value);
            } else {

                this.filteredCostCodes = Observable.of(this.costCodes);
            }
        } else {

            if (costCodeSelect.value) {

                this.filteredCostCodes = this.filterIndirectCodes(costCodeSelect.value);
            } else {

                this.filteredCostCodes = Observable.of(this._indirectCodes);
            }
        }
    }

    public openEmployee () {

        const employeeSelect = this.enterTimeForm.get('employee');

        if (employeeSelect.value) {

            if (this.employees.length > 0) {

                this.filteredEmployees = this.filterEmployees(employeeSelect.value, this.employees);
            } else {

                this.filteredEmployees = this.filterEmployees(employeeSelect.value, this._tenantEmployees);
            }
        } else {

            if (this.employees.length > 0) {

                if (this.selectedEmployees.length > 0) {

                    this.filteredEmployees = this.filterEmployees('', this.employees);
                } else {

                    this.filteredEmployees = Observable.of(this.employees);
                }

            } else {

                console.log('openEmployee', this._tenantEmployees);
                this.filteredEmployees = Observable.of(this._tenantEmployees);
            }
        }
    }

    public displayFormatted (value) {

        if (value) {

            return value.Number + ' - ' + value.Name;
        }
        return '';
    }

    public displayCostCode (value) {

        if (value) {

            return value.Code + ' - ' + value.Name;
        }
        return '';
    }

    public projectSelected (event) {

        // console.log('EnterTimeFormComponent projectSelected', event.source.value);
        const project = event.source.value;

        this.checkDefaultSystem(project.Systems);
        this.checkDefaultCostCode(project.CostCodes);
        this.filterEmployeesByProject(project.Id);

        const costCodeSelect = this.enterTimeForm.get('costCode');
        costCodeSelect.clearValidators();
        costCodeSelect.setErrors(null);
    }

    public systemSelected (event) {

        const system = event.source.value;
        // console.log('EnterTimeFormComponent systemSelected', system.Phases);
        this.checkDefaultPhase(system.Phases);
    }

    public phaseSelected (event) {

        // console.log('EnterTimeFormComponent phaseSelected', event.source.value);
        const phase = event.source.value;
    }

    public employeeSelected (event) {

        // console.log('EnterTimeFormComponent employeeSelected', event.source.value);
        const employee = event.source.value;

        this.selectedEmployees.push(employee);
        this.enterTimeForm.patchValue({
            employees: this.selectedEmployees
        });
        const employeeSelect = this.enterTimeForm.get('employee');
        employeeSelect.setValue(null);
    }

    public costCodeSelected (event) {

        const costCode = event.source.value;

        if (this.costCodes.length === 0) {

            const projectSelect = this.enterTimeForm.get('project');
            projectSelect.clearValidators();
            projectSelect.setErrors(null);
        }
    }

    public removeEmployee (employee) {
        // console.log(employee);

        this.removeFromCollection(employee, this.selectedEmployees);
        this.enterTimeForm.patchValue({
            employees: this.selectedEmployees
        });
    }

    public clearKeystroke (event) {

        if (event.key.toLowerCase() === 'tab' || event.keyCode === 9) {
            this._dateFlyoutService.closeDateFlyout();
            return true;
        }
        event.preventDefault();
        return false;
    }

    public onFocus () {

        this._dateFlyoutService.openDateFlyout();
    }

    public linesToAddCount(): number {
        return this._enterTimeManager.getSelectedDatesCount() * this.enterTimeForm.get('employees').value.length;
    }

    // TODO: Move to component
    public getExpandContainer (className: string) {

        const classes = [];
        classes.push(
            className
        );

        if (this.isEmployeeSelectionVisible) {

            classes.push(
                'expanded'
            );
        }
        return classes;
    }

    // TODO: Move to component
    public getExpandIcon () {

        const classes = [];
        classes.push(
            'material-icons'
        );
        classes.push(
            'pull-right'
        );

        if (!this.isEmployeeSelectionVisible) {

            classes.push(
                'rotate-icon'
            );
        }
        return classes;
    }

    public clearForm () {

        this.clearFormData();

        if (this._enterTimeManager.getLineCount() === 0) {
            this._confirmationService.setNeedsConfirmation(false);
        }
    }

    public createLines (enterTimeForm: FormControl) {

        if (this.isUnsupportedTime) {

            this.updateTime();
        }
        this.timeEntryComplete.emit(true);
        this._enterTimeManager.setLineData(enterTimeForm, this.time);
    }

    public removeFromCollection (employee, collection: Array<any>) {

        let keyToDelete: number;

        collection.forEach((emp, idx) => {
            if (emp === employee) {
                keyToDelete = idx;
            }
        });

        if (keyToDelete != null) {
            collection.splice(keyToDelete--, 1);
        }
    }

    public onTimeInChange (event) {

        const timeIn = this.enterTimeForm.get('timeIn') as FormControl;

        timeIn.setValue(event);

        const timeOut = this.enterTimeForm.get('timeOut');

        const condition = this._timeValidation.startBeforeEndTime(timeIn.value + ' ' + this.timeInPeriod,
            timeOut.value + ' ' + this.timeOutPeriod);

        this.timeValidation(timeIn, condition);
    }

    public onTimeInPeriodChange (event) {

        this.timeInPeriod = event;
    }

    public onTimeInPeriodSelection (event) {

        const timeIn = this.enterTimeForm.get('timeIn') as FormControl;
        const timeOut = this.enterTimeForm.get('timeOut') as FormControl;

        const condition = this._timeValidation.startBeforeEndTime(timeIn.value + ' ' + event.value,
            timeOut.value + ' ' + this.timeOutPeriod);

        console.log(timeIn.value + ' ' + event.value);
        console.log(timeOut.value + ' ' + this.timeOutPeriod);
        this.timeValidation(timeIn, condition);
    }

    public onTimeOutChange (event) {

        this.enterTimeForm.get('timeOut').setValue(event);
    }

    public onTimeOutPeriodChange (event) {

        this.timeOutPeriod = event;
    }

    public onBreakInChange (event) {

        this.enterTimeForm.get('breakIn').setValue(event);
    }

    public onBreakInPeriodChange (event) {

        this.breakInPeriod = event;
    }

    public onBreakOutChange (event) {

        this.enterTimeForm.get('breakOut').setValue(event);
    }

    public onBreakOutPeriodChange (event) {

        this.breakOutPeriod = event;
    }

    public timeInValidation (event) {

        const timeOut = this.enterTimeForm.get('timeOut');

        const condition = this._timeValidation.startBeforeEndTime(event.value, timeOut.value);

        this.timeValidation(event, condition);
    }

    public timeOutValidation (event) {

        const timeIn = this.enterTimeForm.get('timeIn');

        const condition = this._timeValidation.endAfterStartTime(timeIn.value, event.value);

        this.timeValidation(event, condition);
    }

    public breakInValidation (event) {

        const timeIn = this.enterTimeForm.get('timeIn');
        const timeOut = this.enterTimeForm.get('timeOut');
        const breakOut = this.enterTimeForm.get('breakOut');

        const condition = this._timeValidation.breakInBetweenTimeInOut(timeIn.value, timeOut.value, event.value) &&
            this._timeValidation.startBeforeEndTime(event.value, breakOut.value);

        this.timeValidation(event, condition);
    }

    public breakOutValidation (event) {

        const timeIn = this.enterTimeForm.get('timeIn');
        const timeOut = this.enterTimeForm.get('timeOut');
        const breakIn = this.enterTimeForm.get('breakIn');

        const condition = this._timeValidation.breakOutBetweenTimeInOut(timeIn.value, timeOut.value, event.value) &&
            this._timeValidation.endAfterStartTime(breakIn.value, event.value);

        this.timeValidation(event, condition);
    }

    // TODO: Implement when angular issue 11836 (CanDeactivateChild) is implemented.
    //       https://github.com/angular/angular/issues/11836

    // canDeactivate(): Observable<boolean> | boolean {
    //     console.log('EnterTimeFormComponent canDeactivate');
    //
    //     return true;
        // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
        // if (!this.crisis || this.crisis.name === this.editName) {
        //     return true;
        // }
        // Otherwise ask the user with the dialog service and return its
        // observable which resolves to true or false when the user decides
        // return this.dialogService.confirm('Discard changes?');
    // }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/
    private checkDefaultSystem (systems: Array<System>) {

        this.systems = systems;
        if (systems.length === 1) {

            this.enterTimeForm.patchValue({
                system: systems[0]
            });
            this.checkDefaultPhase(systems[0].Phases);
        } else {
            this.enterTimeForm.patchValue({
                system: ''
            });
            this.phases = [];
        }
    }

    private checkDefaultPhase (phases: Array<Phase>) {

        this.phases = phases;
        if (phases.length === 1) {

            this.enterTimeForm.patchValue({
                phase: phases[0]
            });
        } else {

            this.enterTimeForm.patchValue({
                phase: ''
            });
        }
    }

    private checkDefaultCostCode (costCodes: Array<CostCode>) {

        this.costCodes = costCodes;
        if (costCodes.length === 1) {

            this.enterTimeForm.patchValue({
                costCode: costCodes[0]
            });
        } else {

            this.enterTimeForm.patchValue({
                costCode: ''
            });
        }
    }

    private filterEmployeesByProject (projectId: string) {

        this.employees = _.filter(this._tenantEmployees, function (employee) {
            return employee.ProjectIds.includes(projectId);
        });
    }

    private filterCollection (match, collection): Observable<Array<any>> {

        let filtered = [];

        if (typeof match === 'string') {

            filtered = _.filter(collection, (item) => {
                return item.Name.toLowerCase().includes(match.toLowerCase()) ||
                    item.Number.toLowerCase().includes(match.toLowerCase()) ||
                    (item.Number.toLowerCase() + ' - ' + item.Name.toLowerCase()).includes(match.toLowerCase());
            });
        }

        return Observable.of(filtered);
    }

    private filterEmployees (match, employeeList: Array<Employee>): Observable<Array<any>> {

        let filtered = [];

        if (typeof match === 'string') {

            filtered = _.filter(employeeList, (employee) => {
                return employee.Name.toLowerCase().includes(match.toLowerCase()) ||
                    employee.Number.toLowerCase().includes(match.toLowerCase()) ||
                    (employee.Number.toLowerCase() + ' - ' + employee.Name.toLowerCase()).includes(match.toLowerCase());
            });

            if (this.selectedEmployees.length > 0) {

                _.forEach(this.selectedEmployees, (employee) => {
                    this.removeFromCollection(employee, filtered);
                });
            }
        }

        return Observable.of(filtered);
    }

    private filterIndirectCodes (match): Observable<CostCode[]> {

        // console.log('filterIndirectCodes', match, this._indirectCodes);
        let filtered = [];

        if (typeof match === 'string') {

            filtered = _.filter(this._indirectCodes, (code) => {
                return code.Name.toLowerCase().includes(match.toLowerCase()) ||
                    code.Code.toLowerCase().includes(match.toLowerCase()) ||
                    (code.Code.toLowerCase() + ' - ' + code.Name.toLowerCase()).includes(match.toLowerCase());
            });
        }

        return Observable.of(filtered);
    }

    private filterProjectCodes (match): Observable<CostCode[]> {

        // console.log('filterProjectCodes', match);
        let filtered = [];
        const projectSelect = this.enterTimeForm.get('project');

        if (typeof match === 'string') {

            filtered = _.filter(projectSelect.value.CostCodes, (code) => {
                return code.Name.toLowerCase().includes(match.toLowerCase()) ||
                    code.Code.toLowerCase().includes(match.toLowerCase()) ||
                    (code.Code.toLowerCase() + ' - ' + code.Name.toLowerCase()).includes(match.toLowerCase());
            });
        }

        return Observable.of(filtered);
    }

    private createForm () {

        const today = moment();

        this.enterTimeForm = this._builder.group({
            project: ['', [Validators.required]],
            system: '',
            phase: '',
            costCode: ['', [Validators.required]],
            employee: '',
            employees: ['', [Validators.required]],
            dates: ['', [Validators.required]],
            standardHours: '',
            overtimeHours: '',
            doubleTimeHours: '',
            timeIn: today.format('h:mm'),
            timeOut: today.format('h:mm'),
            breakIn: today.format('h:mm'),
            breakOut: today.format('h:mm'),
            notes: ''
        });

        this.formChange();
        this.projectChange();
        this.systemChange();
        this.phaseChange();
        this.costCodeChange();
        this.employeeChange();
    }

    private updateTime () {

        this.enterTimeForm.patchValue({

            timeIn: moment(this.enterTimeForm.get('timeIn').value + ' ' + this.timeInPeriod, ['h:mm A']).format('HH:mm'),
            timeOut: moment(this.enterTimeForm.get('timeOut').value + ' ' + this.timeOutPeriod, ['h:mm A']).format('HH:mm'),
            breakIn: moment(this.enterTimeForm.get('breakIn').value + ' ' + this.breakInPeriod, ['h:mm A']).format('HH:mm'),
            breakOut: moment(this.enterTimeForm.get('breakOut').value + ' ' + this.breakOutPeriod, ['h:mm A']).format('HH:mm')
        });
    }

    private clearFormData () {

        this.enterTimeForm.reset();
        this.enterTimeForm.patchValue({
            project: null,
            system: '',
            phase: '',
            costCode: null,
            employee: null,
            employees: [],
            dates: '',
            standardHours: '',
            overtimeHours: '',
            doubleTimeHours: '',
            notes: ''
        });
        this.systems = [];
        this.phases = [];
        this.employees = [];
        this.selectedEmployees = [];
        this.selectedDates = [];
        this._enterTimeManager.clearSelectedDates();
        this.costCodes = [];

        if (this.isUnsupportedTime) {

            this.enterTimeForm.patchValue({

                timeIn: moment().format('h:mm'),
                timeOut: moment().format('h:mm'),
                breakIn: moment().format('h:mm'),
                breakOut: moment().format('h:mm')
            });
        } else {

            this.enterTimeForm.patchValue({

                timeIn: moment().format('HH:mm').toString(),
                timeOut: moment().format('HH:mm').toString(),
                breakIn: moment().format('HH:mm').toString(),
                breakOut: moment().format('HH:mm').toString()
            });
        }
    }

    private timeValidation (control: FormControl, condition: boolean) {

        if (condition) {

            control.setErrors(null);
        } else {

            control.setErrors({'invalid': true});
        }
    }

    // private timeValidation (control: FormControl, standardCondition: boolean, fireFoxCondition: boolean) {
    //
    //     if (this.isUnsupportedTime) {
    //
    //         if (fireFoxCondition) {
    //
    //             control.setErrors(null);
    //         } else {
    //
    //             control.setErrors({'invalid': true});
    //         }
    //     } else {
    //
    //         if (standardCondition) {
    //
    //             control.setErrors(null);
    //         } else {
    //
    //             control.setErrors({'invalid': true});
    //         }
    //     }
    // }

    /******************************************************************************************************************
     * Form Field Change Tracking
     ******************************************************************************************************************/
    formChange () {

        this.enterTimeForm.valueChanges
            .subscribe(
                (value) => {
                    if (this.enterTimeForm.dirty) {

                        this._confirmationService.setNeedsConfirmation(true);
                    }
                });
    }

    projectChange() {
        const projectSelect = this.enterTimeForm.get('project');
        projectSelect.valueChanges.subscribe(
            (project) => {
                // console.log(project);
                this.filteredProjects = this.filterCollection(project, this.projects);
            }
        );
    }

    systemChange() {
        const systemSelect = this.enterTimeForm.get('system');
        systemSelect.valueChanges.subscribe(
            (system: System) => {
                // console.log(system);
                this.filteredSystems = this.filterCollection(system, this.systems);
            }
        );
    }

    phaseChange() {
        const phaseSelect = this.enterTimeForm.get('phase');
        phaseSelect.valueChanges.subscribe(
            (phase: Phase) => {
                // console.log(system);
                this.filteredPhases = this.filterCollection(phase, this.phases);
            }
        );
    }

    costCodeChange() {
        const costCodeSelect = this.enterTimeForm.get('costCode');
        costCodeSelect.valueChanges.subscribe(
            (costCode: CostCode) => {

                if (this.costCodes.length > 0) {

                    this.filteredCostCodes = this.filterProjectCodes(costCode);
                } else {

                    this.filteredCostCodes = this.filterIndirectCodes(costCode);
                }
            }
        );
    }

    employeeChange() {
        const employeeSelect = this.enterTimeForm.get('employee');
        employeeSelect.valueChanges.subscribe(
            (employee: Employee) => {
                // console.log(system);

                if (this.employees.length > 0) {

                    this.filteredEmployees = this.filterEmployees(employee, this.employees);
                } else {

                    this.filteredEmployees = this.filterEmployees(employee, this._tenantEmployees);
                }
            }
        );
    }
}
