import { Injectable } from '@angular/core';

Injectable()
export class DateFormatterService {

    numberForDay:any = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6
    };

    dayForNumer: any = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
    };

    /*
    TODO: Refactor with Moment?
     Returns the date numDaysBefore the provided date endDate
     */
    dateFrom(endDate: Date, numDaysBefore: number) {

        // let date = angular.copy(startDate);
        return new Date(endDate.setDate(endDate.getDate() - numDaysBefore))

    }

    /*
     TODO: Refactor with Moment?
     Returns the date numDaysBefore the provided date endDate
     */
    dateTo(startDate: Date, numDaysAfter: number) {

        // let date = angular.copy(startDate);
        return new Date(startDate.setDate(startDate.getDate() + numDaysAfter))

    }

    weekEndingDate(weekEndingDay: string): Date {

        // 1. get week end day from server
        const date = new Date();
        const todayDay = date.getDay();

        // TODO: Remove this once it comes from server
        const weekEndDay = this.numberForDay[weekEndingDay];

        if (weekEndDay !== todayDay) {

            // 2b1. Find the difference depending on whether the week end day is last week or this week
            const diff = (todayDay > weekEndDay) ? todayDay - weekEndDay : todayDay + (7 - weekEndDay);

            // 2b2. return the date diff days before today
            return this.dateFrom(date, diff);

        }
        // week end day is today
        return date;
    }

    daysUntilWeekEnds(fromDay: string) {

        // TODO: Finish calc?
        const dayOfWeek = this.numberForDay[fromDay];

    }

    /*TODO: Getting a typescript warning with this method. Track it down.
      TODO: Refactor with MomentJS
     * The problem is that the type being passed in is a Date object but somewhere
     * along the line it gets converted into a string, so it needs to be converted
     * back into a Date.*/
    hoursBetween(d1: string, d2: string) {

        const date1 = new Date(d1);
        const date2 = new Date(d2);
        if (!d1 || !d2) return 0;
        return Math.abs(date1.getTime()-date2.getTime()) / 3600000;

    }


}
