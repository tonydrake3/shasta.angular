import { Directive, ElementRef, Input } from '@angular/core';


@Directive({ selector: '[myToggleQuickview]' })

export class ToggleQuickviewDirective {
    @Input() myToggleQuickview: string;

    el: ElementRef;
    constructor(el: ElementRef) {
        this.el = el;
    }

    ngAfterViewInit() {
        const $el = $(this.el.nativeElement);
        const $body = $('#body');
        const target = this.myToggleQuickview;
        let qvClass = 'quickview-open';

        if (target) {
            qvClass = qvClass + '-' + target;
        }

        $el.on('click', function(e) {
            $body.toggleClass(qvClass);
            e.preventDefault();
        });
    }
}
