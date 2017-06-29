import { Component, Input } from '@angular/core';

import { WeekDateRange, WeekDateRangeDetails } from '../../../models/Date';
import { Timecard, TimecardSection } from './timecard.model';

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
    // console.log('TIMERECORDS', timerecords);
    timerecords = _.filter(timerecords, timerecord => {
      return dateRange.startDate.isSameOrBefore(timerecord.Hours.Date) &&
        dateRange.endDate.isSameOrAfter(timerecord.Hours.Date);
    });
    // console.log('TIMERECORDS', timerecords);

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
    // console.log('ENTITYLOOKUPTABLE', this.entityLookupTable);

    this.timecards = new Array<any>();

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

    console.log('THIS.TIMECARDS', this.timecards)
  }

  buildSections(timerecords: Array<any>, groupTimesheetsBy: string) {

    // console.log('timerecords', timerecords);
    const sections = Array<TimecardSection>();

    // build full details, to then group against
    timerecords.forEach(timerecord => {
      this.saveEntity(timerecord, 'Employee');
      this.saveEntity(timerecord, 'Project');
      this.saveEntity(timerecord, 'CostCode');

      sections.push({
        grouping: groupTimesheetsBy === 'employee' ? this.getEntityName(timerecord.Project.Id) : this.getEntityName(timerecord.Employee.Id),
        system: timerecord.System ? this.getEntityName(timerecord.System.Id) : 'Unknown',
        phase: timerecord.Phase ? this.getEntityName(timerecord.Phase.Id) : 'Unknown',
        codeCode: timerecord.CostCode ? this.getEntityName(timerecord.CostCode.Id) : 'Unknown',
        hours: timerecord.Hours
      });
    });

    // group by grouping (anti employee/project), then system-phase, then costCode
    const groupedSections: any = _.groupBy(sections, 'grouping');

    // group by system-phase
    for (const key in groupedSections) {
      if (groupedSections.hasOwnProperty(key)) {
         const system: any = _.groupBy(groupedSections[key], 'system');

        //  group by costCode
        for (const jey in system) {
          if (system.hasOwnProperty(jey)) {
             system[jey] = _.groupBy(system, 'costCode');
           }
         }

         groupedSections[key] = system;
      }
    }

    console.log('SECTIONS', groupedSections)
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
