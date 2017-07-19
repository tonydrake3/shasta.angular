import {Directive, ElementRef, AfterViewInit, OnInit, OnDestroy} from '@angular/core';
import {DataSyncService} from '../../shared/services/data-sync.service';

@Directive({ selector: '[esubAccordionNav]' })

export class AccordionNavDirective implements OnInit, AfterViewInit, OnDestroy {
    el: ElementRef;
    _syncSubscription;

    constructor(el: ElementRef, private _dataSync: DataSyncService) {
        this.el = el;
    }

    ngOnInit () {

        this._syncSubscription = this._dataSync.project$
            .subscribe(
                (project) => {

                    if (project) {

                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    ngAfterViewInit() {
        // on click, open it's own ul, close sibling li opened ul & sub ul
        // on click, close it's own ul & sub ul

        const $nav = $(this.el.nativeElement);
        const slideTime = 250;
        const $lists = $nav.find('ul.submenu').parent('li');
        $lists.append('<i class="material-icons icon-has-ul">keyboard_arrow_down</i>');

        const $values = $nav.find('ul.forward').parent('li');
        $values.append('<i class="material-icons icon-has-ul">arrow_forward</i>');

        const $As = $lists.children('a');


        // Disable a link that has ul
        $As.on('click', function(event) {
            event.preventDefault();
        });

        // Accordion nav
        $nav.on('click', function(e) {

            const target = e.target;
            const $parentLi = $(target).closest('li'); // closest, insead of parent, so it still works when click on i icons
            if (!$parentLi.length) return; // return if doesn't click on li
            const $subUl = $parentLi.children('ul');


            // let depth = $subUl.parents().length; // but some li has no sub ul, so...
            const depth = $parentLi.parents().length + 1;

            // filter out all elements (except target) at current depth or greater
            const allAtDepth = $nav.find('ul').filter(function() {
                if ($(this).parents().length >= depth && this !== $subUl.get(0)) {
                    return true;
                }
            });
            allAtDepth.slideUp(slideTime).closest('li').removeClass('open');

            // Toggle target
            if ( $parentLi.has('ul').length ) {
                $parentLi.toggleClass('open');
            }
            $subUl.stop().slideToggle(slideTime);

        })
    }

    ngOnDestroy () {

        this._syncSubscription.unsubscribe();
    }
}
