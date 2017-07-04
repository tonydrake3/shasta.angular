import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
import 'jquery-slimscroll/jquery.slimscroll.min.js';

@Directive({ selector: '[esubSlimScroll]' })

export class SlimScrollDirective implements AfterViewInit {
    @Input() scrollHeight: string;
    el: ElementRef;

    constructor(el: ElementRef) {
        this.el = el;
    }

    ngAfterViewInit() {
        const $el = $(this.el.nativeElement);

        (<any>$el).slimScroll({
            height: this.scrollHeight || '100%'
        });
    }
}
