import { Component } from '@angular/core';

@Component({
  templateUrl: './timesheets.component.html'
})
export class TimesheetsComponent {

  public groupingTabs: Array<GroupingTab>;
  public tabStartingIndex: number;

  public fromDate: string;
  public toDate: string;

  constructor() {
    // Setup tabs
    this.groupingTabs = [
       { label: 'date' },
       { label: 'employee' },
       { label: 'project' },
       { label: 'cost code' }];
     this.tabStartingIndex = 0;

    //  TODO get data

    // Group by selection
    this.groupTimesheetsBy({index: this.tabStartingIndex});
  }

  groupTimesheetsBy(selectedTab: any) {
    const tab: GroupingTab = this.groupingTabs[selectedTab.index];
    console.log('group by', tab.label);
  }
}

class GroupingTab {
  label: string;
}
