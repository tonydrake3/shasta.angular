import {Directive, ElementRef, HostListener, ViewContainerRef} from '@angular/core';
import {PopoverService} from '../services/popover.service';

@Directive({
    selector: '[esubClickClose]',
})
export class ClickCloseDirective {

    @HostListener('document:click', ['$event']) onClick(event) {

        if (this._elementRef.nativeElement.contains(event.target)) {

            // Placeholder for cases where you want to handle click on event target
        } else {

            // Case to handle clicking outside of target element.
            this.closePopover(event);
        }
    }

    constructor(private _elementRef: ElementRef, private _popoverService: PopoverService) {}


    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

    private closePopover (event) {

        // Special check to see if notifications button was event target.
        // Check is necessary to prevent closing the notifications pop-up
        if (event.target.offsetParent.id !== 'notifications' && event.target.id !== 'notifications') {

            this._popoverService.closePopover();
        }
    }
}
