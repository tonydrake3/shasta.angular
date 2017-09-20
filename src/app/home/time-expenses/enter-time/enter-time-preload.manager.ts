import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {Subject} from 'rxjs/Subject';

import {EmployeeService} from '../../shared/services/user/employee.service';
import {IndirectCostCodesService} from '../../shared/services/indirect-cost-codes.service';
import {ProjectService} from '../../shared/services/project.service';
import {Project} from '../../../models/domain/Project';
import {CostCode} from '../../../models/domain/CostCode';
import {EnterTimeManager} from './enter-time.manager';
import {Employee} from '../../../models/domain/Employee';
import {TimeSettingsService} from '../../shared/services/time-settings.service';


@Injectable()
export class EnterTimePreloadManager {

    private _loading: Subject<boolean>;
    private _isProjectLoadingComplete: boolean;
    private _isEmployeeLoadingComplete: boolean;
    private _isIndirectCodeLoadingComplete: boolean;
    private _isTimeSettingsLoadingComplete: boolean;

    constructor (private _projectService: ProjectService, private _indirectCostsService: IndirectCostCodesService,
                 private _employeeService: EmployeeService, private _enterTimeManager: EnterTimeManager,
                 private _timeSettingsService: TimeSettingsService) {

        this._isProjectLoadingComplete = false;
        this._isEmployeeLoadingComplete = false;
        this._isTimeSettingsLoadingComplete = false;
        this._isIndirectCodeLoadingComplete = false;

        this._loading = new Subject<boolean>();
        this._loading.next(true);

        this._projectService.projects$
            .subscribe(
                (result) => {
                    // console.log('EnterTimePreloadManager projects$', result);
                    const projects = result['Value'] as Array<Project>;
                    this._enterTimeManager.setProjects(projects);
                    this._isProjectLoadingComplete = true;
                    this.trackLoadingState();
                }
            );

        this._indirectCostsService.indirectCostCodes$
            .subscribe(
                (result) => {
                    // console.log('EnterTimePreloadManager indirectCostCodes$', result);
                    const costCodes = this.mapCostCodes(result['Value']) as Array<CostCode>;
                    this._enterTimeManager.setIndirectCodes(costCodes);
                    this._isIndirectCodeLoadingComplete = true;
                    this.trackLoadingState();
                }
            );

        this._employeeService.employees$
            .subscribe(
                (result) => {
                    const employees = this.concatName(result['Value'] as Array<Employee>);
                    // console.log('EnterTimePreloadManager employees$', employees);
                    this._enterTimeManager.setEmployees(employees);
                    this._isEmployeeLoadingComplete = true;
                    this.trackLoadingState();
                }
            );

        this._timeSettingsService.timeSettings$
            .subscribe(
                (result) => {
                    const timeSettings = this.concatName(result['Value'] as Array<Employee>);
                    // console.log('EnterTimePreloadManager employees$', employees);
                    this._enterTimeManager.setSettings(timeSettings);
                    this._isTimeSettingsLoadingComplete = true;
                    this.trackLoadingState();
                }
            );
    }

    get loading$ () {

        return this._loading.asObservable();
    }

    public startLoading () {

        this._loading.next(true);
        this.load();
    }

    public load () {

        this._projectService.getLatest();
        this._employeeService.getLatest();
        this._indirectCostsService.getLatest();
    }

    private trackLoadingState () {

        if (this._isProjectLoadingComplete && this._isEmployeeLoadingComplete && this._isIndirectCodeLoadingComplete &&
            this._isTimeSettingsLoadingComplete) {

            // console.log('trackLoadingState');
            this._loading.next(false);
        }
    }

    private mapCostCodes (costCodes: Array<any>) {

        return _.map(costCodes, function(code) {
            return {
                Id: code.Id,
                Name: code.Description,
                Code: code.Description
            };
        });
    }

    private concatName (employees: Array<Employee>) {

        return _.map(employees, function(employee) {
            return _.extend({}, employee, {Name: employee.FirstName + ' ' + employee.LastName});
        });
    }
}
