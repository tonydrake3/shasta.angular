import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/*
 * Map numeric
 * Usage:
 *   value | status
 * Example:
 *   {{ 2 |  status}}
 *   formats to: Complete
 */
@Pipe({name: 'timeFormat'})
export class TimeFormatPipe implements PipeTransform {

    transform(value: string): string {

        let parsedTime: any;

        const timeRegEx: RegExp = /([0-9]{1,2}:[0-9]{1,2})/g;
        const validMinuteDigit: RegExp = /([0-2])/g;
        const invalidMinuteDigit: RegExp = /([6-9])/g;

        if (timeRegEx.test(value)) {
            parsedTime = moment(value, ['HH:mm']);
        } else {

            if (value.length < 3) {

                parsedTime = moment(value + ':00', ['HH:mm']);
            } else if (value.length === 3) {

                if (invalidMinuteDigit.test(value.substring(1, 2))) {

                    parsedTime = moment('0' + value.substring(0, 1) + ':5' + value.substring(2), ['HH:mm']);
                } else {

                    parsedTime = moment('0' + value.substring(0, 1) + ':' + value.substring(1), ['HH:mm']);
                }
            } else if (value.length === 4) {

                if (validMinuteDigit.test(value.substring(0, 1))) {

                    if (invalidMinuteDigit.test(value.substring(1, 2))) {

                        parsedTime = moment(value.substring(0, 1) + ':5' + value.substring(2), ['HH:mm']);
                    } else {

                        parsedTime = moment(value.substring(0, 2) + ':' + value.substring(2), ['HH:mm']);
                    }
                } else {

                    if (invalidMinuteDigit.test(value.substring(1, 2))) {

                        parsedTime = moment('0' + value.substring(0, 1) + ':5' + value.substring(2, 3), ['HH:mm']);
                    } else {

                        parsedTime = moment('0' + value.substring(0, 1) + ':' + value.substring(1, 3), ['HH:mm']);
                    }
                }

            } else {

                if (validMinuteDigit.test(value.substring(0, 1))) {

                    if (invalidMinuteDigit.test(value.substring(1, 2))) {

                        parsedTime = moment('0' + value.substring(0, 1) + ':5' + value.substring(2, 3), ['HH:mm']);
                    } else {

                        parsedTime = moment('0' + value.substring(0, 1) + ':' + value.substring(1, 3), ['HH:mm']);
                    }
                    parsedTime = moment(value.substring(0, 2) + ':' + value.substring(2, 4), ['HH:mm']);
                } else {

                    if (invalidMinuteDigit.test(value.substring(1, 2))) {

                        parsedTime = moment('0' + value.substring(0, 1) + ':5' + value.substring(2, 3), ['HH:mm']);
                    } else {

                        parsedTime = moment('0' + value.substring(0, 1) + ':' + value.substring(1, 3), ['HH:mm']);
                    }
                }
            }
        }

        if (value && parsedTime.isValid()) {

            return parsedTime.format('HH:mm').toString();
        }
        return value;
    }
}
