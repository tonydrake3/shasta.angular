import { Directive, ElementRef, HostListener } from '@angular/core';
import * as _ from 'lodash';

import { DateFlyoutService } from '../components/date-flyout/date-flyout.service';

@Directive({
    selector: '[esubCloseDateFlyout]',
})
export class CloseDateFlyoutDirective {

    private _el: ElementRef;

    @HostListener('document:click', ['$event'])
    public onClick(event) {

        // console.log(this._el.nativeElement.querySelectorAll('button'));

        if (this._el.nativeElement.contains(event.target)) {

            // console.log('Click Inside', event.target, this._el.nativeElement);
            this._dateFlyoutService.openDateFlyout();
            // Placeholder for cases where you want to handle click on event target
        } else {

            if (!event.target.classList.contains('dp-calendar-day')) {

                this._dateFlyoutService.closeDateFlyout();
            }
            // Case to handle clicking outside of target element.
            // this.outsideClickHandler();
        }
    }

    constructor(private elementRef: ElementRef, private _dateFlyoutService: DateFlyoutService) {

        this._el = elementRef;
    }

}
