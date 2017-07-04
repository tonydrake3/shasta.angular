import {Component, Injector, OnDestroy, OnInit, ReflectiveInjector, ViewChild} from '@angular/core';
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
export class ProjectSelectionComponent extends BaseComponent implements OnInit {

    _statuses;
    _projects: Project[];
    _sortColumns: Array<SortColumn>;
    _filterSubscription;

    filteredProjects: Project[];
    selectedSort: SortColumn;

    constructor (protected injector: Injector, private _router: Router, private _projectSelection: ProjectSelectionService) {

        super(injector, [
            {
                service: 'MockProjectService',
                callback: 'projectServiceCallback'
            }
        ]);

        // super.inject([
        //     {
        //         toInject: ProjectSelectionService,
        //         subject: 'filteredProjects$',
        //         initializer: 'init',
        //         callback: 'callback'
        //     }
        // ]);
    }

    ngOnInit () {

        console.log('ProjectSelectionComponent OnInit', this._projectSelection);

        // this._filterSubscription = this._selectService.filteredProjects$
        //     .subscribe(
        //         (projects) => {
        //
        //             console.log('ProjectSelectionComponent OnInit SelectionService', projects);
        //             this.filteredProjects = <Project[]> projects;
        //         },
        //         (error) => {
        //
        //             console.log('ProjectSelectionComponent OnInit Error', error);
        //         }
        //     );
    }
    //
    // ngOnDestroy () {
    //
    //     this._filterSubscription.unsubscribe();
    // }

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/

    selectStatusFilter (selStatus: StatusMap) {

        this._statuses.forEach((status) => {

            if (status.Key === selStatus.Key) {

                status.IsFiltered = !status.IsFiltered;
            }
        });
        // this.filter();
    }

    sortProjects (column: SortColumn) {

        this._sortColumns.forEach((col) => {

            if (col.Key === column.Key) {

                if (column.IsSelected) {

                    col.IsDescending = !col.IsDescending;
                }
                col.IsSelected = true;

            } else {

                col.IsSelected = false;
            }
        });
    }

    createProject () {
        this._router.navigate([routeName.project, 'create']);
    }

    /*****************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

    projectServiceCallback(projects) {

        console.log('Project Selection Service Callback', this._projectSelection);

        // const injector = ReflectiveInjector.resolveAndCreate([ProjectSelectionService]);
        // const projectSelection = injector.get(ProjectSelectionService);

        // console.log('Project Selection Service Callback', projectSelection);

        this._sortColumns = _.orderBy(projectSortColumns, ['Ordinal'], ['asc']);

        // this._projectSelection.init(<Project[]> projects, this._sortColumns[0]);
        //
        // this._statuses = _.filter(statusMap, function (status) {
        //     return status.CanDisplay;
        // });
        //
        // this._projects = projects['Value'];
        //
        //
        // this.selectedSort = this._sortColumns[0];

        // this._selectService.filterProjects();
        // this.filter();
    }

    callback() {

    }

    // private filterProject (status: StatusMap) {
    //
    //     return _.filter(this._projects, function (proj) {
    //
    //         return proj.Status === status.Key;
    //     });
    // }

    // private filter () {
    //
    //     this.filteredProjects = new Array<Project>();
    //
    //     this._statuses.forEach((map) => {
    //
    //         if (map.IsFiltered) {
    //
    //             this.filteredProjects = _.concat(this.filteredProjects, this.filterProject(map));
    //         }
    //     });
    //     this.sort();
    // }
    //
    // private sort () {
    //
    //     this.filteredProjects = _.orderBy(this.filteredProjects, [this.selectedSort.Key], ['asc']);
    // }
    //
    // private  getCurrentSort (selSort) {
    //
    //     // Find position in list
    //     const index = _.findIndex(this._sortColumns, function (col) {
    //
    //         return col.Key === selSort.Key;
    //     });
    //
    //     // Get next from list or wrap to beginning
    //     if (index === this._sortColumns.length - 1) {
    //
    //         this.selectedSort = this._sortColumns[0];
    //         this.selectedSort.IsSelected = true;
    //     } else {
    //
    //         this.selectedSort = this._sortColumns[index + 1];
    //         this.selectedSort.IsSelected = true;
    //     }
    // }
}
