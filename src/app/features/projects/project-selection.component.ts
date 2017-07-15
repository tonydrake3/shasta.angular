import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../shared/components/base.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as _ from 'lodash';

import { Project } from '../../models/domain/Project';
import { routeName } from '../../models/configuration/routeName';
import {statusMap, StatusMap} from '../../models/configuration/statusMap';
import {SortColumn} from '../../models/configuration/sortColumns';
import {projectSortColumns} from '../../models/configuration/sortColumns';
import {ProjectSelectionManager} from './project-selection.manager';
import {ProjectService} from './project.service';

@Component({
    styles: [],
    templateUrl: './project-selection.component.html'
})
export class ProjectSelectionComponent extends BaseComponent implements OnInit, OnDestroy {

    // Private
    private _statuses;
    private _sortColumns: Array<SortColumn>;
    private _filterSubscription;
    private _filterField;

    // Public
    filterForm: FormGroup;
    filteredProjects: Project[];
    filterText = '';

    constructor (protected injector: Injector, private _builder: FormBuilder, private _router: Router,
                 private _projectSelection: ProjectSelectionManager, private _projects: ProjectService) {

        super(injector, [
            {
                service: 'ProjectService',
                callback: 'projectServiceCallback'
            }
        ]);

        this.createForm();
        this._filterField = this.filterForm.get('filter');
        // console.log('ProjectSelectionComponent Ctor', this._projectSelection);
    }

    /******************************************************************************************************************
     * Lifecycle Methods
     ******************************************************************************************************************/

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

        super.ngOnDestroy();
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

    filterProjects () {

        // console.log('ProjectSelectionComponent filterProjects');
        this.filterText = this._filterField.value;
        this._projects.getFiltered(this._filterField.value);
    }

    /******************************************************************************************************************
     * Callback Handler
     ******************************************************************************************************************/

    projectServiceCallback(projects) {

        // console.log('ProjectService Callback');
        this._sortColumns = _.orderBy(projectSortColumns, ['Ordinal'], ['asc']);

        this._statuses = _.filter(statusMap, function (status) {
            return status.CanDisplay;
        });

        this._projectSelection.init(<Project[]> projects['Value'], this._sortColumns[0]);
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

    createForm () {

        this.filterForm = this._builder.group({

            filter: ['']
        })
    }
}
