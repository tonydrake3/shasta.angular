import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Project} from 'app/models/domain/Project';
import {Subject} from 'rxjs/Subject';
import {StatusMap, statusMap} from '../../models/configuration/statusMap';
import {SortColumn} from '../../models/configuration/sortColumns';
import * as _ from 'lodash';

@Injectable()
export class ProjectSelectionManager {

    private _projects: Project[];
    private _processedProjects;
    private _filteredRecords = new Subject();
    private _filterText: string;
    private _statuses;
    private _sortColumn: SortColumn;

    constructor () {

        // console.log('ProjectSelectionService Ctor');
        this._statuses = statusMap;
    }

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/

    get filteredProjects$ () {

        return this._filteredRecords.asObservable();
    }

    init (projects: Project[], sortColumn: SortColumn) {

        // console.log('ProjectSelectionService Init', projects);
        this._processedProjects = new Array<Project>();
        this._projects = projects;
        this._sortColumn = sortColumn;
        this.processProjects();
    }

    setStatusFilter (selStatus: StatusMap) {

        this._statuses.forEach((status) => {

            if (status.Key === selStatus.Key) {

                status.IsFiltered = !status.IsFiltered;
            }
        });
        this.processProjects();
    }

    setSortColumn (selCol: SortColumn) {

        this._sortColumn = selCol;
        this.processProjects();
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

    processProjects () {

        // filter by status
        this.filterStatuses();
        // filter by text
        // this.filterByText();
        // sort
        this.sort();

        this._filteredRecords.next(this._processedProjects);
    }

    private filterStatuses () {

        this._processedProjects = new Array<Project>();

        this._statuses.forEach((map) => {

            if (map.IsFiltered) {

                this._processedProjects = _.concat(this._processedProjects, this.filterProject(map));
            }
        });
    }

    private filterByText () {


    }

    private sort () {

        this._processedProjects = _.orderBy(this._processedProjects, [this._sortColumn.Key],
            [this._sortColumn.IsDescending ? 'desc' : 'asc']);
    }

    private filterProject (status: StatusMap) {

        return _.filter(this._projects, function (proj) {

            return proj.Status === status.Key;
        });
    }
}
