import {ChangeDetectorRef, Component, EventEmitter, Injector, Output} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ITimeSelectConfig } from 'ng2-date-picker/time-select/time-select-config.model';
import { IDatePickerConfig } from 'ng2-date-picker';

// Components
import {BaseComponent} from '../../../shared/components/base.component';

// Models
import { Project } from '../../../../models/domain/Project';
import { Employee } from '../../../../models/domain/Employee';
import { CostCode } from '../../../../models/domain/CostCode';
import { System } from '../../../../models/domain/System';
import { Phase } from '../../../../models/domain/Phase';
// import { dependentFieldValidator } from '../../../shared/validators/dependent-field.validator';
// import {DateFlyoutService} from '../../../shared/components/date-flyout/date-flyout.service';
import {EnterTimeManager} from '../enter-time.manager';
import {TimeEntry} from '../models/TimeEntry';
import {TimeEntryMode} from '../models/TimeEntry';
import {DateFlyoutService} from '../../../shared/components/date-flyout/date-flyout.service';

@Component({
    selector: 'esub-enter-time-form',
    templateUrl: './enter-time-form.component.html'
})
export class EnterTimeFormComponent extends BaseComponent {

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
    public timeEntryMode: TimeEntryMode;
    public selectedDates: Array<moment.Moment>;
    public time: TimeEntry;
    public timeEntryModeEnum;

    // Calendar Config
    public dpDatepickerConfig: IDatePickerConfig = {
        allowMultiSelect: true,
        max: moment()
    };
    public dpTimeConfig: ITimeSelectConfig = {
        minutesInterval: 5,
        showTwentyFourHours: false,
        showSeconds: false
    };

    constructor (private _builder: FormBuilder, private _injector: Injector, private _enterTimeManager: EnterTimeManager,
                 private _dateFlyoutService: DateFlyoutService) {

        super(_injector, [
            {
                service: 'ProjectService',
                callback: 'projectServiceCallback'
            },
            {
                service: 'IndirectCostCodesService',
                callback: 'indirectCostCodeServiceCallback'
            },
            {
                service: 'EmployeeService',
                callback: 'employeeServiceCallback'
            }
        ]);

        this.dateFormat = 'MMM. Do, YYYY';
        this.timeEntryMode = TimeEntryMode.Hours;
        this._enterTimeManager.setTimeEntryMode(this.timeEntryMode);
        this.timeEntryModeEnum = TimeEntryMode;
        this.selectedDates = [];
        this.time = new TimeEntry();
        this.systems = [];
        this.phases = [];
        this.createForm();
    }

    /******************************************************************************************************************
     * Lifecycle Methods
     ******************************************************************************************************************/


    /******************************************************************************************************************
     * Callback Handler
     ******************************************************************************************************************/
    projectServiceCallback (projects) {

        this.projects = projects['Value'] as Array<Project>;
        this.mockEntryFlag();
        this._enterTimeManager.setProjects(this.projects);
        // console.log(projects['Value']);
    }

    employeeServiceCallback (employees) {

        this._tenantEmployees = this.concatName(employees['Value'] as Array<Employee>);
        this.employees = this._tenantEmployees;
        this._enterTimeManager.setEmployees(this._tenantEmployees);
    }

    indirectCostCodeServiceCallback (costCodes) {

        // console.log(costCodes);
        this._indirectCodes = this.mapCostCodes(costCodes['Value']) as Array<CostCode>;
        this.costCodes = this._indirectCodes;
        this._enterTimeManager.setIndirectCodes(this._indirectCodes);
    }

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/
    public onDatesChanged (event) {

        if (event.length !== 0) {

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

        const all = [];
        this.employees.forEach(employee => {
            all.push(employee);
        });
        this.enterTimeForm.patchValue({
           employees: all
        });
    }

    public selectNoneEmployees() {
        const none = [];
        this.enterTimeForm.patchValue({
            employees: none
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

    public onFocus (event) {

        this._dateFlyoutService.openDateFlyout();
    }

    public linesToAddCount(): number {
        return this._enterTimeManager.getSelectedDatesCount() * this.enterTimeForm.get('employees').value.length;
    }

    public createLines (enterTimeForm: FormControl) {

        this.timeEntryComplete.emit(true);
        this._enterTimeManager.setLineData(enterTimeForm, this.time);
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

    private mapCostCodes (costCodes: Array<any>) {

        return _.map(costCodes, function(code) {
            return _.extend({}, code, {Name: code.Description});
        });
    }

    private checkDefaultSystem (systems: Array<System>) {

        this.systems = systems;
        if (systems.length === 1) {

            this.enterTimeForm.patchValue({
                system: systems[0]
            });
            this.checkDefaultPhase(systems[0].Phases);
        } else {

            this.phases = [];
        }
    }

    private checkDefaultPhase (phases: Array<Phase>) {

        this.phases = phases;
        if (phases.length === 1) {

            this.enterTimeForm.patchValue({
                phase: phases[0]
            });
        }
    }

    private checkDefaultCostCode (costCodes: Array<CostCode>) {

        this.costCodes = costCodes;
        if (costCodes.length === 1) {

            this.enterTimeForm.patchValue({
                costCode: costCodes[0]
            });
        }
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
        );
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

    private createForm () {

        this.enterTimeForm = this._builder.group({
            project: ['', [Validators.required]],
            system: '',
            phase: '',
            costCode: ['', [Validators.required]],
            employees: ['', [Validators.required]],
            dates: ['', [Validators.required]],
            standardHours: '',
            overtimeHours: '',
            doubleTimeHours: '',
            notes: ''
        });

        this.projectChange();
        this.systemChange();
        this.costCodeChange();
    }

    /******************************************************************************************************************
     * Form Field Change Tracking
     ******************************************************************************************************************/
    projectChange() {
        const projectSelect = this.enterTimeForm.get('project');
        projectSelect.valueChanges.subscribe(
            (project: Project) => {

                if (project['timeEntryMethod'] === 'timeInTimeOut') {

                    this.timeEntryMode = TimeEntryMode.TimeInTimeOut;
                } else {

                    // Need this condition if project is changed to one with TimeInTimeOut
                    this.timeEntryMode = TimeEntryMode.Hours;
                }
                this._enterTimeManager.setTimeEntryMode(this.timeEntryMode);

                this.checkDefaultSystem(project.Systems);
                this.checkDefaultCostCode(project.CostCodes);
                this.filterEmployees(project.Id);

                const costCodeSelect = this.enterTimeForm.get('costCode');
                costCodeSelect.clearValidators();
                costCodeSelect.setErrors(null);
            }
        );
    }

    systemChange() {
        const systemSelect = this.enterTimeForm.get('system');
        systemSelect.valueChanges.subscribe(
            (system: System) => {
                this.checkDefaultPhase(system.Phases);
            }
        );
    }

    costCodeChange() {
        const costCodeSelect = this.enterTimeForm.get('costCode');
        costCodeSelect.valueChanges.subscribe(
            (costCode: CostCode) => {
                const projectSelect = this.enterTimeForm.get('project');
                projectSelect.clearValidators();
                projectSelect.setErrors(null);
            }
        );
    }
}
