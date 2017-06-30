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
// export class TimeExpensesComponent extends BaseComponent implements OnInit {
export class TimeExpensesComponent implements OnInit {

  private timerecords: Array<any>; // TODO properly type

  public dateRange: WeekDateRange;

  public view: string;
  public groupTimesheetsBy: string;
  public showFilter: string;

  public loading: boolean;

  @ViewChild('timesheets') timesheetsComponent: TimesheetCardComponent;

  constructor(protected injector: Injector, private activatedRoute: ActivatedRoute) {
    // super(injector, [
    //   { service: 'TimeRecordsService', callback: 'timeRecordsCallback' }
    // ]);

    // this.loading = true;

    this.groupTimesheetsBy = 'employee';
    this.showFilter = 'all';
  }

  ngOnInit() {
    // read in view param
    // valid entries are timesheets, approve-time, export-time
    this.activatedRoute.params.subscribe(params => {
      this.view = params['view'];
    });
    // this.buildTimesheets();
  }

  timeRecordsCallback(response) {
    // this.loading = false;
    // this.timerecords = response.Value;
    // this.buildTimesheets();
  }

  groupTimesheets(grouping: string) {
    this.groupTimesheetsBy = grouping;
    // grouping done by timesheet-card component
    this.buildTimesheets();
  }

  dateChanged(e) {
    this.dateRange = e;
    // TODO do date range filter on timerecords
    // if (this.loading) return;
    this.buildTimesheets();
  }

  filterResults(filter: string) {
    if (filter) this.showFilter = filter;
    // TODO do mine vs all filter on timerecords
    this.buildTimesheets();
  }

  buildTimesheets() {
    this.timesheetsComponent.buildTimesheets(fakeTimeRecords, this.dateRange, this.groupTimesheetsBy);
    // this.timesheetsComponent.buildTimesheets(this.timerecords, this.dateRange, this.groupTimesheetsBy);
  }

  newTimesheet() {}
  copyLastWeekTimesheet() {}
  copyYesterdayTimesheet() {}

  approve() {}
  decline() {}

  exportTime() {}
}


const fakeTimeRecords = [
  {
    Employee: {
      Id: 'employjo',
      FirstName: 'Joshua',
      LastName: 'Ohana'
    },
    Project: {
      Id: 'projesub',
      Name: 'Esub'
    },
    CostCode: {
      Id: 'ccplumbing',
      Name: 'Plumbing'
    },
    SystemPhase: {
      Id: 'syspha1',
      Name: 'systema-faz'
    },
    Hours: {
      Date: '2017-06-29T13:15:42.233Z',
      DoubleTime: 0,
      Overtime: 0,
      RegularTime: 2
    },
    TimeRecordStatus: 'Pending',
    Comments: [{
      Id: 'commentjo1',
      Value: 'ima comment',
      User: {
        FirstName: 'Joshua',
        LastName: 'Ohana',
        ProfilePicUrl: 'https://tinyurl.com/luuvldd'
      }
    }]
  },
  {
    Employee: {
      Id: 'employjo',
      FirstName: 'Joshua',
      LastName: 'Ohana'
    },
    Project: {
      Id: 'projesub',
      Name: 'Esub'
    },
    CostCode: {
      Id: 'ccelectrical',
      Name: 'Electrical'
    },
    SystemPhase: {
      Id: 'syspha1',
      Name: 'systema-faz'
    },
    Hours: {
      Date: '2017-06-29T13:15:42.233Z',
      DoubleTime: 0,
      Overtime: 0,
      RegularTime: 6
    },
    TimeRecordStatus: 'Rejected',
    Comments: [{
      Id: 'commentjo1',
      Value: 'ima comment',
      User: {
        FirstName: 'Joshua',
        LastName: 'Ohana',
        ProfilePicUrl: 'https://tinyurl.com/luuvldd'
      }
    }]
  },
  {
    Employee: {
      Id: 'employjo',
      FirstName: 'Joshua',
      LastName: 'Ohana'
    },
    Project: {
      Id: 'projesub',
      Name: 'Esub'
    },
    CostCode: {
      Id: 'ccelectrical',
      Name: 'Electrical'
    },
    SystemPhase: {
      Id: 'syspha1',
      Name: 'systema-faz'
    },
    Hours: {
      Date: '2017-06-28T13:15:42.233Z',
      DoubleTime: 4,
      Overtime: 4,
      RegularTime: 0
    },
    TimeRecordStatus: 'Pending',
    Comments: [{
      Id: 'commentjo1',
      Value: 'ima comment',
      User: {
        FirstName: 'Joshua',
        LastName: 'Ohana',
        ProfilePicUrl: 'https://tinyurl.com/luuvldd'
      }
    }]
  },
  {
    Employee: {
      Id: 'employat',
      FirstName: 'Alex',
      LastName: 'Takabayashi'
    },
    Project: {
      Id: 'projesub',
      Name: 'Esub'
    },
    CostCode: {
      Id: 'ccelectrical',
      Name: 'Electrical'
    },
    SystemPhase: {
      Id: 'syspha1',
      Name: 'systema-faz'
    },
    Hours: {
      Date: '2017-06-26T13:15:42.233Z',
      DoubleTime: 0,
      Overtime: 0,
      RegularTime: 8
    },
    TimeRecordStatus: 'Approved',
    Comments: [{
      Id: 'commentjo1',
      Value: 'ima comment',
      User: {
        FirstName: 'Joshua',
        LastName: 'Ohana',
        ProfilePicUrl: 'https://tinyurl.com/luuvldd'
      }
    }]
  },

]

// Pending,
