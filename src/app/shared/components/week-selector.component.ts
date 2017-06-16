import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { DateFormatterService } from '../../shared/services/utilities/date-formatter.service';

import { FromToDate } from '../../models/Date';

import * as moment from 'moment';

@Component({
  selector: 'esub-week-selector',
  template: `
  <div class="week-selector">
    <i class="material-icons" (click)="weekAdd(-1)">keyboard_arrow_left</i>
    <div>{{fromDate?.format(fromFormat)}}</div> - <div>{{toDate?.format(toFormat)}}</div>
    <i class="material-icons smaller">perm_contact_calendar</i>
    <md-datepicker #datepicker></md-datepicker>
    <i class="material-icons" (click)="weekAdd(1)">keyboard_arrow_right</i>
  </div>
  `,
  providers: [DateFormatterService]
})
export class WeekSelectorComponent {

  @Output() dateChange: EventEmitter<FromToDate>;
  public fromDate: moment.Moment;
  public toDate: moment.Moment;

  public fromFormat = 'MMM. Do';
  public toFormat = 'MMM. Do, YYYY';

  private startOfWeekOffset = 0;

  // @ViewChild('datepicker') dp: MdDatepicker<Date>;

  constructor(private dateFormatterService: DateFormatterService) {
    this.dateChange = new EventEmitter<FromToDate>();

    this.fromDate = moment().startOf('week').add(this.startOfWeekOffset);
    this.toDate = moment().endOf('week').add(this.startOfWeekOffset);

    this.emit();
  }

  // emits a date change
  emit() {
    this.dateChange.emit({
      fromDate: this.fromDate,
      toDate: this.toDate
    });
  }

  // adds the specific number of weeks and broadcasts
  weekAdd(weeks: number) {
    this.toDate.add(weeks, 'weeks');
    this.fromDate.add(weeks, 'weeks');

    this.emit();
  }
}
