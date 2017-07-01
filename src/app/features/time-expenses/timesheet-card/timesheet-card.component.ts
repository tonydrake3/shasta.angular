import { Component, Input } from '@angular/core';

import { WeekDateRange, WeekDateRangeDetails } from '../../../models/Date';
import { Timecard, TimecardSection } from './timecard.model';

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
    selector: 'esub-timesheet-card',
    templateUrl: './timesheet-card.component.html'
})
export class TimesheetCardComponent {
  @Input() loading: boolean;

  public timecards: Array<Timecard>;    // the built cards, what the template will display
  public dateRange: Array<WeekDateRangeDetails>;    // builds the 7 day week based on input dateRange

  public entityLookupTable: Array<any>;   // local lookup table for entities (Employee, Project) built during timecard buildup
  public moment = moment;

  constructor() {
    this.timecards = [new Timecard()];    // so we have one card to display loader
  }

  // build timesheets from timerecords, timerecords should already be pre-filtered for date & user
    // valid groupBy is 'employee' or 'project'
  public buildTimesheets(timerecords: Array<any>, dateRange: WeekDateRange, groupTimesheetsBy: string) {

    this.entityLookupTable = [];

    // build date labels
    this.dateRange = this.buildWeekDateRangeDetails(dateRange);

    // filter results by date
    timerecords = _.filter(timerecords, timerecord => {
      return dateRange.startDate.isSameOrBefore(timerecord.Hours.Date) &&
        dateRange.endDate.isSameOrAfter(timerecord.Hours.Date);
    });

    // build dictionary based on grouping
    const groupedTimerecords = _.groupBy(timerecords, timerecord => {
      let accessor: string;

      if (groupTimesheetsBy === 'employee') {
        accessor = 'Employee';
      } else {
        accessor = 'Project';
      }

      this.saveEntity(timerecord, accessor);
      return timerecord[accessor].Id;
    });

    const cards = new Array<any>();
    // one groupedTimerecord equates to one Timecard
    for (const key in groupedTimerecords) {
      if (groupedTimerecords.hasOwnProperty(key)) {
        cards.push({
          cardTitle: this.getEntityName(key),
          subTitle: this.entityLookupTable[key].Title,
          sections: this.buildSections(groupedTimerecords[key], groupTimesheetsBy)
        });
      }
    }

    // insert Hour objects at each nesting level and organize
    this.timecards = this.buildTimecard(cards);
    console.log('THIS.TIMECARDS', this.timecards);
  }

  // attaches an hours @ day object (plus other supplemantary info inside that), attached to each group, at each grouping level
  buildTimecard(cards: Array<any>): Array<any> {

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
                  this.dateRange.forEach(date => {
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

  // creates sections (within a project or employee)
  buildSections(timerecords: Array<any>, groupTimesheetsBy: string) {

    const sections = Array<TimecardSection>();

    // build full details, to then group against
    timerecords.forEach(timerecord => {
      this.saveEntity(timerecord, 'Employee');
      this.saveEntity(timerecord, 'Project');
      this.saveEntity(timerecord, 'SystemPhase');
      this.saveEntity(timerecord, 'CostCode');

      // console.log('TIMERECORD.TIMERECORDSTATUS', timerecord.TimeRecordStatus)

      sections.push({
        grouping: groupTimesheetsBy === 'employee' ? this.getEntityName(timerecord.Project.Id) : this.getEntityName(timerecord.Employee.Id),
        systemPhase: timerecord.SystemPhase ? this.getEntityName(timerecord.SystemPhase.Id) : 'Unknown',
        costCode: timerecord.CostCode ? this.getEntityName(timerecord.CostCode.Id) : 'Unknown',
        hours: timerecord.Hours,
        status: timerecord.TimeRecordStatus,
        comments: timerecord.Comments
      });
    });

    // group by grouping (anti employee/project), then system-phase, then costCode
    const groupedSections: any = _.groupBy(sections, 'grouping');

    // group by system-phase
    for (const systemPhaseKey in groupedSections) {
      if (groupedSections.hasOwnProperty(systemPhaseKey)) {
        const system: any = _.groupBy(groupedSections[systemPhaseKey], 'systemPhase');

        //  group by costCode
        for (const costCodeKey in system) {
          if (system.hasOwnProperty(costCodeKey)) {
            system[costCodeKey] = _.groupBy(system[costCodeKey], 'costCode');
          }
        }

        groupedSections[systemPhaseKey] = system;
      }
    }

    return groupedSections;
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

  // saves guid based entity to local lookup table for easy reference
  saveEntity(timerecord: any, accessor: string) {
    if (!timerecord[accessor]) {
      return;
    }
    if (this.entityLookupTable[timerecord[accessor].Id]) {
      // if already there, merge incase there's more data
      _.assign(this.entityLookupTable[timerecord[accessor].Id], [timerecord[accessor]]);
    } else {
      // or just save it to the lookup table
      this.entityLookupTable[timerecord[accessor].Id] = timerecord[accessor];
    }
  }

  // returns a formatted entity name for an Employee or a Project
  getEntityName(Id: string): string {
    let name = '';

    if (this.entityLookupTable[Id]) {
      if (this.entityLookupTable[Id].FirstName || this.entityLookupTable[Id].LastName) {
        name = this.entityLookupTable[Id].FirstName + ' ' + this.entityLookupTable[Id].LastName
      } else if (this.entityLookupTable[Id].Name) {
        name = this.entityLookupTable[Id].Name;
      } else {
        name = 'Unknown';
      }
    } else {
      name = 'Unknown';
    }

    return name;
  }

  // mark all checkboxes for row
  markAll(costCode: any, toggle: boolean) {
    for (const dayKey in costCode.days) {
      if (costCode.days.hasOwnProperty(dayKey)) {
        const day = costCode.days[dayKey];
        if (day.hours !== 0) {
          day.selected = toggle;
        }
      }
    }
  }
}
