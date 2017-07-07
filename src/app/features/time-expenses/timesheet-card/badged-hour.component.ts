import { Component, Input } from '@angular/core';
import { MdDialog } from '@angular/material';

@Component({
    selector: 'esub-badged-hour',
    template: `
    <div class="card-hours-small" [ngClass]="{'card-hours-small-disabled': day.hours == 0}">
      {{day.hours | number:'1.0-2'}}
    </div>
    `
})
export class BadgedHourComponent {
  @Input() day;

  constructor() { }
  // TODO logic to create badges and whatnot

  // blue comment icon (has comment)
  // red dot (rejected)
  // map w/ pin (map error)
}

// status: timerecord.TimeRecordStatus,
// mapError: timerecord.MapLocationError,
// comments: timerecord.Comments



// <i class="material-icons" [ngClass]="{'active': day.value.comments?.length > 0}" (click)="openChatModal(day.value.comments)">chat</i>

// <div [ngClass]="{'hidden': day.value.hours == 0}"class="col-md-1 indicator" *ngFor="let day of costCode.value.days | keys"
//         [ngSwitch]="day.value.status">
//   <div *ngSwitchCase="'Approved'" class="green"></div>
//   <div *ngSwitchCase="'Rejected'" class="red"></div>
//   <div *ngSwitchCase="'Pending'" class="yellow"></div>
//   <div *ngSwitchDefault class="hidden"></div>
// </div>
