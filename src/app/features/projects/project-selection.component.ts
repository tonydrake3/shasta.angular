import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../shared/components/base.component';

import { Project } from '../../models/domain/Project';
import { routeName } from '../../models/configuration/routeName';
import {statusMap, StatusMap} from '../../models/configuration/statusMap';
import * as _ from 'lodash';
import {SortColumn} from '../../models/configuration/sortColumns';
import {projectSortColumns} from '../../models/configuration/sortColumns';
import {ProjectSelectionService} from './project-selection.service';


@Component({
    styles: [],
    templateUrl: './project-selection.component.html'
})
export class ProjectSelectionComponent extends BaseComponent implements OnInit, OnDestroy {

    _statuses;
    _sortColumns: Array<SortColumn>;
    _filterSubscription;

    filteredProjects: Project[];

    constructor (protected injector: Injector, private _router: Router, private _projectSelection: ProjectSelectionService) {

        super(injector, [
            {
                service: 'MockProjectService',
                callback: 'projectServiceCallback'
            }
        ]);

        console.log('ProjectSelectionComponent Ctor', this._projectSelection);
    }

    ngOnInit () {

        this._filterSubscription = this._projectSelection.filteredProjects$
            .subscribe(
                (projects) => {

                    // console.log('ProjectSelectionComponent OnInit filteredProjects$', projects);
                    this.filteredProjects = <Project[]> projects;
                },
                (error) => {

                    console.log(error);
                });
    }

    ngOnDestroy () {

        this._filterSubscription.unsubscribe();
    }

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/

    selectStatusFilter (selStatus: StatusMap) {

        this._projectSelection.setStatusFilter(selStatus);
    }

    sortProjects (column: SortColumn) {

        this._sortColumns.forEach((col) => {

            if (col.Key === column.Key) {

                if (column.IsSelected) {

                    col.IsDescending = !col.IsDescending;
                }
                col.IsSelected = true;
                this._projectSelection.setSortColumn(col);

            } else {

                col.IsSelected = false;
            }
        });
    }

    createProject () {

        this._router.navigate([routeName.project, 'create']);
    }

    /******************************************************************************************************************
     * Callback Handler
     ******************************************************************************************************************/

    projectServiceCallback(projects) {

        // console.log('MockProjectService Callback', this._projectSelection);

        this._sortColumns = _.orderBy(projectSortColumns, ['Ordinal'], ['asc']);

        this._statuses = _.filter(statusMap, function (status) {
            return status.CanDisplay;
        });

        this._projectSelection.init(<Project[]> projects['Value'], this._sortColumns[0]);
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/
}
