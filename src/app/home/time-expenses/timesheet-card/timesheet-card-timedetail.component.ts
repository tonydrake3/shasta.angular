import { Comment } from './../../../models/time/TimeRecord';
import { TimeExpensesService } from './../time-expenses.service';
import { TimeRecordsService } from './../time-records.service';
import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { MessageService } from './timesheet-card.message';
import { Timecard, HoursApproval, WeekDayHours } from './timecard.model';
import {
  Component,
  Input,
  Inject,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Punch } from '../../../models/domain/Punch';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';
import { projectSidebarConfiguration } from '../../shared/configuration/menu.configuration';
import { ProjectSummaryService } from '../../projects/project-summary/project-summary.service';
import { MapsService } from '../../shared/services/maps.service';
import { OnChanges } from '@angular/core';
import {ReloadType} from '../../../models/ReloadType';

@Component({
  selector: 'esub-timedetails',
  templateUrl: 'timesheet-card-timedetail.component.html',
  styles: [
    `
        .punch {
            disabled: disabled cursor:none;
        }
        ,
        .PunchWidth {
            width: 15px;
        }`
  ]
})
export class TimeCardTimeDetailComponent
  implements OnInit, AfterViewInit, OnChanges {
  public TimeDetailsGroup: FormGroup;

  public hoursApproval: HoursApproval;
  public timecard: Timecard;

  public status: any;

  public projectId: string;

  public punch: Punch;

  public comments: any[];

  public isComment: boolean;

  @ViewChild('myInput') _inputElement: ElementRef;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<TimeCardTimeDetailComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private timeExpensesService: TimeExpensesService,
    private timeRecordsService: TimeRecordsService,
    private _projectSummaryService: ProjectSummaryService,
    private _maps: MapsService,
    private _messageService: MessageService<ReloadType>
  ) {
    this.hoursApproval = data.hoursApproval;
    this.timecard = data.targetTimecard;
  }

  ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.buildGoogleMap();
    this.TimeDetailsGroup = this.fb.group({});
    this.BuildFbGroup();
    this._inputElement.nativeElement.focus();
  }

  ngOnChanges(changeRecord: any) {
    const temp = changeRecord;
  }

  ngAfterViewInit() {
    this._inputElement.nativeElement.focus();
  }
  onReject(event) {
    this._inputElement.nativeElement.focus();
  }
  private BuildFbGroup(): void {
    let punchIn: any;
    let punchOut: any;
    let note = '';

    if (this.hoursApproval.punchIn) {
      punchIn = moment(this.hoursApproval.punchIn).format('hh:mm:ss A');
    }
    if (this.hoursApproval.punchOut) {
      punchOut = moment(this.hoursApproval.punchOut).format('hh:mm:ss A');
    }

    note = this.hoursApproval.note;

    const commentArray = this.hoursApproval.comments;

    const commentArraySorted = _.sortBy(commentArray, function(value) {
      return value['Timestamps'].Updated;
    });

    const commentArraySortedDesc = commentArraySorted.reverse();

    this.comments = [];

    this.comments = commentArraySortedDesc;

    this.TimeDetailsGroup = this.fb.group({
      punchIn: [{ value: punchIn, disabled: true }],
      punchOut: [{ value: punchOut, disabled: true }],
      regularTime: [this.hoursApproval.Regulartime, Validators.required],
      overTime: [this.hoursApproval.Overtime],
      doubleTime: [this.hoursApproval.Doubletime],
      note: [note || ''],
      comment: [''],
      status: [this.hoursApproval.status]
    });

    this.TimeDetailsGroup
      .get('status')
      .valueChanges.subscribe((status: string) => {
        if (status === 'Rejected') {
          this.TimeDetailsGroup
            .get('comment')
            .setValidators([Validators.required]);
          this.isComment = true;
          this._inputElement.nativeElement.focus();
        } else {
          this.TimeDetailsGroup.get('comment').setValidators([]);
          this.isComment = false;
        }
        this.TimeDetailsGroup.get('comment').updateValueAndValidity();
      });
  }

  public onSelectedStatus(event) {
    this.status = event;
    this.BuildFbGroup();
  }

  public onSubmit({ value, valid }: { value: any; valid: boolean }) {
    if (!valid) return;

    this.hoursApproval.note = value.note;
    switch (value.status) {
      case 'Approved':
        this.hoursApproval.isRejected = false;
        this.hoursApproval.isSelected = true;
        this.hoursApproval.status = 'Approved';
        this.timeApprove(value);

        break;
      case 'Rejected':
        this.hoursApproval.isRejected = true;
        this.hoursApproval.isSelected = false;
        this.hoursApproval.status = 'Rejected';
        this.timeReject(value.comment);
        break;
      case 'Pending': // No change
        this.hoursApproval.isRejected = false;
        this.timeUpdate(value);
        break;
    }

    this.dialogRef.close({ data: this.hoursApproval });
  }

  private buildGoogleMap(): void {
    this.projectId = this.hoursApproval.projectId;

    if (this.projectId && this.projectId !== '') {
      this.punch = this.hoursApproval.punch;

      this._projectSummaryService.config(this.projectId);
      this._projectSummaryService.getLatest().then(result => {
        const location = result.Value[0].Address;

        this._maps.setAddress(
          location.Address1 + ', ' + location.City + ', ' + location.State
        );
      });
    }
  }

  private timeApprove(data): void {
    const entity: any = {
      TimeRecordIds: [this.hoursApproval.TimeRecordId]
    };

    this.timeExpensesService.timeApprove(entity).subscribe(resp => {
      const result = resp;
      if (result === 200) {
        this.hoursApproval.isRejected = false;
        this.hoursApproval.isSelected = true;
        this.hoursApproval.status = 'Approved';

        this._messageService.sendMessage(ReloadType.approved);
      }
    });
  }
  private timeReject(data): void {
    const entity: any = {
      RejectionComment: {
        value: data
      },
      TimeRecordIds: [this.hoursApproval.TimeRecordId]
    };

    // Add comments
    const timestamps = {
      Updated: moment().toISOString()
    };

    const comment = {
      Value: data,
      CommentType: 'Rejection',
      Timestamps: timestamps
    };

    this.hoursApproval.comments = _.concat(
      this.hoursApproval.comments,
      comment
    );

    this.timeExpensesService.timeReject(entity).subscribe(resp => {
      const result = resp;
      if (result === 200) {
        this._messageService.sendMessage(ReloadType.rejected);
      }
    });
  }
  private timeUpdate(data): void {
    const entity: any = {
      Hours: {
        Regulartime: data.regularTime,
        Overtime: data.overTime,
        Doubletime: data.doubleTime,
        Date: moment().toISOString()
      },
      id: this.hoursApproval.TimeRecordId
    };

    this.UpdateHoursApproval(data);

    this.timeExpensesService.timeUpdate(entity).subscribe(resp => {
      const result = resp;
      if (result === 200) {
      }
    });
  }

  private UpdateHoursApproval(data): void {
    if (data) {
      this.hoursApproval.Regulartime = data.regularTime;
      this.hoursApproval.Overtime = data.overTime;
      this.hoursApproval.Doubletime = data.doubleTime;
      this.hoursApproval.status = 'Pending';

      this.hoursApproval.hourlyValues = (Number(data.regularTime) +
        Number(data.overTime) +
        Number(data.doubleTime)
      ).toString();

      const day = moment(this.hoursApproval.day).format('MM-DD-YYYY');

      const weekDayHours: WeekDayHours = _.find(
        this.timecard.WeekDayHours,
        function(o) {
          return o.date.format('MM-DD-YYYY') === day;
        }
      );
      if (weekDayHours) {
        weekDayHours.hours = (Number(data.regularTime) +
          Number(data.overTime) +
          Number(data.doubleTime)
        ).toString();
      }
    }
  }
  public Close(event) {
    event.preventDefault();
    this.dialogRef.close();
  }
}
