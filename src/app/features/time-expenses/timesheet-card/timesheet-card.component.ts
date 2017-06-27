import { Component, Input } from '@angular/core';

import { WeekDateRange, WeekDateRangeDetails } from '../../../models/Date';

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
    // timerecords = _.filter(timerecords, timerecord => {
    //   return dateRange.startDate.isSameOrBefore(timerecord.Hours.Date) &&
    //     dateRange.endDate.isSameOrAfter(timerecord.Hours.Date);
    // });
    // console.log('TIMERECORDS', timerecords)

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

    // console.log('GROUPEDTIMERECORDS', groupedTimerecords);
    console.log('ENTITYLOOKUPTABLE', this.entityLookupTable);

    this.timecards = new Array<Timecard>();

    // one groupedTimerecord equotes to one Timecard
    for (const key in groupedTimerecords) {
      if (groupedTimerecords.hasOwnProperty(key)) {
        this.timecards.push({
          cardTitle: this.getEntityName(key),
          subTitle: this.entityLookupTable[key].Title,
          sections: this.buildSections(groupedTimerecords[key], groupTimesheetsBy)
        });
      }
    }
  }

  buildSections(timerecords: Array<any>, groupTimesheetsBy: string): Array<TimecardSection> {

    console.log(timerecords);
    const sections = Array<TimecardSection>();

    timerecords.forEach(timerecord => {
      this.saveEntity(timerecord, 'Employee');
      this.saveEntity(timerecord, 'Project');
      this.saveEntity(timerecord, 'CostCode');

      sections.push({
        grouping: groupTimesheetsBy === 'employee' ? this.getEntityName(timerecord.Project.Id) : this.getEntityName(timerecord.Employee.Id),
        system: this.getEntityName(timerecord.System.Id),
        phase: this.getEntityName(timerecord.Phase.Id),
        codeCode: this.getEntityName(timerecord.CostCode.Id)
      });
    });

    return sections;
  }

  // builds labels to display date range
  buildWeekDateRangeDetails(dateRange: WeekDateRange) {

    const weekDateRangeDetails = new Array<WeekDateRangeDetails>();
    const day = dateRange.startDate.clone();

    while (day.isSameOrBefore(dateRange.endDate, 'days')) {

      weekDateRangeDetails.push({
        dayString: day.format('dd'),
        dateString: day.format('MMM. Do'),
        date: day
      });

      day.add(1, 'days');
    }

    return weekDateRangeDetails;
  }

  // saves guid based entity to local lookup table for easy reference
  saveEntity(timerecord: any, accessor: string) {
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
}

// internal, not to be confused with TimeRecords, just used to help manage UI
class Timecard {
  cardTitle: string;
  subTitle: string;
  sections: Array<TimecardSection>
}

class TimecardSection {
  grouping: string;  // this ends up being either project or employee, depending on their grouping
  system: string;
  phase: string;
  codeCode: string;
}
