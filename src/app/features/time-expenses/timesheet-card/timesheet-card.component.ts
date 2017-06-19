import { Component } from '@angular/core';

import { WeekDateRange, WeekDateRangeDetails } from '../../../models/Date';

import * as _ from 'lodash';

@Component({
    selector: 'esub-timesheet-card',
    templateUrl: './timesheet-card.component.html'
})
export class TimesheetCardComponent {

  public timecards: Array<Timecard>;
  public dateRange: Array<WeekDateRangeDetails>;

  // build timesheets from timerecords, timerecords should already be pre-filtered for date & user
    // valid groupBy is 'employee' or 'project'
  public buildTimesheets(timerecords: Array<any>, dateRange: WeekDateRange, groupTimesheetsBy: string) {

    this.dateRange = this.buildWeekDateRangeDetails(dateRange);

    // build dictionary based on grouping
    const groupedTimerecords = _.groupBy(timerecords, timerecord => {
      if (groupTimesheetsBy === 'employee') {
        return timerecord.Employee.Id;
      } else {
        return timerecord.Project.Id;
      }
    });

    this.timecards = new Array<Timecard>();

    for (const key in groupedTimerecords) {
      if (groupedTimerecords.hasOwnProperty(key)) {

        // create card title based on selected grouping
        let cardTitle: string;
        if (groupTimesheetsBy === 'employee') {
          cardTitle = this.getEmployeeName(key);
        } else {
          cardTitle = this.getProjectName(key);
        }
        this.timecards.push({
          cardTitle: cardTitle
        })

      }
    }

    console.log(dateRange);
    console.log(groupedTimerecords);
  }

  buildWeekDateRangeDetails(dateRange: WeekDateRange) {
    console.log('starting range', dateRange);
    const weekDateRangeDetails = new Array<WeekDateRangeDetails>();


    const day = dateRange.startDate.clone();

    while (day.isSameOrBefore(dateRange.endDate, 'days')) {

      // const day = dateRange.startDate;
      // dateRange.startDate = dateRange.startDate.add(1, 'days');

      weekDateRangeDetails.push({
        dayString: day.format('dd'),
        dateString: day.format('MMM. do'),
        date: day
      });

      day.add(1, 'days');
    }

    console.log('built details', weekDateRangeDetails);
    return weekDateRangeDetails;
  }

  /*

  Employee
    group by Employee.Id

    Name; Employee.FirstName + Employee.LastName
    Title; Join employees, Employee.LaborClassId

  Project
    group by Project.Id

    System; Project.System
    Phase; (phase is inside of system, if system is there)

  Common
    Cost Cost
      group by CostCode.Id
      display CostCode.Code

      Iterate across..
        calendar day (from/to)
        roll up of hours
        Comments[].User / Comments[].Value

        time = punch in/out OR direct
          Hours is always the truth
            .Date = date work was performed
            sum(Double, Over, Reg)
          On detail, show Punch data

  */




  // DEV ONLY helper funcs
  /* tslint:disable */
  getEmployeeName(Id: string): string {
    return this.employeeNames[Id];
  }
  getProjectName(Id: string): string {
    return this.projectNames[Id];
  }

  employeeNames = {
    '55827eb4-4d86-4cc0-b202-04b43453ce4d': 'FName1 LName2'
  }

  projectNames = {
    '26f4f8d1-9483-4361-a4d7-9ec8baf2353d': 'Esub Remodel',
    'c6ec990e-1383-44af-800d-b5d9193980fa': 'Jefferson Highschool'
  }

}

class Timecard {
  cardTitle: string
}
