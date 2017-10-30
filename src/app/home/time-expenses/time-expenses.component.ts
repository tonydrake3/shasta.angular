import { Subscription } from 'rxjs/Subscription';
import { MessageService } from './timesheet-card/timesheet-card.message';
import { TimeExpensesService } from './time-expenses.service';
import { TimeRecordsService } from './time-records.service';
import {
  Component,
  OnInit,
  ViewChild,
  Injector,
  AfterViewInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../shared/components/base.component';
import { WeekDateRange } from '../../models/Date';
import { TimesheetCardComponent } from './timesheet-card/timesheet-card.component';
import {
  Timecard,
  TimecardSection,
  HoursApproval
} from './timesheet-card/timecard.model';
import { FlashMessagesService } from 'angular2-flash-messages';

import * as moment from 'moment';
import * as _ from 'lodash';
import {TimeRecordDetailModalComponent} from './time-record-detail-modal/time-record-detail-modal.component';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'esub-time-expenses',
  styles: [],
  templateUrl: './time-expenses.component.html'
})
export class TimeExpensesComponent implements OnInit, AfterViewInit {
  private timerecords: Array<any>; // TODO properly type

  public dateRange: WeekDateRange;

  public view: string;
  public groupTimesheetsBy: string;
  public showFilter: string;
  public loading: boolean;
  public count: any;
  subscription: Subscription;
  public isSelected = false;
  public pin: string;

  @ViewChild('timesheets') timesheetsComponent: TimesheetCardComponent;

  constructor(
    private timeRecordsService: TimeRecordsService,
    private activatedRoute: ActivatedRoute,
    private timeExpensesService: TimeExpensesService,
    private _flashMessagesService: FlashMessagesService,
    protected messageService: MessageService,
    private _dialog: MdDialog
  ) {
    this.loading = true;

    this.groupTimesheetsBy = 'employee';
    this.showFilter = 'all';
  }

  ngOnInit() {
    // read in view param
    // valid entries are timesheets, approve-time, export-time
    this.activatedRoute.params.subscribe(params => {
      this.view = params['view'];
    });
    this.LoadTimecard();

    this.messageService.messageSource$.subscribe((notifcation: any) => {
      let message = '';
      switch (notifcation) {
        case 'approved':
          message =
            ' Well done ! You successfully APPROVED the all timecards that you selected ';
          this.successConfirm(message);
          this._flashMessagesService.grayOut(true);
          break;
        case 'rejected':
          message =
            ' Well done ! You successfully REJECTED the all timecards that you selected ';
          this.failedConfirm(message);
          this.LoadTimecard();
          break;
      }
      console.log('Message: ', notifcation);
    });
  }

  ngAfterViewInit() {}
  public UpdateApprove(date: any): void {
    this.isSelected = date;
    console.log('Picked date: ', date);
  }

  public groupTimesheets(grouping: string) {
    this.groupTimesheetsBy = grouping;
    this.buildTimesheets();
  }

  public dateChanged(e) {
    this.dateRange = e;
    this.buildTimesheets();
  }

  public filterResults(filter: string) {
    if (filter) this.showFilter = filter;
    this.buildTimesheets();
  }

  public buildTimesheets() {
    if (this.loading || !this.timesheetsComponent) return;
    this.timesheetsComponent.buildTimesheets(
      this.timerecords,
      this.dateRange,
      this.groupTimesheetsBy,
      this.showFilter
    );
  }

  newTimesheet() {}
  copyLastWeekTimesheet() {}
  copyYesterdayTimesheet() {}

  private LoadTimecard() {
    this.timeRecordsService.getLatest().then(response => {
      this.loading = false;
      this.timerecords = response.Value;
      this.buildTimesheets();
    });
  }

  public approve(event) {
    event.preventDefault();
    // Check the PIN
    // if (
    //   !this.timesheetsComponent.pin ||
    //   this.timesheetsComponent.pin === '' ||
    //   this.timesheetsComponent.pin !== this.timesheetsComponent.correctPin
    // ) {
    // //  this.pin = this.timesheetsComponent.credentialPIN('', null);
    //   return;
    // }

    this.saveApprove();
  }

  public saveApprove() {
    const timecards = this.timesheetsComponent.timecards;

    const data = this.BuildTimeApprovalRecords(timecards);

    if (!data || !data.TimeRecordIds || data.TimeRecordIds.length === 0) {
      const message =
        '  Please select the checkbox on the time sheet to approve time !';
      this.failedConfirm(message);
      return;
    }
    this.timeExpensesService.timeApprove(data).subscribe(resp => {
      const result = resp;
      if (result === 200) {
        this.LoadTimecard();
        this.isSelected = false;
        const message =
          ' Well done! You successfully approve the all timecards that you selected !';
        this.successConfirm(message);
        this._flashMessagesService.grayOut(true);
      } else {
        const message =
          '  Error !  A problem has been occurred while submitting your data. The Approve Time process is failed, please try it again';
        this.failedConfirm(message);
      }
    });
  }

  private successConfirm(message: string) {
    this._flashMessagesService.show(message, {
      cssClass: 'alert-success',
      timeout: 3000,
      close: true
    });
  }

  private failedConfirm(message: string) {
    this._flashMessagesService.show(message, {
      cssClass: 'alert-danger',
      timeout: 3000,
      close: true
    });
  }
  private BuildTimeApprovalRecords(timecards: Array<Timecard>) {
    const selectedTimeRecords = {
      TimeRecordIds: []
    };

    _.forEach(timecards, timecard => {
      const timecardGrids: Array<HoursApproval> = timecard.timecardGrid;
      if (timecardGrids && timecardGrids.length > 0) {
        _.forEach(timecardGrids, timecardGrid => {
          if (
            !timecardGrid.isRejected &&
            timecardGrid.isSelected &&
            timecardGrid.status.toLowerCase() !== 'approved'
          ) {
            selectedTimeRecords.TimeRecordIds.push(timecardGrid.TimeRecordId);
          }
        });
      }
    });

    this.count = selectedTimeRecords.TimeRecordIds.length;
    return selectedTimeRecords;
  }

  decline() {}

  exportTime() {}

    onTimeRecordClicked(timeRecordId: string) {
        console.log('Clicked TimeRecord Detail. Sending a record with id: ', timeRecordId);
        console.log(this.timerecords);
        const timeRecordsWithProjects = this.timerecords
            .filter((record) => { return record.project });

        console.log(timeRecordsWithProjects);
        const timeRecordToSend = timeRecordsWithProjects.pop() || this.timerecords.pop();
        console.log(timeRecordToSend);
        const timeRecordDetailModalRef = this._dialog.open(TimeRecordDetailModalComponent, {
            data: timeRecordToSend,
            height: '500px',
            width: '800px'
        });
        timeRecordDetailModalRef.afterClosed().subscribe(result => {
            console.log('TimeRecordDetail modal closed.');
        });
    }
}
