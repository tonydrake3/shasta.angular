import { Pipe, PipeTransform } from '@angular/core';
import {weatherMap, WeatherMap} from '../../models/configuration/weatherMap';

/*
 * Map numeric WeatherCode to Weather Description
 * Usage:
 *   value | weather
 * Example:
 *   {{ 113 |  weather}}
 *   formats to: Sunny
 */
@Pipe({name: 'weather'})
export class WeatherPipe implements PipeTransform {
    transform(value: number): string {

        const weatherValues: WeatherMap[] = weatherMap;

        let weatherDescription = '';

        weatherValues.forEach(weatherVal => {

            if (weatherVal.Key === value) {
                weatherDescription = weatherVal.Description;
            }
        });

        return weatherDescription;
    }
}

