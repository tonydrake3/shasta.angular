import {FormGroup} from '@angular/forms';
import * as moment from 'moment';

export function validateTimeBreakOverlap(timeInKey: string, timeOutKey: string, breakInKey: string, breakOutKey: string) {
    return (group: FormGroup): {[key: string]: any} => {

        let timeIn, timeOut, breakIn, breakOut, startTime, endTime, breakStartTime, breakEndTime;

        const timeGroup = group.controls['time'] as FormGroup;
        const breakGroup = group.controls['break'] as FormGroup;

        timeIn = timeGroup.controls[timeInKey];
        timeOut = timeGroup.controls[timeOutKey];

        if (timeIn && timeOut) {

            breakIn = breakGroup.controls[breakInKey];
            breakOut = breakGroup.controls[breakOutKey];

            startTime = moment(timeIn.value, ['H:mm A']);
            endTime = moment(timeOut.value, ['H:mm A']);

            breakStartTime = moment(breakIn.value, ['H:mm A']);
            breakEndTime = moment(breakOut.value, ['H:mm A']);
        } else {

            timeIn = timeGroup.controls[timeInKey + 'Value'];
            timeOut = timeGroup.controls[timeOutKey + 'Value'];
            const timeInPeriod = timeGroup.controls[timeInKey + 'Period'];
            const timeOutPeriod = timeGroup.controls[timeOutKey + 'Period'];

            breakIn = breakGroup.controls[breakInKey + 'Value'];
            breakOut = breakGroup.controls[breakOutKey + 'Value'];
            const breakInPeriod = breakGroup.controls[breakInKey + 'Period'];
            const breakOutPeriod = breakGroup.controls[breakOutKey + 'Period'];

            startTime = moment(timeIn.value + ' ' + timeInPeriod.value, ['H:mm A']);
            endTime = moment(timeOut.value + ' ' + timeOutPeriod.value, ['H:mm A']);

            breakStartTime = moment(breakIn.value + ' ' + breakInPeriod.value, ['H:mm A']);
            breakEndTime = moment(breakOut.value + ' ' + breakOutPeriod.value, ['H:mm A']);
        }

        if (breakStartTime.isAfter(endTime) && breakEndTime.isAfter(endTime)) {

            breakIn.setErrors({ invalid: true });
            breakOut.setErrors({ invalid: true });
            return {
                breakOutsideOfTime: true
            };
        } else if (breakStartTime.isAfter(endTime)) {

            breakOut.setErrors({ invalid: true });
            return {
                breakOutsideOfTime: true
            };
        } else if (breakEndTime.isAfter(endTime)) {

            breakOut.setErrors({ invalid: true });
            return {
                breakOutsideOfTime: true
            };
        } else if (breakStartTime.isBefore(startTime) && breakEndTime.isBefore(startTime)) {

            breakIn.setErrors({ invalid: true });
            breakOut.setErrors({ invalid: true });
            return {
                breakOutsideOfTime: true
            };
        } else if (breakStartTime.isBefore(startTime)) {

            breakIn.setErrors({ invalid: true });
            return {
                breakOutsideOfTime: true
            };
        } else if (breakEndTime.isBefore(startTime)) {

            breakOut.setErrors({ invalid: true });
            return {
                breakOutsideOfTime: true
            };
        }
        breakIn.setErrors(null);
        breakOut.setErrors(null);
        return null;
    }
}
