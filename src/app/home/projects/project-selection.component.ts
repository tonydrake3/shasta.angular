import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../shared/components/base.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { Project } from '../../models/domain/Project';
import { statusMap, StatusMap } from '../shared/map/status.map';
import { SortColumn } from '../shared/configuration/sort-column.configuration';
import { projectSortColumns } from '../shared/configuration/sort-column.configuration';
import { ProjectSelectionManager } from './project-selection.manager';
import { ProjectService } from '../shared/services/project.service';
import { routeName } from '../shared/configuration/web-route-names.configuration';


@Component({
    styles: [],
    templateUrl: './project-selection.component.html'
})
export class ProjectSelectionComponent extends BaseComponent implements OnInit, OnDestroy {

    // Private
    private _filterSubscription;
    private _filterField;
    private _projects;

    // Public
    public statuses;
    public sortColumns: Array<SortColumn>;
    public filterForm: FormGroup;
    public filteredProjects: Project[];
    public filterText = '';

    constructor (protected injector: Injector, private _builder: FormBuilder, private _router: Router,
                 private _projectSelection: ProjectSelectionManager) {

        super(injector, [
            {
                service: 'ProjectService',
                callback: 'projectServiceCallback'
            }
        ]);

        this._projects = super.getServiceRef('ProjectService') as ProjectService;
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

                    console.log('ProjectSelectionComponent OnInit filteredProjects$', projects);
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

        this.sortColumns.forEach((col) => {

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
        this._projectSelection.setTextFilter(this._filterField.value);
        this._projects.getFiltered(this._filterField.value);
    }

    /******************************************************************************************************************
     * Callback Handler
     ******************************************************************************************************************/

    projectServiceCallback(projects) {

        // console.log('ProjectService Callback', <Project[]> projects['Value']);
        this.sortColumns = _.orderBy(projectSortColumns, ['Ordinal'], ['asc']);

        this.statuses = this._projectSelection.getStatusFilters();
        this.reloadColumns(this._projectSelection.getSortColumn());

        this._projectSelection.init(<Project[]> projects['Value']);

        const textFilter = this._projectSelection.getTextFilter();

        if (textFilter) {

            this.filterForm.setValue({

               filter: textFilter
            });
            this.filterText = textFilter;
        }
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

    createForm () {

        this.filterForm = this._builder.group({

            filter: ['']
        })
    }

    reloadColumns (sortCol: SortColumn) {

        this.sortColumns.forEach((column) => {

            if (sortCol.Key === column.Key) {

                column.IsDescending = sortCol.IsDescending;
                column.IsSelected = sortCol.IsSelected;
            }
        });
    }
}
