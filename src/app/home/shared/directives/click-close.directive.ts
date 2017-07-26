import {Directive, ElementRef, EventEmitter, HostListener} from '@angular/core';
import {PopoverService} from '../services/popover.service';

@Directive({
    selector: '[esubClickClose]',
})
export class ClickCloseDirective {

    @HostListener('document:click', ['$event'])

    public onClick(event: MouseEvent) {

        if (this._elementRef.nativeElement.contains(event.target)) {

            // Placeholder for cases where you want to handle click on event target
        } else {

            // Case to handle clicking outside of target element.
            this.handleNotificationsPopover(event);
        }
    }

    constructor(private _elementRef: ElementRef, private _popoverService: PopoverService) {}


    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

    private handleNotificationsPopover (event) {

        // Special check to see if notifications button was event target.
        // Check is necessary to prevent closing the notifications pop-up when opening it for the first time.
        if (event.target.offsetParent.id === 'notifications' || event.target.id === 'notifications'
            || event.target.id === 'notificationsLabel') {

            if (this._popoverService._isOpen$.value) {

                this._popoverService.closePopover();
            } else {

                this._popoverService.openPopover();
            }
        } else {

            this._popoverService.closePopover();
        }
    }
}
