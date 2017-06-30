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
    this.timecards = this.buildTimecardHours(cards);
    console.log('THIS.TIMECARDS', this.timecards);
  }

  // attaches an hours @ day object, attached to each group, at each grouping level
  buildTimecardHours(cards: Array<any>): Array<any> {

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
                  console.log('COSTCODES for', card.cardTitle, costCodes);
                  // each costCode entry here is an array of objects with an hours param (for hours worked on a specific day)
                  // each costCode entry here should eqate to one 'section' within the UI
                  // let's compile this codeCode array into a single obj with all the info we need
                  //     grouping, systemPhase, codeCode, list of each day in week with associated day's comments

                  const finalCostCode = {
                    grouping: costCodes[0].grouping,
                    systemPhase: costCodes[0].systemPhase,
                    costCode: costCodes[0].costCode,
                    hours: {}
                  }

                  // build hours object
                  this.dateRange.forEach(date => {
                    const dateKey = date.date.format('MM-DD-YYYY');
                    finalCostCode.hours[dateKey] = 0;
                  });

                  // sum up hours for use in finalCostCode.hours[dateKey]
                  costCodes.forEach(costCode => {
                    const dateKey = moment(costCode.hours.Date).format('MM-DD-YYYY');
                    finalCostCode.hours[dateKey] += costCode.hours.DoubleTime + costCode.hours.Overtime + costCode.hours.RegularTime;
                  });

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

      sections.push({
        grouping: groupTimesheetsBy === 'employee' ? this.getEntityName(timerecord.Project.Id) : this.getEntityName(timerecord.Employee.Id),
        // system: timerecord.System ? this.getEntityName(timerecord.System.Id) : 'Unknown',
        systemPhase: timerecord.SystemPhase ? this.getEntityName(timerecord.SystemPhase.Id) : 'Unknown',
        costCode: timerecord.CostCode ? this.getEntityName(timerecord.CostCode.Id) : 'Unknown',
        hours: timerecord.Hours
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

  // given a section containing displayHours and a day containing a moment date, return that day's hours
  getHours(section, day): number {
    const hours = section.value.displayHours;
    const retVal = hours[day.date.format('MM-DD-YYYY')];
    return retVal;
  }
}
