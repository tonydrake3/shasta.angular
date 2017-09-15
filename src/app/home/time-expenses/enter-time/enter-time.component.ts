import {Component, Injector, OnInit} from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';


import { BaseComponent } from '../../shared/components/base.component';

// Model Imports
import {Observable} from 'rxjs/Observable';
import {EnterTimeStatusService} from './enter-time-status.service';
import {ConfirmationDialogComponent} from '../../shared/components/confirmation-dialog.component';
import {NavigationCancel, Router} from '@angular/router';
import {ConfirmationDialogService} from '../../shared/services/confirmation-dialog.service';

@Component({
    templateUrl: './enter-time.component.html'
})
export class EnterTimeComponent extends BaseComponent implements OnInit {

    private _isNavigationBlocked: boolean;

    private _timeThreshold = 8;

    // working model to add
    public showGrid: boolean;
    public accordionOpen: boolean;

    // the actual lines we want to create
    private _navCancel: NavigationCancel;

    constructor(private _injector: Injector, private _router: Router) {

        super(_injector, []);

        // TODO: Remove when angular issue 11836 (CanDeactivateChild) is implemented.
        //       https://github.com/angular/angular/issues/11836
        super.inject([
            {
                toInject: ConfirmationDialogService,
                subject: 'isConfirmNeeded$',
                initializer: 'getLatest',
                callback: 'confirmationCallback'
            }
        ]);

        this.accordionOpen = true;
        this.showGrid = false;
    }

    /******************************************************************************************************************
     * Lifecycle Methods
     ******************************************************************************************************************/
    ngOnInit () {

        // TODO: Remove when angular issue 11836 (CanDeactivateChild) is implemented.
        //       https://github.com/angular/angular/issues/11836
        this._router.events
            .subscribe(
                (val) => {

                    // When routing event to navigate away is triggered, display the warning message.
                    if (val instanceof NavigationCancel) {
                        this._navCancel = val as NavigationCancel;
                        console.log('ngOnInit NavigationCancel', this._navCancel.url);
                        this._openNavigationWarningModal();
                    }
                });
    }

    /******************************************************************************************************************
     * Callback Handler
     ******************************************************************************************************************/
    // TODO: Remove when angular issue 11836 (CanDeactivateChild) is implemented.
    //       https://github.com/angular/angular/issues/11836
    private confirmationCallback (formFlag: boolean) {

        // console.log('Form is dirty', formFlag);
        this._isNavigationBlocked = formFlag;
    }

    /******************************************************************************************************************
     * Public Methods
     ******************************************************************************************************************/
    public canDeactivate (): Observable<boolean> | boolean {

        if (this._isNavigationBlocked) {

            // Prevent navigation
            return false;
        }
        return true;
    }

    public onTimeEntryComplete (event) {

        this.showGrid = event;
    }

    public onDisplayGrid (event) {

        this.showGrid = event;
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/
    // private openNavigationWarningModal() {
    //
    //     const warningDialogRef = this.dialog.open(ConfirmationDialogComponent, {
    //         data: { url: this._navCancel.url},
    //         height: '300px',
    //         width: '200px'
    //     });
    //     warningDialogRef.afterClosed().subscribe(result => {
    //         // modal closed
    //     });
    // }
}




