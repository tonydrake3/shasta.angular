import { Directive, ElementRef, Input } from '@angular/core';
import 'jquery-slimscroll/jquery.slimscroll.min.js';

@Directive({ selector: '[mySlimScroll]' })

export class SlimScrollDirective {
    el: ElementRef;
    constructor(el: ElementRef) {
        this.el = el;
    }

    @Input() scrollHeight: string;

    ngAfterViewInit() {
        const $el = $(this.el.nativeElement);

        (<any>$el).slimScroll({
            height: this.scrollHeight || '100%'
        });
    }
}