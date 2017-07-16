import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
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
import {BaseComponent} from '../../../shared/components/base.component';

@Component({
    selector: 'esub-project-summary',
    templateUrl: './project-summary.component.html',
})
export class ProjectSummaryComponent extends BaseComponent implements OnInit, OnDestroy {

    // Private
    private _location;
    private _statuses;
    private _weatherValues;
    private _routerSubscription;
    private _summaryService: ProjectSummaryService;

    // Public
    details: Project;
    weather;
    places;

    constructor (protected injector: Injector, private _router: ActivatedRoute,
                 private _maps: MapsService, private  _weather: WeatherService) {

        super(injector, [
            {
                service: 'ProjectSummaryService',
                callback: 'summaryCallback'
            }
        ]);

        this._summaryService = super.getServiceRef('ProjectSummaryService') as ProjectSummaryService;

        this._routerSubscription = this._router.params

            .subscribe(

                (result) => {

                    if (this._summaryService) {

                        this._summaryService.config(result.id);
                        this._summaryService.getLatest();
                    }
                } ,
                error => console.log(error)
            );

        this._statuses = statusMap;
        this._weatherValues = weatherMap;
        this.places = projectPlaces;
    }

    /******************************************************************************************************************
     * Lifecycle Methods
     ******************************************************************************************************************/

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


        // this._summary.projectDetail$
        //
        //     .subscribe(
        //
        //         (details) => {
        //
        //
        //         },
        //         (error) => {
        //
        //             console.log(error);
        //         }
        //     );
    }

    ngOnDestroy () {

        super.ngOnDestroy();
        this._routerSubscription.unsubscribe();
    }

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/
    getWeather (location) {
        //
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

    getWeatherIcon (forecastDay) {

        // console.log(forecastDay.hourly[0].weatherCode);
        let className = '';
        this._weatherValues.forEach(weatherItem => {

            console.log(weatherItem.Key, forecastDay.hourly[0].weatherCode);
            if (weatherItem.Key === forecastDay.hourly[0].weatherCode) {
                className = weatherItem.Value.toLowerCase();
            }
        });
        console.log(className);
        return {'mdi': true, [className]: true};
    }

    /******************************************************************************************************************
     * Callback Handler
     ******************************************************************************************************************/

    summaryCallback (detail) {

        this.details = detail['Value'][0];
        this._maps.setAddress(this.details.Address.Address1 + ', ' + this.details.Address.City + ', '
            + this.details.Address.State);
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/
}
