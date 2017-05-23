import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[myAccordionNav]' })

export class AccordionNavDirective {
    el: ElementRef;
    constructor(el: ElementRef) {
        this.el = el;
    }

    ngAfterViewInit() {
        // on click, open it's own ul, close sibling li opened ul & sub ul
        // on click, close it's own ul & sub ul

        const $nav = $(this.el.nativeElement);
        const slideTime = 250;
        const $lists = $nav.find('ul').parent('li');
        $lists.append('<i class="material-icons icon-has-ul">arrow_drop_down</i>');
        const $As = $lists.children('a');


        // Disable a link that has ul
        $As.on('click', function(event) {
            event.preventDefault();
        });

        // Accordion nav
        $nav.on('click', function(e) {

            let target = e.target;
            let $parentLi = $(target).closest('li') // closest, insead of parent, so it still works when click on i icons
            if (!$parentLi.length) return; // return if doesn't click on li
            let $subUl = $parentLi.children('ul')


            // let depth = $subUl.parents().length; // but some li has no sub ul, so...
            let depth = $parentLi.parents().length + 1;
            
            // filter out all elements (except target) at current depth or greater
            let allAtDepth = $nav.find('ul').filter(function() {
                if($(this).parents().length >= depth && this !== $subUl.get(0)) {
                    return true; 
                }
            })
            allAtDepth.slideUp(slideTime).closest('li').removeClass('open');

            // Toggle target 
            if ( $parentLi.has('ul').length ) {
                $parentLi.toggleClass('open');
            }
            $subUl.stop().slideToggle(slideTime);

        })
    }
}





