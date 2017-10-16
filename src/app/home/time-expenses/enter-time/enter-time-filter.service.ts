import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

import {Employee} from '../../../models/domain/Employee';
import {CostCode} from '../../../models/domain/CostCode';
import {Project} from '../../../models/domain/Project';

@Injectable()
export class EnterTimeFilterService {

    constructor () {}

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

    public filterEmployees (match, employeeList: Array<Employee>, selectedEmployees?: Array<Employee>): Observable<Array<any>> {

        let filtered = [];

        if (typeof match === 'string') {

            filtered = _.filter(employeeList, (employee) => {
                return employee.Name.toLowerCase().includes(match.toLowerCase()) ||
                    employee.Number.toLowerCase().includes(match.toLowerCase()) ||
                    (employee.Number.toLowerCase() + ' - ' + employee.Name.toLowerCase()).includes(match.toLowerCase());
            });

            if (selectedEmployees && selectedEmployees.length > 0) {

                _.forEach(selectedEmployees, (employee) => {
                    this.removeFromCollection(employee, filtered);
                });
            }
        }

        return Observable.of(filtered);
    }

    public filterIndirectCodes (match, indirectCodes: Array<CostCode>): Observable<CostCode[]> {

        // console.log('filterIndirectCodes', match, this._indirectCodes);
        let filtered = [];

        if (typeof match === 'string') {

            filtered = _.filter(indirectCodes, (code) => {
                return code.Name.toLowerCase().includes(match.toLowerCase()) ||
                    code.Code.toLowerCase().includes(match.toLowerCase()) ||
                    (code.Code.toLowerCase() + ' - ' + code.Name.toLowerCase()).includes(match.toLowerCase());
            });
        }

        return Observable.of(filtered);
    }

    public filterProjectCodes (match, project: Project): Observable<CostCode[]> {

        // console.log('filterProjectCodes', match);
        let filtered = [];
        // const projectSelect = this.enterTimeForm.get('project');
        // console.log('filterProjectCodes', projectSelect.value);

        if (project && project.CostCodes && typeof match === 'string') {

            filtered = _.filter(project.CostCodes, (code) => {
                return code.Name.toLowerCase().includes(match.toLowerCase()) ||
                    code.Code.toLowerCase().includes(match.toLowerCase()) ||
                    (code.Code.toLowerCase() + ' - ' + code.Name.toLowerCase()).includes(match.toLowerCase());
            });
        }

        return Observable.of(filtered);
    }

    public filterByKeyValuePair<T>(collection: Array<T>, dictionary: any): Observable<T[]> {
        let filtered = [];

        filtered = _.filter(collection, (item) => {

            for (const key of Object.keys(dictionary)) {
                console.log('the key is ' + key + ' and the value is ' + item[key]);
                console.log('does ' + item[key] + ' include ' + dictionary[key]);
                if (item[key] && item[key].includes(dictionary[key])) { return true }
            }

            return false;
        });

        return Observable.of(filtered);
    }

    public filterCollection<T>(collection: Array<T>, value: string, withPropertyKeys: string[] = ['Name', 'Number']): Observable<T[]> {
        let filteredCollection: Observable<T[]>;

        if (value) {
            const dictionary = withPropertyKeys.reduce((previous, current) => {
                return previous[current] = value;
            });
            filteredCollection = this.filterByKeyValuePair(collection, dictionary);

        } else {

            filteredCollection = Observable.of(collection);

        }
        return filteredCollection
    }
}
