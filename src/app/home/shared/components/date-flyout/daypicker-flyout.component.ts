import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDatePickerConfig} from 'ng2-date-picker';
import {DateFlyoutService} from './date-flyout.service';

@Component({
    selector: 'esub-daypicker-flyout',
    template: `
        <div class="field-flyout" [ngClass]="{ 'no-display' : !open }">
            <dp-day-calendar [(ngModel)]="selectedDates" (ngModelChange)="onDateSelected($event)"
                             [config]="daypickerConfig" [theme]="'dp-material'" ></dp-day-calendar>
        </div>
    `
})
export class DaypickerFlyoutComponent implements OnInit {

    @Input() daypickerConfig: IDatePickerConfig;
    @Input() selectedDates;
    @Output() selectedDatesChange = new EventEmitter<any>();

    // Private
    public open = false;

    constructor (elementRef: ElementRef, private _flyoutService: DateFlyoutService) {}

    ngOnInit () {

        this._flyoutService.isOpen$

            .subscribe(

                (open) => {

                    this.open = open;
                }
            );
    }

    onDateSelected (event) {

        this.selectedDatesChange.emit(event);
    }
}
