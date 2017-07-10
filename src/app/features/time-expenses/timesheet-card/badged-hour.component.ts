import { Component, Input } from '@angular/core';
import { Badges } from './timecard.model';

@Component({
    selector: 'esub-badged-hour',
    template: `
    <div class="badged-hour" [ngClass]="{'card-hours-small-disabled': day.hours == 0}">
      <div class="hour" [ngClass]="{'has-error': day.status == 'Rejected'}">{{day.hours | number:'1.0-2'}}</div>

      <span class="hasComment" *ngIf="day.comments.length > 0 && showBadges.comments">
        <i class="material-icons">chat</i></span>
      <span class="hasMapError" *ngIf="day.mapError && showBadges.mapError">
        <i class="material-icons">place</i></span>

    </div>
    `
})
export class BadgedHourComponent {
  @Input() day;
  @Input() showBadges: Badges;
}
