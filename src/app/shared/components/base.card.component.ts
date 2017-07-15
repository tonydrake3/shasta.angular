// Base component for a card
// Is intended to be used as a wrapper for your own card's contents, as in
//        <esub-card> content goes here </esub-card>

import { Component, Input } from '@angular/core';

@Component({
    selector: 'esub-base-card',
    template: `
    <div class="esub-base-card">
      <ng-content *ngIf="!loading"></ng-content>
      <md-progress-spinner mode="indeterminate" *ngIf="loading"></md-progress-spinner>
    </div>
    `
})
export class BaseCardComponent {
  @Input() loading: boolean;
}
