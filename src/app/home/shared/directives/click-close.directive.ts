import { Directive, ElementRef, EventEmitter, HostListener, Input } from '@angular/core';
import {PopoverService} from '../services/popover.service';

@Directive({
    selector: '[esubClickClose]',
})
export class ClickCloseDirective {

    @Input() elementClickHandler: any;
    @Input() outsideClickHandler: any;

    @HostListener('document:click', ['$event'])
    public onClick(event: MouseEvent) {

        if (this._elementRef.nativeElement.contains(event.target)) {

            this.elementClickHandler();
            // Placeholder for cases where you want to handle click on event target
        } else {

            // Case to handle clicking outside of target element.
            this.outsideClickHandler();
        }
    }

    constructor(private _elementRef: ElementRef, private _popoverService: PopoverService) {}

}
