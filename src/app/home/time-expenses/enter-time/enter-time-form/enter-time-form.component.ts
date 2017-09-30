import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';
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
import {BrowserMode, TimeEntry} from '../models/TimeEntry';
import {TimeEntryMode} from '../models/TimeEntry';
import {DateFlyoutService} from '../../../shared/components/date-flyout/date-flyout.service';
import {Observable} from 'rxjs/Observable';
import {ConfirmationDialogService} from '../../../shared/services/confirmation-dialog.service';
import {EnterTimePreloadManager} from '../enter-time-preload.manager';
import {validateTime, validateTimeWithPeriod} from '../../../shared/validators/time-entry.validator';
import {validateTimeBreakOverlap} from '../../../shared/validators/time-break-overlap.validator';
import {TimeSettings} from '../../../../models/domain/TimeSettings';
import {EnterTimeFormTab, enterTimeTabs} from '../models/EnterTimeMenu';
import {EnterTimeFilterService} from '../enter-time-filter.service';

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
    public timeSettings: TimeSettings;
    public tabs: Array<EnterTimeFormTab>;

    public filteredProjects: Observable<Project[]>;
    public filteredSystems: Observable<System[]>;
    public filteredPhases: Observable<Phase[]>;
    public filteredCostCodes: Observable<CostCode[]>;
    public filteredEmployees: Observable<Employee[]>;

    public selectedEmployees: Array<Employee>;
    public costCodePlaceholder: string;

    public autoProject;
    public autoSystem;
    public autoPhase;
    public autoCostCode;
    public autoEmployee;

    // Calendar Config
    public dpDatepickerConfig: IDatePickerConfig = {
        allowMultiSelect: true,
        max: moment()
    };

    constructor (private _builder: FormBuilder, private _enterTimeManager: EnterTimeManager,
                 private _dateFlyoutService: DateFlyoutService, private _confirmationService: ConfirmationDialogService,
                 private _preloadService: EnterTimePreloadManager, private _filterService: EnterTimeFilterService) {

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
        this.timeSettings = null;
        this.detectBrowser();
        this.createForm();
    }

    /******************************************************************************************************************
     * Lifecycle Methods
     ******************************************************************************************************************/

    ngOnInit () {

        this.projects = this._enterTimeManager.getProjects();
        this._tenantEmployees = this._enterTimeManager.getEmployees();
        this._indirectCodes = this._enterTimeManager.getIndirectCodes();
        this.timeSettings = this._enterTimeManager.getSettings();

        this._preloadService.loading$
            .subscribe(
                (loading) => {

                    if (loading === false) {
                        this.projects = this._enterTimeManager.getProjects();
                        this._tenantEmployees = this._enterTimeManager.getEmployees();
                        this._indirectCodes = this._enterTimeManager.getIndirectCodes();
                        this.timeSettings = this._enterTimeManager.getSettings();
                        this.tabs = this.getTabs();
                    }
                });

        if (this.projects.length === 0 || this._tenantEmployees.length === 0 || this._indirectCodes.length === 0 ||
            _.isNull(this.timeSettings)) {

            this._preloadService.startLoading();
            // this._preloadService.load();
        } else {

            this.tabs = this.getTabs();
        }
    }

    ngOnDestroy () {

    }

    ngAfterViewInit () {

    }

    /******************************************************************************************************************
     * Callback Handler
     ******************************************************************************************************************/


    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/
    public getTabs() {

        if (this.timeSettings.Overridable.IsPunchInPunchOutEnabled) {
            return enterTimeTabs;
        }

        return _.filter(enterTimeTabs, (tab) => {
           return tab.Index !== 1;
        });
    }

    // TODO: Refactor to include settings as properties in tab object
    public selectTab(event) {

        // console.log(event);
        switch (event.tab.textLabel.toLowerCase()) {
            case 'enter hours':
                this.isProjectCostEntry = true;
                this.isTimeIn = false;
                this.costCodePlaceholder = 'Cost Code';
                this._enterTimeManager.setTimeEntryMode(TimeEntryMode.Hours);
                this.clearForm();
                break;
            case 'enter time in/time out':
                this.isProjectCostEntry = true;
                this.isTimeIn = true;
                this.costCodePlaceholder = 'Cost Code';
                this._enterTimeManager.setTimeEntryMode(TimeEntryMode.TimeInTimeOut);
                this.clearForm();
                break;
            case 'enter indirect costs':
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

            this.filteredProjects = this._filterService.filterCollection(projectSelect.value, this.projects);
        } else {

            this.filteredProjects = Observable.of(this.projects);
        }
    }

    public openSystems () {

        const systemSelect = this.enterTimeForm.get('system');

        if (this.systems) {

            this.filteredSystems = this._filterService.filterCollection(systemSelect.value, this.systems);
        } else {

            this.filteredSystems = Observable.of(this.systems);
        }
    }

    public openPhases () {

        // const systemSelect = this.enterTimeForm.get('system');
        const phaseSelect = this.enterTimeForm.get('phase');

        if (phaseSelect.value) {

            this.filteredPhases = this._filterService.filterCollection(phaseSelect.value, this.phases);
        } else {

            this.filteredPhases = Observable.of(this.phases);
        }
    }

    public openCostCodes () {

        const costCodeSelect = this.enterTimeForm.get('costCode');
        const projectSelect = this.enterTimeForm.get('project');

        if (this.costCodes.length > 0) {

            if (costCodeSelect.value) {

                this.filteredCostCodes = this._filterService.filterProjectCodes(costCodeSelect.value, projectSelect.value);
            } else {

                this.filteredCostCodes = Observable.of(this.costCodes);
            }
        } else {

            if (costCodeSelect.value) {

                this.filteredCostCodes = this._filterService.filterIndirectCodes(costCodeSelect.value, this._indirectCodes);
            } else {

                this.filteredCostCodes = Observable.of(this._indirectCodes);
            }
        }
    }

    public openEmployee () {

        const employeeSelect = this.enterTimeForm.get('employee');

        if (employeeSelect.value) {

            if (this.employees.length > 0) {

                this.filteredEmployees = this._filterService.filterEmployees(employeeSelect.value, this.employees,
                    this.selectedEmployees);
            } else {

                this.filteredEmployees = this._filterService.filterEmployees(employeeSelect.value, this._tenantEmployees,
                    this.selectedEmployees);
            }
        } else {

            if (this.employees.length > 0) {

                if (this.selectedEmployees.length > 0) {

                    this.filteredEmployees = this._filterService.filterEmployees('', this.employees, this.selectedEmployees);
                } else {

                    this.filteredEmployees = Observable.of(this.employees);
                }

            } else {

                // console.log('openEmployee', this._tenantEmployees);
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
        this.selectedEmployees = [];

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

        this._filterService.removeFromCollection(employee, collection);
    }

    public onTimeInChange (event) {

        this.enterTimeForm.get('timeEntry').get('time').get('inValue').setValue(event);
    }

    public onTimeInPeriodChange (event) {

        this.enterTimeForm.get('timeEntry').get('time').get('inPeriod').setValue(event);
    }

    public onTimeOutChange (event) {

        this.enterTimeForm.get('timeEntry').get('time').get('outValue').setValue(event);
    }

    public onTimeOutPeriodChange (event) {

        this.enterTimeForm.get('timeEntry').get('time').get('outPeriod').setValue(event);
    }

    public onBreakInChange (event) {

        this.enterTimeForm.get('timeEntry').get('break').get('inValue').setValue(event);
    }

    public onBreakInPeriodChange (event) {

        this.enterTimeForm.get('timeEntry').get('break').get('inPeriod').setValue(event);
    }

    public onBreakOutChange (event) {

        this.enterTimeForm.get('timeEntry').get('break').get('outValue').setValue(event);
    }

    public onBreakOutPeriodChange (event) {

        this.enterTimeForm.get('timeEntry').get('break').get('outPeriod').setValue(event);
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
    private detectBrowser () {

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

        this._enterTimeManager.setBrowserMode(new BrowserMode(this.isUnsupportedTime, this.isIE));
    }

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

    private createForm () {

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
            timeEntry: this._builder.group(this.buildTimeEntryFormGroup(),
                {validator: validateTimeBreakOverlap('in', 'out', 'in', 'out')}),
            notes: ''
        });

        this.formChange();
        this.projectChange();
        this.systemChange();
        this.phaseChange();
        this.costCodeChange();
        this.employeeChange();
    }

    private buildTimeEntryFormGroup () {

        if (this.isUnsupportedTime) {

            return {

                time: this._builder.group(this.buildTimeDetailFormGroup(),
                    {validator: validateTimeWithPeriod('in', 'out', 'startAfterEnd')}),
                break: this._builder.group(this.buildTimeDetailFormGroup(),
                    {validator: validateTimeWithPeriod('in', 'out', 'breakStartAfterEnd')})
            };
        }
        return {

            time: this._builder.group(this.buildTimeDetailFormGroup(),
                {validator: validateTime('in', 'out', 'startAfterEnd')}),
            break: this._builder.group(this.buildTimeDetailFormGroup(),
                {validator: validateTime('in', 'out', 'breakStartAfterEnd')})
        };
    }

    private buildTimeDetailFormGroup () {

        if (this.isUnsupportedTime) {

            return {

                inValue: '',
                inPeriod: '',
                in: '',
                outValue: '',
                outPeriod: '',
                out: ''
            };
        }
        return {

            in: '',
            out: ''
        };
    }

    private updateTime () {

        const timeCtrl = this.enterTimeForm.get('timeEntry').get('time');
        const breakCtrl = this.enterTimeForm.get('timeEntry').get('break');

        timeCtrl.get('in').setValue(moment(timeCtrl.get('inValue').value + ' ' + timeCtrl.get('inPeriod').value, ['h:mm A'])
            .format('HH:mm'));
        timeCtrl.get('out').setValue(moment(timeCtrl.get('outValue').value + ' ' + timeCtrl.get('outPeriod').value, ['h:mm A'])
            .format('HH:mm'));

        breakCtrl.get('in').setValue(moment(breakCtrl.get('inValue').value + ' ' + breakCtrl.get('inPeriod').value, ['h:mm A'])
            .format('HH:mm'));
        breakCtrl.get('out').setValue(moment(breakCtrl.get('outValue').value + ' ' + breakCtrl.get('outPeriod').value, ['h:mm A'])
            .format('HH:mm'));
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
            timeEntry: this._builder.group(this.buildTimeEntryFormGroup(),
                {validator: validateTimeBreakOverlap('in', 'out', 'in', 'out')}),
            notes: ''
        });
        this.systems = [];
        this.phases = [];
        this.employees = [];
        this.selectedEmployees = [];
        this.selectedDates = [];
        this._enterTimeManager.clearSelectedDates();
        this.costCodes = [];
    }

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
                this.filteredProjects = this._filterService.filterCollection(project, this.projects);
            }
        );
    }

    systemChange() {
        const systemSelect = this.enterTimeForm.get('system');
        systemSelect.valueChanges.subscribe(
            (system: System) => {
                // console.log(system);
                this.filteredSystems = this._filterService.filterCollection(system, this.systems);
            }
        );
    }

    phaseChange() {
        const phaseSelect = this.enterTimeForm.get('phase');
        phaseSelect.valueChanges.subscribe(
            (phase: Phase) => {
                // console.log(system);
                this.filteredPhases = this._filterService.filterCollection(phase, this.phases);
            }
        );
    }

    costCodeChange() {
        const costCodeSelect = this.enterTimeForm.get('costCode');
        costCodeSelect.valueChanges.subscribe(
            (costCode: CostCode) => {

                if (this.costCodes.length > 0) {

                    const projectSelect = this.enterTimeForm.get('project');
                    this.filteredCostCodes = this._filterService.filterProjectCodes(costCode, projectSelect.value);
                } else {

                    this.filteredCostCodes = this._filterService.filterIndirectCodes(costCode, this._indirectCodes);
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

                    this.filteredEmployees = this._filterService.filterEmployees(employee, this.employees,
                        this.selectedEmployees);
                } else {

                    this.filteredEmployees = this._filterService.filterEmployees(employee, this._tenantEmployees,
                        this.selectedEmployees);
                }
            }
        );
    }
}
