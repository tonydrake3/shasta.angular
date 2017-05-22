import { Directive, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Directive({ selector: '[myHighlightActiveItems]' })

export class HighlightActiveItemsDirective {
    constructor(private el: ElementRef, private location: Location, private router: Router) {}

    ngAfterViewInit() {
        const $el = $(this.el.nativeElement);
        let $links = $el.find('a');

        function highlightActive(links) {
            let path = location.hash
            // console.log(path);

            links.each( (i, link) => {
                let $link = $(link);
                let $li = $link.parent('li');
                let href = $link.attr('href');
                // console.log(href);

                if ($li.hasClass('active')) {
                    $li.removeClass('active');
                }
                if (path.indexOf(href) === 0) {
                    $li.addClass('active');
                }
            } )
        }

        highlightActive($links);

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            highlightActive($links);
        });
    }
}

