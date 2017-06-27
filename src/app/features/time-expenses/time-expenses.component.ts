import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BaseComponent } from '../../shared/components/base.component';
import { WeekDateRange } from '../../models/Date';

import { TimesheetCardComponent } from './timesheet-card/timesheet-card.component';

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
    selector: 'esub-time-expenses',
    styles: [],
    templateUrl: './time-expenses.component.html'
})
export class TimeExpensesComponent extends BaseComponent implements OnInit {

  private timerecords: Array<any>; // TODO properly type

  public dateRange: WeekDateRange;

  public view: string;
  public groupTimesheetsBy: string;
  public showFilter: string;

  @ViewChild('timesheets') timesheetsComponent: TimesheetCardComponent;

  constructor(protected injector: Injector, private activatedRoute: ActivatedRoute) {
    super(injector, [
      { service: 'TimeRecordsService', callback: 'timeRecordsCallback' }
    ]);

    console.log('CONSTRUCTOR');
    // TODO build loader until our callback fires

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

  timeRecordsCallback(timerecords) {
    this.timerecords = timerecords;
    console.log('THIS.TIMERECORDS', this.timerecords);
    this.buildTimesheets();
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
