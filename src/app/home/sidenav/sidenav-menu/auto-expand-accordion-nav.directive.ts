import {Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {DataSyncService} from '../../shared/services/data-sync.service';

@Directive({ selector: '[esubAutoExpandAccordion]' })
export class AutoExpandAccordionNavDirective implements OnInit, OnDestroy {
    _el: ElementRef;
    _syncSubscription;
    _renderer;
    _slideTime = 250;

    constructor(renderer: Renderer2, el: ElementRef, private _dataSync: DataSyncService) {

        this._el = el;
        this._renderer = renderer;
    }

    ngOnInit() {

        // console.log('esubAutoExpandAccordion init');
        this._syncSubscription = this._dataSync.project$
            .subscribe(
                (project) => {

                    // console.log('AccordionNav', project);
                    if (this._el.nativeElement.id === '@project') {

                        const projectSummary = this._el.nativeElement.querySelector('li');
                        this._renderer.addClass( projectSummary, 'selected');

                        this._renderer.addClass( this._el.nativeElement, 'open');

                        // TODO: Set Class to toggle menu with animation
                        const submenu = this._el.nativeElement.querySelector('ul');
                        this._renderer.setStyle( submenu, 'display', 'block');

                    }
                },
                (error) => {

                    console.log(error);
                }
            );
    }

    ngOnDestroy () {

        this._syncSubscription.unsubscribe();
    }
}
