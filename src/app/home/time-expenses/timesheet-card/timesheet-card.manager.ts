import { Subject } from 'rxjs/Subject';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { CostCode } from './../../../models/domain/CostCode';
import { ChangeDetectorRef } from '@angular/core';

import { Injectable } from '@angular/core';

import { WeekDateRange, WeekDateRangeDetails } from '../../../models/Date';
import { Timecard, TimecardSection, HoursApproval } from './timecard.model';
import { Hours } from '../../../models/domain/Hours';
import { Project, Employee } from '../../../models/time/TimeRecord';

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
                  };

                  // build empty days object with hours
                  dateRange.forEach(date => {
                    const dateKey = date.date.format('MM-DD-YYYY');

                    finalCostCode.days[dateKey] = {
                      hours: 0, // start at 0 and sum up all hours
                      selected: false,
                      comments: [],
                      statusRejected: false,
                      statusPending: false,
                      hoursBreakdown: Array<HoursApproval>()
                    };
                  });

                  // sum up hours for use in finalCostCode.days[dateKey].hours
                  costCodes.forEach(costCode => {
                    const dateKey = moment(costCode.hours.Date).format(
                      'MM-DD-YYYY'
                    );
                    finalCostCode.days[dateKey].hours +=
                      costCode.hours.DoubleTime +
                      costCode.hours.Overtime +
                      costCode.hours.RegularTime;

                    // Only append hours when at least one property is non-zero
                    if (
                      costCode.hours.RegularTime > 0 ||
                      costCode.hours.Overtime > 0 ||
                      costCode.hours.DoubleTime > 0
                    ) {
                      finalCostCode.days[dateKey].hoursBreakdown.push(
                        this.getHoursBreakdown(costCode)
                      );
                    }

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
                    finalCostCode.days[dateKey].comments = _.concat(
                      finalCostCode.days[dateKey].comments,
                      costCode.comments
                    );

                    // affix map error status
                    finalCostCode.days[dateKey].mapError = costCode.mapError;
                  });

                  //  build up approval status
                  for (const dateKey in finalCostCode.days) {
                    if (finalCostCode.days.hasOwnProperty(dateKey)) {
                      const day = finalCostCode.days[dateKey];
                      let status: string;

                      if (day.statusRejected) {
                        status = 'Rejected';
                      } else if (day.statusPending) {
                        status = 'Pending';
                      } else {
                        status = 'Approved';
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

  //   given a timecard and a day, returns the total hours logged for that day for the entire card
  //       if day is omitted, totals up for entire card
  //       if iSectionKey (project or employee) is supplied, only tally hours against that
  //       if iSystemPhaseKey is supplied, only tally hours against that
  //   TODO maybe refactor this a little bit it feels brittle?
  getTimecardTotalHours(
    timecard,
     day?
    // iSectionKey?,
    // iSystemPhaseKey?
  ): string {
    let hours = 0;
    let dateKey;
    if (day) dateKey = day.date.format('MM-DD-YYYY');

    for (const sectionKey in timecard.sections) {
      if (timecard.sections.hasOwnProperty(sectionKey)) {
        // if iSectionKey is supplied, only count when it matches
        // if (iSectionKey && iSectionKey !== sectionKey) continue;

        // each section of each card (anti-group)
        const section = timecard.sections[sectionKey];

        for (const systemPhaseKey in section) {
          if (section.hasOwnProperty(systemPhaseKey)) {
            // if iSectionKey is supplied, only count when it matches
            // if (iSystemPhaseKey && iSystemPhaseKey !== systemPhaseKey) continue;

            // each systemPhase in each section
            const systemPhase = section[systemPhaseKey];

            for (const costCodeKey in systemPhase) {
              if (systemPhase.hasOwnProperty(costCodeKey)) {
                // each costCode array in each systemPhase
                const costCode = systemPhase[costCodeKey];

                if (day) {
                  // if day was specified, get that day's hours
                  hours += costCode.days[dateKey].hours;
                } else {
                  // elsewise, tally up all day entries
                  for (const ccDayKey in costCode.days) {
                    if (costCode.days.hasOwnProperty(ccDayKey)) {
                      hours += costCode.days[ccDayKey].hours;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return hours + '';
  }

  //   given a timecard and a day, returns the total hours logged for that day for the entire card
  //       if day is omitted, totals up for entire card
  //       if iSectionKey (project or employee) is supplied, only tally hours against that
  //       if iSystemPhaseKey is supplied, only tally hours against that
  //   TODO maybe refactor this a little bit it feels brittle?
  getTimecardOverTime(timecard, day?, iSectionKey?, iSystemPhaseKey?): any {
    let hours = 0;
    let dateKey;
    if (day) dateKey = day.date.format('MM-DD-YYYY');

    for (const sectionKey in timecard.sections) {
      if (timecard.sections.hasOwnProperty(sectionKey)) {
        // if iSectionKey is supplied, only count when it matches
        if (iSectionKey && iSectionKey !== sectionKey) continue;

        // each section of each card (anti-group)
        const section = timecard.sections[sectionKey];

        for (const systemPhaseKey in section) {
          if (section.hasOwnProperty(systemPhaseKey)) {
            // if iSectionKey is supplied, only count when it matches
            if (iSystemPhaseKey && iSystemPhaseKey !== systemPhaseKey) continue;

            // each systemPhase in each section
            const systemPhase = section[systemPhaseKey];

            for (const costCodeKey in systemPhase) {
              if (systemPhase.hasOwnProperty(costCodeKey)) {
                // each costCode array in each systemPhase
                const costCode = systemPhase[costCodeKey];

                if (day) {
                  // if day was specified, get that day's hours
                  _.forEach(costCode.days[dateKey].hoursBreakdown, item => {
                    hours += item['Overtime'];
                  });
                } else {
                  // elsewise, tally up all day entries
                  for (const ccDayKey in costCode.days) {
                    if (costCode.days.hasOwnProperty(ccDayKey)) {
                      _.forEach(costCode.days[dateKey].hoursBreakdown, item => {
                        hours += item['Overtime'];
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return hours;
  }

  public getTimecardGrid(timecard: Timecard): Array<HoursApproval> {
    let result = new Array<HoursApproval>();
    _.forEach(timecard.sections, section => {
      _.forEach(section, systemPhase => {
        _.forEach(systemPhase, costCode => {
          if (costCode) {
            const days = costCode['days'];
            _.forEach(days, day => {
              if (day) {
                const temo = day;
                const hoursBreakdowns = day['hoursBreakdown'];

                if (hoursBreakdowns) {
                  _.forEach(hoursBreakdowns, hoursBreakdown => {
                    const hoursApproval = new HoursApproval();
                    hoursApproval.job = hoursBreakdown['job'];
                    hoursApproval.costCode = costCode['costCode'];
                    // tslint:disable-next-line:max-line-length
                    hoursApproval.hourlyValues = (Number(hoursBreakdown['Regulartime']) + Number(hoursBreakdown['Overtime'])  + Number(hoursBreakdown['Doubletime'])).toString(); // day['hours'];
                    hoursApproval.status = hoursBreakdown['status'];
                    hoursApproval.day = hoursBreakdown['day'];
                    hoursApproval.Regulartime = hoursBreakdown['Regulartime'];
                    hoursApproval.Overtime = hoursBreakdown['Overtime'];
                    hoursApproval.Doubletime = hoursBreakdown['Doubletime'];
                    hoursApproval.isRejected = hoursBreakdown['isRejected'];

                    hoursApproval.systemPhrase = costCode['systemPhase'] ? costCode['systemPhase'] : '';

                    hoursApproval['isSelected'] = hoursBreakdown['status'].toLowerCase() === 'approved';

                    if (hoursBreakdown['punch']) {
                      hoursApproval.punchIn = hoursBreakdown['punch'].PunchIn;
                      hoursApproval.punchOut = hoursBreakdown['punch'].PunchOut;
                      hoursApproval.break = Number(hoursBreakdown['Regulartime']) === 8 ? '1' : '';
                      // hoursApproval.punch =  hoursBreakdown['punch'];
                      hoursApproval.punchInDistance = hoursBreakdown['punch']['PunchInDistance']
                      hoursApproval.punchOutDistance = hoursBreakdown['punch']['PunchOutDistance']
                    }

                    _.forEach(hoursBreakdown['comments'], comment => {
                      hoursApproval.comments = _.concat(
                        comment,
                        hoursBreakdown['comments']
                      );
                    });
                    hoursApproval.projectId = hoursBreakdown['projectId'];
                    hoursApproval.TimeRecordId = hoursBreakdown['TimeRecordId'];
                    hoursApproval.$id = timecard.Id;
                    result = _.concat(result, hoursApproval);
                  });
                }
              }
            });
          }
        });
      });
    });
    // });

    return result;
  }

  private getHoursBreakdown(costCode): HoursApproval {
    let timeRecordId = '';
    let projectId = '';
    if (costCode && costCode.Id) {
      timeRecordId = costCode.Id;
    }

    if (costCode && costCode.project && costCode.project.Id) {
      projectId = costCode.project.Id;
    }
    const result = {
      status: costCode.status,
      day: costCode.hours.Date,
      job: costCode.grouping,
      costCode: costCode.costCode,
      hourlyValues:
        costCode.hours.RegularTime +
        costCode.hours.Overtime +
        costCode.hours.DoubleTime,
      Regulartime: costCode.hours.RegularTime,
      Overtime: costCode.hours.Overtime,
      Doubletime: costCode.hours.DoubleTime,
      isSelected: costCode.status === 'Approved',
      punch: costCode.punch,
      $id: costCode.hours.$id,
      isRejected: costCode.status === 'Rejected',
      note: '',
      comments: costCode.comments,
      TimeRecordId: timeRecordId,
      projectId: projectId,
      employee: costCode.employee,
      punchInDistance: ((costCode.punch && costCode.punch.PunchInDistance) ? costCode.punch.PunchInDistance : 0),
      punchOutDistance: ((costCode.punch && costCode.punch.PunchOutDistance) ? costCode.punch.PunchOutDistance : 0)
      // systemPhrase: ''
    };

    return result;
  }
}
