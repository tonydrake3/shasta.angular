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
import {PermissionsService} from '../../../shared/services/authorization/permissions.service';

// Model Imports
import {ConfirmationDialogService} from '../../shared/services/confirmation-dialog.service';
import {DialogData, DialogServiceReference} from '../../../models/DialogData';
import {EnterTimeCopyService} from './enter-time-copy.service';
import {Permissions} from '../../../models/domain/Permissions';
import {CurrentEmployeeService} from '../../shared/services/user/current-employee.service';
import {UserService} from '../../shared/services/user/user.service';
import {Project} from '../../../models/domain/Project';

@Component({
    templateUrl: './enter-time.component.html'
})
export class EnterTimeComponent extends BaseComponent implements OnInit, OnDestroy {

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private _isNavigationBlocked: boolean;
    private _confirmationService: ConfirmationDialogService;
    private permissions: Permissions;
    private projects: Array<Project>;
    private user;
    private employee;

    // working model to add
    public showGrid: boolean;
    public accordionOpen: boolean;
    public progressConfig;
    public loading: boolean;

    constructor(private _injector: Injector, private _router: Router, private _preloadService: EnterTimePreloadManager,
                private _enterTimeManager: EnterTimeManager, private enterTimeCopyService: EnterTimeCopyService,
                private permissionsService: PermissionsService, private currentEmployeeService: CurrentEmployeeService,
                private _cdr: ChangeDetectorRef, private userService: UserService) {

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

        // Observable.forkJoin([character, characterHomeworld]).subscribe(results => {
        //     // results[0] is our character
        //     // results[1] is our character homeworld
        //     results[0].homeworld = results[1];
        //     this.loadedCharacter = results[0];
        // });

        this._preloadService.loading$
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (loading) => {

                    this.loading = loading;
                    // TODO: Test when built and run under PROD setting.
                    // https://github.com/angular/angular/issues/17572
                    this._cdr.detectChanges();

                    if (loading === false) {

                        this.projects = this._enterTimeManager.getProjects();
                    }
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

        this.enterTimeCopyService.timeRecords$
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (timeRecords) => {

                    console.log('EnterTimeComponent EnterTimeCopyService timerecords', timeRecords);
                }
            );

        this.permissionsService.permissions$
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (permissions) => {

                    if (permissions) {

                        console.log('EnterTimeComponent PermissionsService permissions', permissions);
                        this.permissions = permissions;

                        if (this.permissions.TimeRecords.CreateOthers) {

                            this.userService.getLatest();
                        } else {

                            this.currentEmployeeService.getLatest();
                        }
                    }
                }
            );

        this.userService.currentUserInfo$
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (user) => {

                    this.user = user[0];
                }
            );

        this.currentEmployeeService.currentEmployee$
            .takeUntil(this.ngUnsubscribe)
            .subscribe(
                (employee) => {

                    this.employee = employee['Value'];
                }
            );

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

        // this.showGrid = true;
        // this.getWeekFilters();
        this.enterTimeCopyService.initialize(this.getWeekFilters());
        this.enterTimeCopyService.getLatest();
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
    private getWeekFilters () {

        const filters = [];

        if (this.permissions.TimeRecords.CreateOthers) {

            filters.push(['startDate', this.getStartOfWeek()]);
            filters.push(['endDate', this.getEndOfWeek()]);
            filters.push(['createdBy', this.user.Id]);

            return filters;
        }
        filters.push(['startDate', this.getStartOfWeek()]);
        filters.push(['endDate', this.getEndOfWeek()]);
        filters.push(['employeeId', this.employee.Id]);

        return filters;
    }

    private getStartOfWeek (): string {

        const today = moment().startOf('day');

        if (today.isSame(moment().day(0))) {

            return today.subtract(7, 'days').toISOString();
        }
        return moment().day(0).startOf('day').subtract(7, 'days').toISOString();
    }

    private getEndOfWeek (): string {

        const today = moment().startOf('day');

        if (today.isSame(moment().day(0).startOf('day'))) {

            return today.subtract(1, 'days').toISOString();
        }
        return moment().day(0).startOf('day').subtract(1, 'days').toISOString();
    }
}




