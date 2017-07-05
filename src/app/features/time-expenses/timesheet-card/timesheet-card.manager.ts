// Helper/static methods which build up and analyze timesheet-cards
//    used to help keep component files cleaner

import { Injectable } from '@angular/core';

import { WeekDateRange, WeekDateRangeDetails } from '../../../models/Date';
import { Timecard, TimecardSection } from './timecard.model';

import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable()
export class TimesheetCardManager {

  // attaches an hours @ day object (plus other supplemantary info inside that), attached to each group, at each grouping level
  buildTimecard(cards: Array<any>, dateRange): Array<any> {

    cards.forEach(card => {
      // each card

      for (const sectionKey in card.sections) {
        if (card.sections.hasOwnProperty(sectionKey)) {
          // each section of each card (anti-group)
          const section = card.sections[sectionKey];


          for (const systemPhaseKey in section) {
            if (section.hasOwnProperty(systemPhaseKey)) {
              // each systemPhase in each section
              const systemPhase = section[systemPhaseKey];

              for (const costCodeKey in systemPhase) {
                if (systemPhase.hasOwnProperty(costCodeKey)) {
                  // each costCode array in each systemPhase
                  const costCodes = systemPhase[costCodeKey];
                  // each costCode entry here is an array of objects with an hours param (for hours worked on a specific day)
                  // each costCode entry here should eqate to one 'section' within the UI
                  // let's compile this codeCode array into a single obj with all the info we need
                  //     grouping, systemPhase, codeCode, list of each day in week with associated day's comments

                  const finalCostCode = {
                    grouping: costCodes[0].grouping,
                    systemPhase: costCodes[0].systemPhase,
                    costCode: costCodes[0].costCode,
                    days: {}
                  }

                  // build empty days object with hours
                  dateRange.forEach(date => {
                    const dateKey = date.date.format('MM-DD-YYYY');
                    finalCostCode.days[dateKey] = {
                      hours: 0,   // start at 0 and sum up all hours
                      selected: false,
                      comments: [],
                      statusRejected: false,
                      statusPending: false
                    };
                  });

                  // sum up hours for use in finalCostCode.days[dateKey].hours
                  costCodes.forEach(costCode => {
                    const dateKey = moment(costCode.hours.Date).format('MM-DD-YYYY');
                    finalCostCode.days[dateKey].hours += costCode.hours.DoubleTime + costCode.hours.Overtime + costCode.hours.RegularTime;

                    // keep track of total status for entire day
                    switch (costCode.status) {
                      case 'Rejected':
                        finalCostCode.days[dateKey].statusRejected = true;
                        break;
                      case 'Pending':
                        finalCostCode.days[dateKey].statusPending = true;
                        break;
                      case 'Approved':
                        break;
                    }

                    // append comments
                    finalCostCode.days[dateKey].comments = _.concat(finalCostCode.days[dateKey].comments, costCode.comments);
                  });

                  //  build up approval status
                  for (const dateKey in finalCostCode.days) {
                    if (finalCostCode.days.hasOwnProperty(dateKey)) {
                      const day = finalCostCode.days[dateKey];
                      let status: string;

                      if (day.statusRejected) {
                        status = 'Rejected';
                      } else if (day.statusPending) {
                        status = 'Pending'
                      } else {
                        status = 'Approved'
                      }

                      day.status = status;
                      delete day.statusRejected;
                      delete day.statusPending;
                    }
                  }

                  // replace original obj
                  systemPhase[costCodeKey] = finalCostCode;
                }
              }
            }
          }
        }
      }
    });

    return cards;
  }

  // builds labels to display date range
  buildWeekDateRangeDetails(dateRange: WeekDateRange) {

    const weekDateRangeDetails = new Array<WeekDateRangeDetails>();
    const day = dateRange.startDate.clone();

    while (day.isSameOrBefore(dateRange.endDate, 'days')) {

      weekDateRangeDetails.push({
        dayString: day.format('dd'),
        dateString: day.format('MMM. Do'),
        date: day.clone()
      });

      day.add(1, 'days');
    }

    return weekDateRangeDetails;
  }

  // given a timecard and a day, returns the total hours logged for that day for the entire card
  getDayTotalHours(timecard, day): string {
    let hours = 0;
    const dateKey = day.date.format('MM-DD-YYYY');

    for (const sectionKey in timecard.sections) {
      if (timecard.sections.hasOwnProperty(sectionKey)) {
        // each section of each card (anti-group)
        const section = timecard.sections[sectionKey];


        for (const systemPhaseKey in section) {
          if (section.hasOwnProperty(systemPhaseKey)) {
            // each systemPhase in each section
            const systemPhase = section[systemPhaseKey];

            for (const costCodeKey in systemPhase) {
              if (systemPhase.hasOwnProperty(costCodeKey)) {
                // each costCode array in each systemPhase
                const costCode = systemPhase[costCodeKey];

                hours += costCode.days[dateKey].hours;
              }
            }
          }
        }
      }
    }

    return hours + '';
  }
}
