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

  public groupingTabs: Array<GroupingTab>;
  public tabStartingIndex: number;

  public fromDate: moment.Moment;
  public toDate: moment.Moment;

  public view: string;

  constructor(private devMockDataService: DEVMockDataService, private activatedRoute: ActivatedRoute,
    private dateFormatterService: DateFormatterService) {

    // Setup tabs
    this.groupingTabs = [
       { label: 'date' },
       { label: 'employee' },
       { label: 'project' },
       { label: 'cost code' }];
     this.tabStartingIndex = 0;

    //  TODO get data
    this.timesheets = [];


    // TODO move to real data
    // Get timeRecords
    this.timerecords = this.devMockDataService.timeRecords;
    // console.log('set time records', this.timerecords.length);
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');
    // Group by selection
    // TODO refactor out grouping
    this.groupTimesheetsBy({index: this.tabStartingIndex});

    // read in view param
    // valid entries are timesheets, approve-time, export-time
    this.activatedRoute.params.subscribe(params => {
      this.view = params['view'];
    });
  }

  groupTimesheetsBy(selectedTab: any) {
    const tab: GroupingTab = this.groupingTabs[selectedTab.index];
    // console.log('group by', tab.label);

    //

    this.timerecords.forEach(timeRecord => {
      const timeSheet = [];
      timeSheet['fullName'] = timeRecord.Employee.FirstName + ' ' + timeRecord.Employee.LastName;
      this.timesheets.push(timeSheet);
    });
  }

  dateChanged(e) {
    console.log('dateChanged input', e.toDate);
    this.fromDate = e.fromDate;
    this.toDate = e.toDate;
    console.log('after settings', this.toDate);
  }

  newTimesheet() {}
  copyLastWeekTimesheet() {}
  copyYesterdayTimesheet() {}
}

class GroupingTab {
  label: string;
}
