import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Subject } from 'rxjs/Subject';

import { CostCode } from '../../../models/domain/CostCode';
import { Project } from '../../../models/domain/Project';
import { Employee } from '../../../models/domain/Employee';

@Injectable()
export class EnterTimeManager {

    // Private
    private _timeRecords = new Subject();
    private _groupBy = 'Date';
    private _indirectCodes: Array<CostCode>;
    private _projects: Array<Project>;
    private _employees: Array<Employee>;
    private _selectedDates: Array<moment.Moment>;

    constructor () {

        this._selectedDates = new Array<moment.Moment>();
    }

    get timeRecords$ () {

        return this._timeRecords.asObservable();
    }

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/
    public loadIndirectCodes (codes: Array<CostCode>) {

        this._indirectCodes = _.cloneDeep(codes);
        console.log('EnterTimeManager loadIndirectCodes', this._indirectCodes);
    }

    public loadProjects (projects: Array<Project>) {

        this._projects = _.cloneDeep(projects);
        console.log('EnterTimeManager loadProjects', this._projects);
    }

    public loadEmployees (employees: Array<Employee>) {

        this._employees = _.cloneDeep(employees);
        console.log('EnterTimeManager loadEmployees', this._employees);
    }

    public getSelectedDatesCount () {

        return this._selectedDates.length;
    }

    public setSelectedDates (dates: Array<moment.Moment>) {

        this._selectedDates = dates;
    }

    public filterEmployees (projectId: string): Array<Employee> {

        return _.filter(this._employees, function (employee) {
            return employee.ProjectIds.includes(projectId);
        });
    }

    public processLines (formData) {

        console.log(formData);
        console.log(this._selectedDates);
        // Convert records to Lines to Submit

        // Build collection of dropdown contents?

        // Group timecards

        // Clear Private Property values

    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

}
