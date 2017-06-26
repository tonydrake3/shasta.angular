import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WeekDateRange } from '../../models/Date';

import * as moment from 'moment';
import * as _ from 'lodash';

// TODO delete me
import { DEVMockDataService } from '../../shared/DEV-mock-data.service';

@Component({
    selector: 'esub-time-expenses',
    styles: [],
    templateUrl: './time-expenses.component.html'
})
export class TimeExpensesComponent implements OnInit {

  private timerecords: Array<any>; // TODO properly type
  // private timesheets: Array<any>;

  public dateRange: WeekDateRange;

  public view: string;
  public groupTimesheetsBy: string;
  public showFilter: string;

  @ViewChild('timesheets') timesheetsComponent;

  constructor(private devMockDataService: DEVMockDataService, private activatedRoute: ActivatedRoute) {

    //  TODO get data
    // this.timesheets = [];
    this.timerecords = this.devMockDataService.timeRecords;
    // this.groupTimesheets();

    this.groupTimesheetsBy = 'employee';
    this.showFilter = 'all';
  }

  ngOnInit() {
    // read in view param
    // valid entries are timesheets, approve-time, export-time
    this.activatedRoute.params.subscribe(params => {
      this.view = params['view'];
    });
  }

  groupTimesheets(grouping: string) {
    this.groupTimesheetsBy = grouping;
    // grouping done by timesheet-card component
    this.buildTimesheets();
  }

  dateChanged(e) {
    this.dateRange = e;
    // TODO do date range filter on timerecords
    this.buildTimesheets();
  }

  filterResults(filter: string) {
    if (filter) this.showFilter = filter;
    // TODO do mine vs all filter on timerecords
    this.buildTimesheets();
  }

  buildTimesheets() {
    this.timesheetsComponent.buildTimesheets(this.timerecords, this.dateRange, this.groupTimesheetsBy);
  }

  newTimesheet() {}
  copyLastWeekTimesheet() {}
  copyYesterdayTimesheet() {}

  approve() {}
  decline() {}

  exportTime() {}
}
