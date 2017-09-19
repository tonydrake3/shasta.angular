import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import { HomeService } from '../home.service'

@Directive({ selector: '[esubOpenSearchOverlay]' })

export class OpenSearchOverlaylDirective implements AfterViewInit {

    constructor(private el: ElementRef, private homeService: HomeService) {}


    ngAfterViewInit() {
        const $el = $(this.el.nativeElement);
        const $body = $('#body');

        $el.on('click', (e) => {
            this.openOverlay();
        });
    }

    openOverlay () {
        this.homeService.updateSearchOverlayState('open')
    }

}
