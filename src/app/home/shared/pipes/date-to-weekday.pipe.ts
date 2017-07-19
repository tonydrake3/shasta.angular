import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/*
 * Convert date to weekday
 * Usage:
 *   value | weekday
 * Example:
 *   {{ 2017-07-16 |  weekday}}
 *   formats to: Sunday
 */
@Pipe({name: 'weekday'})
export class DateToWeekdayPipe implements PipeTransform {
    transform(value: string): string {

        // Convert string date value to date object
        const date = moment(value, 'YYYY-MM-DD');

        if (date.isValid()) {

            if (value === moment().format('YYYY-MM-DD')) {

                return 'Today';
            }
            return date.format('dddd');
        }
        return '';
    }
}
