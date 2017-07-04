import {Injectable} from '@angular/core';
// import { ProjectService } from './project.service';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Project} from 'app/models/domain/Project';
import {MockProjectService} from '../../shared/mocks/mock.project.service';
import {Subject} from 'rxjs/Subject';
import {StatusMap, statusMap} from '../../models/configuration/statusMap';
import {SortColumn} from '../../models/configuration/sortColumns';

@Injectable()
export class ProjectSelectionService {

    _projects;
    _processedProjects;
    _filteredRecords = new Subject();
    _filterText: string;
    _statuses;
    _sortColumn: SortColumn;

    constructor () {

        this._statuses = statusMap;

        // this._mockService.projects$
        //     .subscribe(
        //         (projects) => {
        //
        //             // console.log('Project Selection Service Ctor', projects);
        //             this._projects = projects;
        //         },
        //         (error) => {
        //
        //             console.log('Project Selection Service Ctor Error', error);
        //         }
        //     );
    }

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/

    get filteredProjects$ () {

        return this._filteredRecords.asObservable();
    }

    init (projects: Project[], sortColumn: SortColumn) {

        console.log('ProjectSelectionService Init');
        this._projects = projects;
        this._sortColumn = sortColumn;
    }

    getLatest () {

        console.log('ProjectSelectionService GetLatest');
    }

    processProjects () {

        // filter by status
        this.filterStatuses();
        // filter by text
        // this.filterByText();
        // sort
        // this.sort();

        this._filteredRecords.next(this._processedProjects);
    }

    /*****************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

    private filterStatuses () {


    }

    private filterByText () {


    }

    private sort () {


    }
}
