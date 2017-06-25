import {Directive, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {DataSyncService} from '../../../shared/services/utilities/data-sync.service';

@Directive({ selector: '[esubAutoExpandAccordion]' })
export class AutoExpandAccordionNavDirective implements OnInit, OnDestroy {
    _el: ElementRef;
    _syncSubscription;

    constructor(el: ElementRef, private _dataSync: DataSyncService) {

        this._el = el;
    }

    ngOnInit() {

        this._syncSubscription = this._dataSync.project$
            .subscribe(
                (project) => {

                    // console.log('AccordionNav', project);
                    console.log(this._el);


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
