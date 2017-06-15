import { Component, Input, Output, EventEmitter } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'esub-week-selector',
  template: `
  <div class="week-selector">
    <i class="material-icons" (click)="weekAdd(-1)">keyboard_arrow_left</i>
    <div>{{toDate}}</div>
    <i class="material-icons smaller">perm_contact_calendar</i>
    <i class="material-icons" (click)="weekAdd(1)">keyboard_arrow_right</i>
  </div>
  `
})
export class WeekSelectorComponent {
  @Input() toDate: number;
  @Output() toDateChange: EventEmitter<number>;

  // public fromDate: string;
  // @Output() fromDateChange: EventEmitter<any>;

  constructor() {
    this.toDateChange = new EventEmitter<number>();
  }

  weekAdd(weeks: number) {
    this.toDate = this.toDate + weeks;
    this.toDateChange.emit(this.toDate);
  }
}
