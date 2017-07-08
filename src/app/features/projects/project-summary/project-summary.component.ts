import {Component, OnInit} from '@angular/core';
import {ProjectSummaryService} from './project-summary.service';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../../models/domain/Project';
import {MapsService} from '../../../shared/services/utilities/maps.service';

@Component({
    selector: 'esub-project-summary',
    templateUrl: './project-summary.component.html',
})
export class ProjectSummaryComponent implements OnInit {

    details: Project;
    _location;

    constructor (private _summary: ProjectSummaryService, private _router: ActivatedRoute,
                 private _maps: MapsService) {

        this._router.params

            .subscribe(

                (result) => {

                    this._summary.config(result.id);
                } ,
                error => console.log(error)
            );
    }

    ngOnInit () {

        this._maps.location$

            .subscribe(
                (location) => {

                    this._location = location;
                    console.log(location);
                },
                (error) => {

                    console.log(error);
                }
            );


        this._summary.projectDetail$

            .subscribe(

                (details) => {

                    this.details = details['Value'][0];
                    this._maps.setAddress(this.details.Address.Address1 + ', ' + this.details.Address.City + ', '
                        + this.details.Address.State);
                },
                (error) => {

                    console.log(error);
                }
            );
    }
}
