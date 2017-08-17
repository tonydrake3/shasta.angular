import {AfterViewInit, Component, Injector, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ITimeSelectConfig } from 'ng2-date-picker/time-select/time-select-config.model';
import {DatePickerComponent, IDatePickerConfig} from 'ng2-date-picker';

// Components
import {BaseComponent} from '../../../shared/components/base.component';

// Models
import { Project } from '../../../../models/domain/Project';
import { Employee } from '../../../../models/domain/Employee';
import { CostCode } from '../../../../models/domain/CostCode';
import { System } from '../../../../models/domain/System';
import { Phase } from '../../../../models/domain/Phase';
import { LinesToAdd } from '../models/LinesToAdd';
import { dependentFieldValidator } from '../../../shared/validators/dependent-field.validator';

@Component({
    selector: 'esub-enter-time-form',
    templateUrl: './enter-time-form.component.html'
})
export class EnterTimeFormComponent extends BaseComponent implements AfterViewInit {

    // Public
    public enterTimeForm: FormGroup;
    public linesToAdd: LinesToAdd;
    public projects: Array<Project>;
    public costCodes: Array<CostCode>;
    public employees: Array<Employee>;
    public systems: Array<System>;
    public phases: Array<Phase>;

    // Private
    private _tenantEmployees: Array<Employee>;
    private _indirectCodes: Array<CostCode>;

    // Calendar Config
    public dpCalendarConfig: IDatePickerConfig = {
        allowMultiSelect: true,
        max: moment()
    };
    public dpTimeConfig: ITimeSelectConfig = {
        minutesInterval: 5,
        showTwentyFourHours: false,
        showSeconds: false
    };

    @ViewChild('dayPicker') dayPicker: DatePickerComponent;

    constructor (private _builder: FormBuilder, private _injector: Injector) {

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

        this.initLinesToAdd();
        this.systems = [];
        this.phases = [];
        this.createForm();
    }

    /******************************************************************************************************************
     * Lifecycle Methods
     ******************************************************************************************************************/

    ngAfterViewInit () {

        // console.log(this.mdSelect);
        // console.log(this.dayPicker);
    }

    /******************************************************************************************************************
     * Callback Handler
     ******************************************************************************************************************/
    projectServiceCallback (projects) {

        this.projects = projects['Value'] as Array<Project>;
        this.mockEntryFlag();
        // console.log(projects['Value']);
    }

    employeeServiceCallback (employees) {

        this._tenantEmployees = this.concatName(employees['Value']);
        this.employees = this._tenantEmployees;
    }

    indirectCostCodeServiceCallback (costCodes) {

        // console.log(costCodes);
        this._indirectCodes = this.mapCostCodes(costCodes['Value']) as Array<CostCode>;
        this.costCodes = this._indirectCodes;
    }


    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/
    public selectAllEmployees() {

        let all = [];
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

    public removeDate(removeDate: moment.Moment) {
        let indexToRemove: number;
        this.linesToAdd.selectedDates.forEach((date, idx) => {
            if (date.isSame(removeDate)) {
                indexToRemove = idx;
            }
        });

        if (indexToRemove != null) {
            const clone = _.cloneDeep(this.linesToAdd.selectedDates).splice(indexToRemove--, 1);
            this.linesToAdd.selectedDates = clone;
            // TODO UI won't update but developer has resolved this issue, should resolve itself once merged and updated on npm
            //    see commit associated with https://github.com/vlio20/angular-datepicker/issues/127
        }
    }

    public linesToAddCount(): number {
        return this.linesToAdd.selectedDates.length * this.linesToAdd.employees.length;
    }

    public createLines (enterTimeForm: FormControl) {

    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/
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

    private mapCostCodes (costCodes: Array<any>) {

        return _.map(costCodes, function(code) {
            return _.extend({}, code, {Name: code.Description});
        });
    }

    private checkDefaultSystem (systems: Array<System>) {

        this.systems = systems;
        if (systems.length === 1) {

            this.linesToAdd.system = systems[0];
            this.checkDefaultPhase(systems[0].Phases);
        } else {

            this.linesToAdd.phase = null;
            this.phases = [];
        }
    }

    private checkDefaultPhase (phases: Array<Phase>) {

        this.phases = phases;
        if (phases.length === 1) {

            this.linesToAdd.phase = phases[0];
        }
    }

    private checkDefaultCostCode (costCodes: Array<CostCode>) {

        this.costCodes = costCodes;
        if (costCodes.length === 1) {

            this.linesToAdd.costCode = costCodes[0];
        } else {

            this.linesToAdd.costCode = null;
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

    private createForm () {

        this.enterTimeForm = this._builder.group({
            project: ['', [Validators.required]],
            system: '',
            phase: '',
            costCode: ['', [Validators.required]],
            employees: ['', [Validators.required]],
            selectedDates: ['', [Validators.required]],
            standardHours: '',
            overtimeHours: '',
            doubleTimeHours: '',
            notes: ''
        });

        this.projectChange();
        this.systemChange();
        this.costCodeChange();
        // this.employeeChange();
    }

    /******************************************************************************************************************
     * Form Field Change Tracking
     ******************************************************************************************************************/
    projectChange() {
        const projectSelect = this.enterTimeForm.get('project');
        projectSelect.valueChanges.forEach(
            (project: Project) => {
                this.linesToAdd.project = project;
                this.linesToAdd.employees = [];

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
        systemSelect.valueChanges.forEach(
            (system: System) => {
                this.checkDefaultPhase(system.Phases);
            }
        );
    }

    costCodeChange() {
        const costCodeSelect = this.enterTimeForm.get('costCode');
        costCodeSelect.valueChanges.forEach(
            (costCode: CostCode) => {
                const projectSelect = this.enterTimeForm.get('project');
                projectSelect.clearValidators();
                projectSelect.setErrors(null);
            }
        );
    }

    employeeChange() {
        const employeeSelect = this.enterTimeForm.get('employees');
        employeeSelect.valueChanges.forEach(
            (employees: Array<Employee>) => {
                console.log('employeeChange', employees);
            }
        );
    }
}
