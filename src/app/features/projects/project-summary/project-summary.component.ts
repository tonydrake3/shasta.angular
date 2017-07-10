import {Component, OnInit} from '@angular/core';
import {ProjectSummaryService} from './project-summary.service';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../../models/domain/Project';
import {MapsService} from '../../../shared/services/utilities/maps.service';
import {MockProjectSummaryService} from '../../../shared/mocks/mock.project.summary.service';
import {WeatherService} from '../../../shared/services/utilities/weather.service';
import {statusMap, StatusMap} from '../../../models/configuration/statusMap';
import {projectPlaces} from '../../../models/configuration/projectPlaces';
import {weatherMap} from '../../../models/configuration/weatherMap';
import {mockWeather} from '../../../shared/mocks/data/mockWeather.data';

@Component({
    selector: 'esub-project-summary',
    templateUrl: './project-summary.component.html',
})
export class ProjectSummaryComponent implements OnInit {

    details: Project;
    weather;
    places;

    _location;
    _statuses;
    _weatherValues;

    constructor (private _summary: ProjectSummaryService, private _router: ActivatedRoute,
                 private _maps: MapsService, private  _weather: WeatherService) {

        this._router.params

            .subscribe(

                (result) => {

                    this._summary.config(result.id);
                } ,
                error => console.log(error)
            );

        this._statuses = statusMap;
        this._weatherValues = weatherMap;
        this.places = projectPlaces;
    }

    ngOnInit () {

        this._maps.location$

            .subscribe(

                (location) => {

                    console.log(location);
                    this._location = location;
                    this.getWeather(location);
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

    getWeather (location) {

        // this._weather.getWeather(location)
        //
        //     .subscribe(
        //
        //         (records) => {
        //
        //             this.weather = records.weather;
        //             console.log(this.weather);
        //         },
        //         (error) => {
        //
        //             console.log(error);
        //         }
        //     );

        this.weather = mockWeather['data'].weather;
        console.log(this.weather);
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

    getWeatherIcon (weather) {

        // let className = '';
        // this._weatherValues.forEach(value => {
        //
        //     if (value.Key === weather) {
        //         className = status.Value.toLowerCase();
        //     }
        // });
        // return [{['mdi']: true}, {[className]: true}];
    }
}
