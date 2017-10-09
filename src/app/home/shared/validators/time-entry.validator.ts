import {FormGroup} from '@angular/forms';
import * as moment from 'moment';

export function validateTime(timeInKey: string, timeOutKey: string, errorType: string) {
    return (group: FormGroup): {[key: string]: any} => {

        const timeIn = group.controls[timeInKey];
        const timeOut = group.controls[timeOutKey];

        const startTime = moment(timeIn.value, ['H:mm A']);
        const endTime = moment(timeOut.value, ['H:mm A']);

        if (startTime.isAfter(endTime)) {

            timeIn.setErrors({ invalid: true });
            timeOut.setErrors({ invalid: true });
            return {
                [errorType]: true
            };
        }
        timeIn.setErrors(null);
        timeOut.setErrors(null);
        return null;
    }
}

export function validateGridTime(timeInKey: string, timeOutKey: string, errorType: string) {
    return (group: FormGroup): {[key: string]: any} => {

        const timeIn = group.controls[timeInKey];
        const timeOut = group.controls[timeOutKey];

        const startTime = moment(timeIn.value, ['H:mm A']);
        const endTime = moment(timeOut.value, ['H:mm A']);

        if (!startTime.isValid() && endTime.isValid()) {

            timeIn.setErrors({ invalid: true });
            return {
                ['invalid-time']: true
            };
        } else if (startTime.isValid() && !endTime.isValid()) {

            timeOut.setErrors({ invalid: true });
            return {
                ['invalid-time']: true
            };
        } else if (startTime.isAfter(endTime)) {

            timeIn.setErrors({ invalid: true });
            timeOut.setErrors({ invalid: true });
            return {
                [errorType]: true
            };
        }
        timeIn.setErrors(null);
        timeOut.setErrors(null);
        return null;
    }
}

export function validateTimeWithPeriod(timeInKey: string, timeOutKey: string, errorType: string) {
    return (group: FormGroup): {[key: string]: any} => {

        const timeInField = group.controls[timeInKey + 'Value'];
        const timeInPeriod = group.controls[timeInKey + 'Period'];

        const timeOutField = group.controls[timeOutKey + 'Value'];
        const timeOutPeriod = group.controls[timeOutKey + 'Period'];

        const startTime = moment(timeInField.value + ' ' + timeInPeriod.value, ['H:mm A']);
        const endTime = moment(timeOutField.value + ' ' + timeOutPeriod.value, ['H:mm A']);

        if (startTime.isAfter(endTime)) {

            timeInField.setErrors({ invalid: true });
            timeInPeriod.setErrors({ invalid: true });
            timeOutField.setErrors({ invalid: true });
            timeOutPeriod.setErrors({ invalid: true });
            return {
                [errorType]: true
            };
        }
        timeInField.setErrors(null);
        timeInPeriod.setErrors(null);
        timeOutField.setErrors(null);
        timeOutPeriod.setErrors(null);
        return null;
    }
}

export function validateGridTimeWithPeriod(timeInKey: string, timeOutKey: string, errorType: string) {
    return (group: FormGroup): {[key: string]: any} => {

        const timeInField = group.controls[timeInKey + 'Value'];
        const timeInPeriod = group.controls[timeInKey + 'Period'];

        const timeOutField = group.controls[timeOutKey + 'Value'];
        const timeOutPeriod = group.controls[timeOutKey + 'Period'];

        const startTime = moment(timeInField.value + ' ' + timeInPeriod.value, ['H:mm A']);
        const endTime = moment(timeOutField.value + ' ' + timeOutPeriod.value, ['H:mm A']);

        if (!startTime.isValid() && endTime.isValid()) {

            timeInField.setErrors({ invalid: true });
            timeInPeriod.setErrors({ invalid: true });
            return {
                ['invalid-time']: true
            };
        } else if (startTime.isValid() && !endTime.isValid()) {

            timeOutField.setErrors({ invalid: true });
            timeOutPeriod.setErrors({ invalid: true });
            return {
                ['invalid-time']: true
            };
        } else if (startTime.isAfter(endTime)) {

            timeInField.setErrors({ invalid: true });
            timeInPeriod.setErrors({ invalid: true });
            timeOutField.setErrors({ invalid: true });
            timeOutPeriod.setErrors({ invalid: true });
            return {
                [errorType]: true
            };
        }
        timeInField.setErrors(null);
        timeInPeriod.setErrors(null);
        timeOutField.setErrors(null);
        timeOutPeriod.setErrors(null);
        return null;
    }
}
