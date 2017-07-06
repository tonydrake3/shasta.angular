import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../models/domain/Project';
import {DataSyncService} from 'app/shared/services/utilities/data-sync.service';
import {LookupDataService} from '../../../shared/services/utilities/lookup-data.service';
import {statusMap} from '../../../models/configuration/statusMap';
import {Router} from '@angular/router';


@Component({
    selector: 'esub-project-selection-card',
    templateUrl: './project-selection-card.component.html'
})
export class ProjectSelectionCardComponent implements OnInit {
    @Input() project: Project;
    _links;
    _statuses;

    constructor(protected _router: Router, private _dataSync: DataSyncService, private _lookup: LookupDataService) {}

    ngOnInit () {

        this._lookup.getProjectCardLinks()
            .then((links) => {

                this._links = links;
            });

        this._statuses = statusMap;
    }

    goToPage (link) {
        console.log(link);
        // this._router.navigate([link.route]);
    }

    getClass (statusId: string) {

        let className = '';
        this._statuses.forEach(status => {

            if (status.Key === statusId) {
                className = status.Value.toLowerCase();
            }
        });
        return {[className]: true};
    }

    selectProject (project: Project) {
        // console.log('Select Project');
        this._dataSync.setProject(project);
        sessionStorage.setItem('project', JSON.stringify(project));
    }
}
