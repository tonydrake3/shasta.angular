import {ChangeDetectorRef, Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {NavigationCancel, Router} from '@angular/router';
import * as moment from 'moment';
import * as _ from 'lodash';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

// Component/Service Imports
import { BaseComponent } from '../../shared/components/base.component';
import {ConfirmationDialogComponent} from '../../shared/components/confirmation-dialog.component';
import {EnterTimePreloadManager} from './enter-time-preload.manager';
import {EnterTimeManager} from './enter-time.manager';

// Model Imports
import {ConfirmationDialogService} from '../../shared/services/confirmation-dialog.service';
import {DialogData, DialogServiceReference} from '../../../models/DialogData';

@Component({
    templateUrl: './enter-time.component.html'
})
export class EnterTimeComponent extends BaseComponent implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private _isNavigationBlocked: boolean;
    private _confirmationService: ConfirmationDialogService;

    // working model to add
    public showGrid: boolean;
    public accordionOpen: boolean;
    public progressConfig;
    public loading: boolean;

    constructor(private _injector: Injector, private _router: Router, private _preloadService: EnterTimePreloadManager,
                private _enterTimeManager: EnterTimeManager, private _cdr: ChangeDetectorRef) {

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

        this.progressConfig = {
            color: 'primary',
            mode: 'indeterminate',
            value: 0
        };

        this._confirmationService = super.getDynamicServiceRef('ConfirmationDialogService') as ConfirmationDialogService;

        this.accordionOpen = true;
        this.showGrid = false;
    }

    /******************************************************************************************************************
     * Lifecycle Methods
     ******************************************************************************************************************/
    ngOnInit () {

        this._preloadService.loading$
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (loading) => {

                    this.loading = loading;
                    // TODO: Test when built and run under PROD setting.
                    // https://github.com/angular/angular/issues/17572
                    this._cdr.detectChanges();
                });

        this._enterTimeManager.processing$
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (processing) => {

                    this.loading = processing;
                    // TODO: Test when built and run under PROD setting.
                    // https://github.com/angular/angular/issues/17572
                    this._cdr.detectChanges();
                    // console.log('ngOnInit', processing);
                });

        // TODO: Remove when angular issue 11836 (CanDeactivateChild) is implemented.
        //       https://github.com/angular/angular/issues/11836
        this._router.events
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (val) => {

                    // When routing event to navigate away is triggered, display the warning message.
                    if (val instanceof NavigationCancel) {
                        const navCancel = val as NavigationCancel;
                        // console.log('ngOnInit NavigationCancel', this._navCancel.url);
                        const dialogConfig: DialogData = new DialogData();
                        dialogConfig.height = '200px';
                        dialogConfig.width = '350px';
                        dialogConfig.title = 'You have unsaved changes';
                        dialogConfig.contentText = 'If you leave before saving, your changes will be lost.';
                        dialogConfig.navigationUrl = navCancel.url;
                        dialogConfig.cancelButtonText = 'Cancel';
                        dialogConfig.proceedButtonText = 'OK';
                        dialogConfig.component = ConfirmationDialogComponent;
                        dialogConfig.service = new DialogServiceReference(EnterTimeManager, 'clearLines');

                        if (this._confirmationService && this._confirmationService.isDialogOpen() === false) {
                            this._confirmationService.openNavigationWarningModal(dialogConfig);
                        }
                    }
                });
    }

    ngOnDestroy () {

        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
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

    public copyLastWeekTimesheet() {

        this.showGrid = true;
    }

    public copyYesterdayTimesheet() {

        this.showGrid = true;
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




