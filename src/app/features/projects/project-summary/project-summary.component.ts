import {Component, Injector, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ProjectSummaryService} from './project-summary.service';
import {Project} from '../../../models/domain/Project';
import {MapsService} from '../../../shared/services/utilities/maps.service';
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
export class ProjectSummaryComponent extends BaseComponent implements OnDestroy {

    // Private
    private _location;
    private _statuses: StatusMap[];
    private _weatherValues;
    private _routerSubscription;
    private _summaryService: ProjectSummaryService;
    private _maps: MapsService;
    private _weatherService: WeatherService;

    // Public
    details: Project;
    weather;
    places;

    constructor (protected injector: Injector, private _router: ActivatedRoute) {

        super(injector, [
            {
                service: 'ProjectSummaryService',
                callback: 'summaryCallback'
            },
            {
                service: 'MapsService',
                callback: 'locationCallback'
            },
            {
                service: 'WeatherService',
                callback: 'weatherCallback'
            }
        ]);

        this._summaryService = super.getServiceRef('ProjectSummaryService') as ProjectSummaryService;
        this._maps = super.getServiceRef('MapsService') as MapsService;
        this._weatherService = super.getServiceRef('WeatherService') as WeatherService;

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

    ngOnDestroy () {

        super.ngOnDestroy();
        this._routerSubscription.unsubscribe();
    }

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/

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

            if (weatherItem.Key === forecastDay.hourly[0].weatherCode) {
                className = weatherItem.Value.toLowerCase();
            }
        });

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

    locationCallback (location) {

        this._location = location;
        this._weatherService.getWeather(location);
    }

    weatherCallback (response) {

        this.weather = response.weather;
        // this.weather = mockWeather['data'].weather;
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/


}
