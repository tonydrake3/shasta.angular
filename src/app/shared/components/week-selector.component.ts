import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { MaterialModule, MdDatepickerModule, MdDatepicker } from '@angular/material';

import { WeekDateRange } from '../../models/Date';

import * as moment from 'moment';

@Component({
  selector: 'esub-week-selector',
  template: `
  <div class="week-selector">
    <i class="material-icons" (click)="weekAdd(-1)" id='esub-week-selector.previous-week'>keyboard_arrow_left</i>
    <div>{{dateRange?.startDate?.format(startDateFormat)}}</div> - <div>{{dateRange?.endDate?.format(endDateFormat)}}</div>
    <i class="material-icons smaller" (click)="datepicker.open()" id='esub-week-selector.open-calendar'>perm_contact_calendar</i>
    <input mdInput [mdDatepicker]="datepicker">
    <md-datepicker #datepicker [startAt]="dateRange?.startDate?.toDate()" (selectedChanged)=calendarDateSelected($event)></md-datepicker>
    <i class="material-icons" (click)="weekAdd(1)" id='esub-week-selector.next-week'>keyboard_arrow_right</i>
  </div>
  `
})
export class WeekSelectorComponent implements OnInit {

  @Output() dateChange: EventEmitter<WeekDateRange>;
  public dateRange: WeekDateRange;
  public datepickerDate: Date;

  public startDateFormat = 'MMM. Do';
  public endDateFormat = 'MMM. Do, YYYY';

  public startOfWeekOffset = 0;

  constructor() {
    this.dateChange = new EventEmitter<WeekDateRange>();

    this.dateRange = {
      startDate: moment().startOf('week').add(this.startOfWeekOffset),
      endDate: moment().endOf('week').add(this.startOfWeekOffset)
    }
  }

  ngOnInit() {
    this.emit();
  }

  // emits a date change
  emit() {
    this.dateChange.emit({
      startDate: this.dateRange.startDate,
      endDate: this.dateRange.endDate
    });
  }

  // handler for user select date from calendar picker
  calendarDateSelected($event) {
    const selectedDate = moment($event).add(this.startOfWeekOffset);

    this.dateRange.startDate = moment(selectedDate).startOf('week');
    this.dateRange.endDate = moment(selectedDate).endOf('week');

    this.emit();
  }

  // adds the specific number of weeks and broadcasts
  weekAdd(weeks: number) {
    this.dateRange.startDate.add(weeks, 'weeks');
    this.dateRange.endDate.add(weeks, 'weeks');

    this.emit();
  }
}
