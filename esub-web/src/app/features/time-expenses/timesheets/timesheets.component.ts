import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

// TODO delete me
import { DEVMockDataService } from '../../../shared/DEV-mock-data.service';

@Component({
  templateUrl: './timesheets.component.html'
})
export class TimesheetsComponent implements OnInit {

  private timeRecords: Array<any>; // TODO properly type
  private timeSheets: Array<any>;

  public groupingTabs: Array<GroupingTab>;
  public tabStartingIndex: number;

  public fromDate: string;
  public toDate: string;

  constructor(private devMockDataService: DEVMockDataService) {
    // Setup tabs
    this.groupingTabs = [
       { label: 'date' },
       { label: 'employee' },
       { label: 'project' },
       { label: 'cost code' }];
     this.tabStartingIndex = 0;

    //  TODO get data
    this.timeSheets = [];


    // TODO move to real data
    // Get timeRecords
    this.timeRecords = this.devMockDataService.timeRecords;
    console.log('set time records', this.timeRecords.length);
  }

  ngOnInit() {
    // Group by selection
    this.groupTimesheetsBy({index: this.tabStartingIndex});
  }

  groupTimesheetsBy(selectedTab: any) {
    const tab: GroupingTab = this.groupingTabs[selectedTab.index];
    console.log('group by', tab.label);

    //

    this.timeRecords.forEach(timeRecord => {
      const timeSheet = [];
      timeSheet['fullName'] = timeRecord.Employee.FirstName + ' ' + timeRecord.Employee.LastName;
      this.timeSheets.push(timeSheet);
    });
  }

  newTimesheet() {}
  copyLastWeekTimesheet() {}
  copyYesterdayTimesheet() {}
}

class GroupingTab {
  label: string;
}
