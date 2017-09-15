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
import {DialogData} from '../../../models/DialogData';

@Component({
    templateUrl: './enter-time.component.html'
})
export class EnterTimeComponent extends BaseComponent implements OnInit {

    private _isNavigationBlocked: boolean;
    private _confirmationService: ConfirmationDialogService;

    // working model to add
    public showGrid: boolean;
    public accordionOpen: boolean;

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

        this._confirmationService = super.getDynamicServiceRef('ConfirmationDialogService') as ConfirmationDialogService;

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
                        const navCancel = val as NavigationCancel;
                        // console.log('ngOnInit NavigationCancel', this._navCancel.url);
                        const dialogConfig: DialogData = new DialogData();
                        dialogConfig.height = '190px';
                        dialogConfig.width = '300px';
                        dialogConfig.title = 'You have unsaved changes';
                        dialogConfig.contentText = 'If you leave before saving, your changes will be lost.';
                        dialogConfig.navigationUrl = navCancel.url;
                        dialogConfig.cancelButtonText = 'Cancel';
                        dialogConfig.proceedButtonText = 'OK';

                        if (this._confirmationService && this._confirmationService.isDialogOpen() === false) {
                            this._confirmationService.openNavigationWarningModal(dialogConfig);
                        }
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




