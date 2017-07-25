import {Directive, ElementRef, HostListener, ViewContainerRef} from '@angular/core';
import {PopoverService} from '../services/popover.service';

@Directive({
    selector: '[esubClickClose]',
})
export class ClickCloseDirective {

    @HostListener('document:click', ['$event']) onClick(event) {

        if (this._elementRef.nativeElement.contains(event.target)) {
            // console.log('ClickCloseDirective inside', event, this._elementRef);
        } else {
            console.log('ClickCloseDirective outside', event, this._elementRef, event.target.contains('notificationButton'));
            // this.closePopover();
        }
    }

    constructor(private _elementRef: ElementRef, private _popoverService: PopoverService) {

        console.log('ElementRef', this._elementRef);
    }

    closePopover () {

        if (this._elementRef.nativeElement.className.indexOf('popover') > -1) {

            this._popoverService.closePopover();
        }
    }
}
