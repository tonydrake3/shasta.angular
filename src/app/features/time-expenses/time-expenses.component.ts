import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DateFormatterService } from '../../shared/services/utilities/date-formatter.service';

import * as moment from 'moment';
import * as _ from 'lodash';

// TODO delete me
import { DEVMockDataService } from '../../shared/DEV-mock-data.service';

@Component({
    selector: 'esub-time-expenses',
    styles: [],
    templateUrl: './time-expenses.component.html',
    providers: [DateFormatterService]
})
export class TimeExpensesComponent implements OnInit {

  private timerecords: Array<any>; // TODO properly type
  private timesheets: Array<any>;

  public startDate: moment.Moment;
  public endDate: moment.Moment;

  public view: string;

  constructor(private devMockDataService: DEVMockDataService, private activatedRoute: ActivatedRoute,
    private dateFormatterService: DateFormatterService) {

    //  TODO get data
    this.timesheets = [];
    this.timerecords = this.devMockDataService.timeRecords;
    this.groupTimesheets();
  }

  ngOnInit() {
    // read in view param
    // valid entries are timesheets, approve-time, export-time
    this.activatedRoute.params.subscribe(params => {
      this.view = params['view'];
    });
  }

  // TODO something useful
  groupTimesheets() {
    this.timerecords.forEach(timeRecord => {
      const timeSheet = [];
      timeSheet['fullName'] = timeRecord.Employee.FirstName + ' ' + timeRecord.Employee.LastName;
      this.timesheets.push(timeSheet);
    });
  }

  dateChanged(e) {
    this.startDate = e.startDate;
    this.endDate = e.endDate;
  }

  newTimesheet() {}
  copyLastWeekTimesheet() {}
  copyYesterdayTimesheet() {}

  approve() {}
  decline() {}

  exportTime() {}
}
