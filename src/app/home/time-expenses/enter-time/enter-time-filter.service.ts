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

    public filterCollection (match, collection: Array<any>): Observable<Array<any>> {

        let filtered = [];

        if (typeof match === 'string') {

            filtered = _.filter(collection, (item) => {
                return item.Name && item.Number &&
                    (item.Name.toLowerCase().includes(match.toLowerCase()) ||
                        item.Number.toLowerCase().includes(match.toLowerCase()) ||
                        (item.Number.toLowerCase() + ' - ' + item.Name.toLowerCase()).includes(match.toLowerCase()));
            });
        }

        return Observable.of(filtered);
    }

    public filterEmployees (match, employeeList: Array<Employee>, selectedEmployees?: Array<Employee>): Observable<Array<any>> {

        let filtered = [];

        if (typeof match === 'string') {

            filtered = _.filter(employeeList, (employee) => {
                return employee.Name.toLowerCase().includes(match.toLowerCase()) ||
                    (employee.Number && employee.Number.toLowerCase().includes(match.toLowerCase())) ||
                    (employee.Number &&
                    (employee.Number.toLowerCase() + ' - ' + employee.Name.toLowerCase()).includes(match.toLowerCase()));
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

        let filtered = [];

        if (project && project.CostCodes && typeof match === 'string') {

            filtered = _.filter(project.CostCodes, (code) => {
                return code.Name.toLowerCase().includes(match.toLowerCase()) ||
                    code.Code.toLowerCase().includes(match.toLowerCase()) ||
                    (code.Code.toLowerCase() + ' - ' + code.Name.toLowerCase()).includes(match.toLowerCase());
            });
        }

        return Observable.of(filtered);
    }

    public filterByKeyValuePair<T>(collection: Array<T>, dictionary: any): T[] {
        let filtered = [];

        filtered = _.filter(collection, (item) => {

            for (const key of Object.keys(dictionary)) {

             if (item[key] && item[key].includes(dictionary[key])) { return true }

            }

            return false;
        });

        return filtered;
    }

    public filterCollectionByKey<T>(collection: Array<T>, value: string, withPropertyKeys: string[] = ['Name', 'Number']): T[] {
        let filteredCollection: T[];

        if (value) {
            const dictionary = withPropertyKeys.reduce((previous, current) => {
                previous[current] = value;
                return previous;
            }, {});
            filteredCollection = this.filterByKeyValuePair(collection, dictionary);

        } else {

            filteredCollection = collection;

        }
        return filteredCollection
    }
}
