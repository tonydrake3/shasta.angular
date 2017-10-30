import { User } from './../../../models/domain/User';
import { TimeRecord } from '../../../models/domain/TimeRecord';
import { groupBy } from 'rxjs/operator/groupBy';
import { MessageService } from './timesheet-card.message';
import { Subscription } from 'rxjs/Subscription';
import { TimeCardTimeDetailComponent } from './timesheet-card-timedetail.component';
import { Punch } from './../../../models/domain/Punch';
import {
    Component,
    Injector,
    Input,
    OnInit,
    EventEmitter,
    Output,
    OnDestroy
} from '@angular/core';
import { MdDialog } from '@angular/material';

import { WeekDateRange, WeekDateRangeDetails } from '../../../models/Date';
import { TimecardSection, Badges, HoursApproval } from './timecard.model';

import { BaseComponent } from '../../shared/components/base.component';
import { CommentsComponent } from '../../shared/components/comments.component';
import { Hours } from '../../../models/domain/Hours';
import { TimesheetCardManager } from './timesheet-card.manager';

import * as moment from 'moment';
import * as _ from 'lodash';
import { Project } from 'app/models/domain/Project';
import { Employee } from '../../../models/time/TimeRecord';
import { WeekDayHours, Timecard } from './timecard.model';
import { TimesheetCardPinComponent } from 'app/home/time-expenses/timesheet-card/timesheet-card-pin.component';
import {TimeRecordDetailModalComponent} from '../time-record-detail-modal/time-record-detail-modal.component';
import {ReloadType} from '../../../models/ReloadType';

@Component({
    selector: 'esub-timesheet-card',
    templateUrl: './timesheet-card.component.html',
    styles: [
            `
            .normal {
                color: blue;
                cursor: pointer;
            }
            .rejected {
                color: red;
                cursor: pointer;
            }
            .overTime {
                color: gold;
                cursor: none;
            }
            .standTime {
                color: green;
                cursor: none;
            }
            .comment {
                color: blue;
            }
            .reject {
                color: red;
            }`
    ],
    providers: [TimesheetCardManager, MessageService]
})
export class TimesheetCardComponent extends BaseComponent
    implements OnInit, OnDestroy {
    @Input() loading: boolean;
    // setter on input to monitor for changes
    @Input()
    set view(view: string) {
        this._view = view;
        this.updateViewSettings();
    }
    @Output() onDatePicked: EventEmitter<any> = new EventEmitter<any>();

    /* We temporarily store the time records here so we can access them for the modal. This component needs a lot
     * of refactoring... */
    private timeRecords: TimeRecord[];

    public timecards: Array<Timecard>; // the built cards, what the template will display
    public dateRange: Array<WeekDateRangeDetails>; // builds the 7 day week based on input dateRange

    public entityLookupTable: Array<any>; // local lookup table for entities (Employee, Project) built during timecard buildup
    public moment = moment;

    private userId: string;
    public isHourDetail: boolean;
    public isAllTimecardsSelected = false;
    public isComment: boolean;
    public groupBy: string;
    public pin: string;
    public correctPin: string;

    // view management
    public _view: string; // valid entries are timesheets, approve-time, export-time
    public testing: string;

    public showBadges: Badges;
    public showCheckboxes: boolean;
    public subscription: Subscription;
    public totalCount: number;
    public isReject = false;

    public total: number;
    public st: number;
    public ot: number;
    public dt: number;
    public costCodeHours: string;
    public hoursApprovals: Array<HoursApproval>;
    private readonly TYPE = 'onHourlyValues';
    private count = 0;

    constructor(
        protected injector: Injector,
        public dialog: MdDialog,
        public timesheetCardManager: TimesheetCardManager,
        private _messageService: MessageService<ReloadType>
    ) {
        super(injector, [
            { service: 'CurrentEmployeeService', callback: 'currentEmployeeCallback' }
        ]);

        super(injector, [
            { service: 'UserService', callback: 'currentUserCallback' }
        ]);

        this.timecards = [];

        this.isHourDetail = false;
    }

    ngOnInit() {
        this.totalCount = 0;

        this.count = 1;
    }

    /******************************************************************************************************************
     * Lifecycle Methods
     ******************************************************************************************************************/

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    // build timesheets from timerecords, timerecords should already be pre-filtered for date & user
    // valid groupBy is 'employee' or 'project'
    public buildTimesheets(
        timerecords: Array<any>,
        dateRange: WeekDateRange,
        groupTimesheetsBy: string,
        showFilter: string
    ) {
        if (!timerecords || timerecords.length === 0) return;

        this.timeRecords = timerecords;
        this.entityLookupTable = [];

        this.dateRange = [];

        // build date labels
        this.dateRange = this.timesheetCardManager.buildWeekDateRangeDetails(
            dateRange
        );

        // filter results by date
        timerecords = _.filter(timerecords, timerecord => {
            return (
                dateRange.startDate.isSameOrBefore(timerecord.Hours.Date) &&
                dateRange.endDate.isSameOrAfter(timerecord.Hours.Date)
            );
        });

        // filter results to active user only
        if (showFilter === 'mine') {
            timerecords = _.filter(timerecords, timerecord => {
                return timerecord.Employee.Id === this.userId;
            });
        }

        // build dictionary based on grouping
        const groupedTimerecords = _.groupBy(timerecords, timerecord => {
            let accessor: string;

            this.groupBy = groupTimesheetsBy;
            if (groupTimesheetsBy === 'employee') {
                accessor = 'Employee';
            } else {
                accessor = 'Project';
            }

            this.saveEntity(timerecord, accessor);

            if (timerecord[accessor]) {
                return timerecord[accessor].Id;
            } else {
                return 'Unknown';
            }
        });

        const unSortCards = new Array<any>();
        // one groupedTimerecord equates to one Timecard
        for (const key in groupedTimerecords) {
            if (groupedTimerecords.hasOwnProperty(key)) {
                let title;
                if (this.entityLookupTable[key]) {
                    title = this.entityLookupTable[key].Title;
                } else {
                    title = 'Unknown';
                }

                let id = '';
                if (this.entityLookupTable[key] && this.entityLookupTable[key].Id) {
                    id = this.entityLookupTable[key].Id;
                }

                unSortCards.push({
                    cardTitle: this.getEntityName(key),
                    subTitle: title,
                    sections: this.buildSections(
                        groupedTimerecords[key],
                        groupTimesheetsBy
                    ),
                    Id: id
                });
            }
        }

        const cards = _.orderBy(unSortCards, card => {
            return card.cardTitle;
        });

        // insert Hour objects at each nesting level and organize
        this.timecards = this.timesheetCardManager.buildTimecard(
            cards,
            this.dateRange
        );

        // setting timecard status
        _.forEach(this.timecards, timecard => {
            timecard.timecardGrid = this.getTimecardGrid(timecard);
            let count = 0;
            const timecardGrid = timecard.timecardGrid;
            _.forEach(timecardGrid, hoursApproval => {
                if (hoursApproval.isRejected === true) {
                    count++;
                }
            });
            timecard.rejected = count > 0;
        });

        _.forEach(this.timecards, timecard => {
            timecard.timecardGrid = this.getTimecardGrid(timecard);
            timecard.WeekDayHours = this.getWeekDayHours(timecard.timecardGrid);
        });

        //   timecard.expanded =
        //     timecard.timecardGrid && timecard.timecardGrid.length > 0;
        // });

        console.log(this.timecards);
        this.updateViewSettings();
        // this.TestCommentsModal(timerecords);
    }

    public credentialPIN(type: string, hoursApproval: HoursApproval): void {
        const timeCardTimecardPinDialogRef = this.dialog.open(
            TimesheetCardPinComponent,
            {
                data: {
                    correctPin: this.correctPin,
                    type: type
                },
                height: '19%',
                width: '39%',
                disableClose: true,
                hasBackdrop: true // or false, depending on what you want
            }
        );
        timeCardTimecardPinDialogRef.afterClosed().subscribe(result => {
            // modal closedif()

            if (result && result.pin) {
                console.log(`Dialog result: ${result.pin}`);
                this.pin = result.pin;
                this._messageService.media = result.pin;
            }
        });

        // return this.pin;
    }
    public BuildWeeDayHours(timecard: Timecard) {
        const weekDayHours: Array<WeekDayHours> = timecard.WeekDayHours;
    }

    // creates sections (within a project or employee)
    public buildSections(timerecords: Array<any>, groupTimesheetsBy: string) {

        const nonSortedSections = Array<TimecardSection>();

        // build full details, to then group against
        timerecords.forEach(timerecord => {
            this.saveEntity(timerecord, 'Employee');
            this.saveEntity(timerecord, 'Project');
            this.saveEntity(timerecord, 'SystemPhase');
            this.saveEntity(timerecord, 'CostCode');

            let grouping = '';
            if (groupTimesheetsBy === 'employee') {
                if (timerecord.Project && timerecord.Project.Id) {
                    grouping = this.getEntityName(timerecord.Project.Id);
                }
            } else {
                if (timerecord.Employee && timerecord.Employee.Id) {
                    grouping = this.getEntityName(timerecord.Employee.Id);
                }
            }

            let systemPhase = '';

            if (timerecord.SystemPhase && timerecord.SystemPhase.Id) {
                systemPhase = this.getEntityName(timerecord.SystemPhase.Id);
            }

            let costCode = '';

            if (timerecord.CostCode && timerecord.CostCode.Id) {
                costCode = this.getEntityName(timerecord.CostCode.Id);
            }

            nonSortedSections.push({
                grouping: grouping,
                systemPhase: timerecord.SystemPhase ? systemPhase : 'Unknown',
                costCode: timerecord.CostCode ? costCode : 'Unknown',
                hours: timerecord.Hours,
                status: timerecord.TimeRecordStatus,
                comments: timerecord.Comments,
                mapError: timerecord.MapLocationError,
                punch: timerecord.Punch,
                expanded: false,
                Id: timerecord.Id,
                project: timerecord.Project,
                employee: timerecord.Employee
            });
        });

        const sections = _.orderBy(nonSortedSections, section => {
            return section.grouping;
        });

        // group by grouping (anti employee/project), then system-phase, then costCode
        const groupedSections: any = _.groupBy(sections, 'grouping');

        // group by system-phase
        for (const systemPhaseKey in groupedSections) {
            if (groupedSections.hasOwnProperty(systemPhaseKey)) {
                const system: any = _.groupBy(
                    groupedSections[systemPhaseKey],
                    'systemPhase'
                );

                //  group by costCode
                for (const costCodeKey in system) {
                    if (system.hasOwnProperty(costCodeKey)) {
                        system[costCodeKey] = _.groupBy(system[costCodeKey], 'costCode');
                    }
                }

                groupedSections[systemPhaseKey] = system;
            }
        }

        return groupedSections;
    }

    // saves guid based entity to local lookup table for easy reference
    public saveEntity(timerecord: any, accessor: string) {
        if (!timerecord[accessor]) {
            return;
        }
        if (this.entityLookupTable[timerecord[accessor].Id]) {
            // if already there, merge incase there's more data
            _.assign(this.entityLookupTable[timerecord[accessor].Id], [
                timerecord[accessor]
            ]);
        } else {
            // or just save it to the lookup table
            this.entityLookupTable[timerecord[accessor].Id] = timerecord[accessor];
        }
    }

    // returns a formatted entity name for an Employee or a Project
    getEntityName(Id: string): string {
        let name = '';

        if (this.entityLookupTable[Id]) {
            if (
                this.entityLookupTable[Id].FirstName ||
                this.entityLookupTable[Id].LastName
            ) {
                name =
                    this.entityLookupTable[Id].FirstName +
                    ' ' +
                    this.entityLookupTable[Id].LastName;
            } else if (this.entityLookupTable[Id].Name) {
                name = this.entityLookupTable[Id].Name;
            } else {
                name = 'Unknown';
            }
        } else {
            name = 'Unknown';
        }
        return name;
    }

    // selected all timecard
    public onAllTimecardsSelected(event) {
        this.totalCount = 0;
        _.forEach(this.timecards, timecard => {
            if (timecard) {
                this.totalCount += this.markTimeCard(timecard);
                timecard.selected = !timecard.selected;
            }
        });
        if (!this.isAllTimecardsSelected) {
            this.totalCount = 0;
        }

        const temp = this.totalCount;
        this.onDatePicked.emit(this.totalCount > 0);
    }

    public onSelectSingleCheckBox(timecard: any, timecardGrid: any, event): void {
        const selected = event;

        const temp = timecardGrid;

        const data: HoursApproval = _.find(timecard.timecardGrid, timecardGrid);

        data.isSelected = selected;

        if (!selected) {
            timecard.selected = selected;
            this.isAllTimecardsSelected = selected;
        }

        let count = 0;

        _.forEach(timecard.timecardGrid, (item: HoursApproval) => {
            if (item.isSelected) {
                count++;
            }
        });

        if (count === timecard.timecardGrid.length) {
            timecard.selected = selected;
        }

        const result = this.anyChecked();

        this.isAllTimecardsSelected = result === this.totalhoursApproval();
        this.onDatePicked.emit(result > 0);
    }

    // selected each time card
    public markTimeCard(timecard) {
        let count = 0;
        const hoursApprovals: HoursApproval = timecard.timecardGrid;
        _.forEach(hoursApprovals, hoursApproval => {
            if (!hoursApproval.isRejected) {
                if (this.isAllTimecardsSelected) {
                    hoursApproval.isSelected = true;
                    timecard.selected = false;
                } else {
                    hoursApproval.isSelected = false;
                    timecard.selected = true;
                }
                if (hoursApproval.isSelected) {
                    count++;
                }
            }
        });
        return count;
    }

    public markCostCode(costCode: any): any {
        let count = 0;
        for (const dayKey in costCode.days) {
            if (costCode.days.hasOwnProperty(dayKey)) {
                const day = costCode.days[dayKey];
                if (day.hours !== 0) {
                    _.forEach(day.hoursBreakdown, breakdown => {
                        if (!breakdown['isRejected']) {
                            if (this.isAllTimecardsSelected) {
                                breakdown['isSelected'] = true;
                                count = count + 1;
                            } else {
                                breakdown['isSelected'] = false;
                            }
                        }
                    });
                }
            }
        }
        return count;
    }

    private anyChecked(): number {
        let count = 0;
        _.forEach(this.timecards, timecard => {
            const hoursApprovals = timecard.timecardGrid;
            _.forEach(hoursApprovals, hoursApproval => {
                if (hoursApproval.isSelected  && hoursApproval.status.trim().toLowerCase() !== 'approved') {
                    count++;
                }
            });
        });
        return count;
    }

    // Mark single time card
    public markSingleTimeCard(timecard, event) {
        const hoursApprovals: HoursApproval = timecard.timecardGrid;
        _.forEach(hoursApprovals, hoursApproval => {
            if (!hoursApproval.isRejected) {
                hoursApproval.isSelected = event;
            }
        });

        this.isAllTimecardsSelected =
            this.anyChecked() === this.totalhoursApproval();
        this.onDatePicked.emit(this.anyChecked() > 0);
    }

    private totalhoursApproval(): number {
        let count = 0;
        if (this.timecards) {
            _.forEach(this.timecards, timecard => {
                if (timecard) {
                    const timecardGrid = timecard.timecardGrid;
                    _.forEach(timecardGrid, item => {
                        if (!item.isRejected) {
                            count++;
                        }
                    });
                }
            });
        }
        return count;
    }

    public getTimecardTotalHours(timecard, day): string {
        this.costCodeHours = '';

        const hours = this.timesheetCardManager.getTimecardTotalHours(
            timecard,
            day
        );

        this.costCodeHours = hours.toString();

        return this.costCodeHours;
    }

    public getTimecardGrid(timecard): Array<HoursApproval> {
        let numComment = 0;
        let numRejected = 0;

        this.hoursApprovals = this.timesheetCardManager.getTimecardGrid(timecard);
        _.forEach(this.hoursApprovals, hoursApproval => {
            if (hoursApproval.comments && hoursApproval.comments.length > 0) {
                numComment++;
            }
            if (hoursApproval && hoursApproval.isRejected) {
                numRejected++;
            }
        });

        timecard.isComment = numComment > 0;
        timecard.isRejected = numRejected > 0;
        return this.hoursApprovals;
    }
    public getWeekDayHours(
        hoursApprovals: Array<HoursApproval>
    ): Array<WeekDayHours> {
        const SummeryWeekDayHours: Array<WeekDayHours> = [];

        _.forEach(this.dateRange, day => {
            const currentDay = day.date.format('YYYY-MM-DD');
            const currentDayHours = _.filter(hoursApprovals, function(o) {
                return moment(o.day).format('YYYY-MM-DD') === currentDay;
            });
            const weekDayHour = new WeekDayHours();
            weekDayHour.dayString = day.dayString;
            weekDayHour.dateString = day.dateString;
            weekDayHour.date = day.date;
            if (!currentDayHours || currentDayHours.length === 0) {
                weekDayHour.hours = '0';
            } else {
                let sum = 0;
                _.forEach(currentDayHours, currentDayHour => {
                    const hours =
                        Number(currentDayHour['Regulartime']) +
                        Number(currentDayHour['Doubletime']) +
                        Number(currentDayHour['Overtime']);

                    sum += hours;
                });
                weekDayHour.hours = sum.toString();
            }
            SummeryWeekDayHours.push(weekDayHour);
        });
        return SummeryWeekDayHours;
    }


    private markSingleCostCode(costCode: any, option: boolean) {
        let count = 0;
        for (const dayKey in costCode.days) {
            if (costCode.days.hasOwnProperty(dayKey)) {
                const day = costCode.days[dayKey];
                if (day.hours !== 0) {
                    _.forEach(day.hoursBreakdown, breakdown => {
                        if (!breakdown['isRejected']) {
                            if (option === undefined || option === false) {
                                breakdown['isSelected'] = true;
                                count++;
                            } else {
                                breakdown['isSelected'] = false;
                                this.isAllTimecardsSelected = false;
                                count--;
                            }
                        }
                    });
                }
            }
        }
        return count;
    }

    // Display st, ot, dt
    public displaySTOTDT(timecard): void {
        let regularTime = 0;
        let overTime = 0;
        let doubleTime = 0;

        const timecardGrids: Array<HoursApproval> = timecard.timecardGrid;

        if (timecardGrids && timecardGrids.length > 0) {
            _.forEach(timecardGrids, timecardGrid => {
                regularTime += Number(timecardGrid.Regulartime);
                overTime += Number(timecardGrid.Overtime);
                doubleTime += Number(timecardGrid.Doubletime);
            });
        }
        this.st = regularTime;
        this.ot = overTime;
        this.dt = doubleTime;
        this.total = regularTime + overTime + doubleTime;
    }
    // calculate the st, ot, dt
    MathSdo(costCode: any, toggle: boolean): any {
        let regularTime = 0;
        let overTime = 0;
        let doubleTime = 0;

        for (const dayKey in costCode.days) {
            if (costCode.days.hasOwnProperty(dayKey)) {
                const day = costCode.days[dayKey];
                if (day.hours !== 0) {
                    day.selected = toggle;

                    _.forEach(day.hoursBreakdown, breakdown => {
                        regularTime += breakdown['Regulartime']
                            ? breakdown['Regulartime']
                            : 0;
                        overTime += breakdown['Overtime'] ? breakdown['Overtime'] : 0;
                        doubleTime += breakdown['Doubletime'] ? breakdown['Doubletime'] : 0;
                    });
                }
            }
        }
        const total = {
            regularTime: regularTime,
            overTime: overTime,
            doubleTime: doubleTime
        };
        return total;
    }

    // open hour values modal
    public onHourlyValues(hoursApproval: HoursApproval) {

        this.openDetailModal(hoursApproval.TimeRecordId)
        // console.log('onHourlyValues');
        // if (!this.pin || this.pin === '' || this.pin !== this.correctPin) {
        //   this.credentialPIN('onHourlyValues', hoursApproval);
        //   return;
        // }
        // const data = hoursApproval;
        // if (hoursApproval) {
        //     let width, height;
        //     if (window.innerWidth < 750) width = window.innerWidth * 0.21;
        //     else if (window.innerWidth < 1100) width = window.innerWidth * 0.33;
        //     else if (window.innerWidth < 1420) width = window.innerWidth * 0.39;
        //     else width = window.innerWidth * 0.55;
        //     height = window.innerHeight * 0.57;
        //
        //     const targetTimecard: Timecard = _.find(this.timecards, timecard => {
        //         return timecard.Id === hoursApproval.$id;
        //     });
        //
        //     const timedetailsDialogRef = this.dialog.open(
        //         TimeCardTimeDetailComponent,
        //         {
        //             data: {
        //                 hoursApproval: hoursApproval,
        //                 targetTimecard: targetTimecard
        //             },
        //             height: height + 'px',
        //             width: width + 'px',
        //             disableClose: true,
        //             hasBackdrop: true // or false, depending on what you want
        //         }
        //     );
        //     timedetailsDialogRef.afterClosed().subscribe(result => {
        //         // modal closedif()
        //
        //         if (result && result.data) {
        //             console.log(`Dialog result: ${result.data}`);
        //             this.updateSettings(result.data);
        //             console.log(`Dialog result: ${result.data}`);
        //         }
        //     });
        // }
    }

    private openDetailModal(timeRecordId: string) {
        console.log('Clicked TimeRecord Detail. Sending a record with id: ', timeRecordId);

        const timeRecordsWithClickedId = this.timeRecords
            .filter((record) => { return record.Id === timeRecordId });

        if (timeRecordsWithClickedId.length <= 0) { return }
        const timeRecordToSend = timeRecordsWithClickedId.pop();
        console.log(timeRecordToSend);
        const timeRecordDetailModalRef = this.dialog.open(TimeRecordDetailModalComponent, {
            data: timeRecordToSend,
            height: '700px',
            width: '100%'
        });
        timeRecordDetailModalRef.afterClosed().subscribe(result => {
            console.log('TimeRecordDetail modal closed.');
            if (result) {
                console.log(result);
                this._messageService.messageSource$.next(ReloadType.edited)
            } else {
                console.log('no result');
            }
        });
    }

    private updateSettings(data) {
        const Id: any = data.$id;

        const targetTimecard = _.find(this.timecards, { Id: Id });

        this.updateReject(targetTimecard, data);

        this.updateComments(targetTimecard, data);
    }

    // update rejceted
    private updateReject(targetTimecard, data) {
        if (targetTimecard) {
            if (data.isRejected) {
                targetTimecard.rejected = true;
            } else {
                targetTimecard.rejected = false;
            }
        }
    }
    // udpate comments
    private updateComments(targetTimecard, data) {
        const timecardGrid: Array<HoursApproval> = targetTimecard.timecardGrid;
        const hoursApprovals = _.find(timecardGrid, function(o) {
            if (o.comments) {
                return o.comments.length > 0;
            }
        });

        if (hoursApprovals) {
            targetTimecard.isComment = true;
        } else {
            targetTimecard.isComment = false;
        }
    }

    private TestCommentsModal(timerecords) {
        //  const timnerecord = _.shuffle(timerecords)[0];

        const timnerecord = _.find(timerecords, {
            Id: 'ba347e85-f95b-4e9c-8911-0166ce6d7bd3'
        });

        const ts = _.filter(timerecords, timerecord => {
            return timerecord['Comments'].length > 0;
        });

        this.openCommentsModal(timnerecord);
    }

    public openCommentsModal(timerecord: any) {
        let width, height;
        if (window.innerWidth < 750) width = window.innerWidth * 0.2;
        else if (window.innerWidth < 1100) width = window.innerWidth * 0.3;
        else if (window.innerWidth < 1420) width = window.innerWidth * 0.37;
        else width = window.innerWidth * 0.5;
        height = window.innerHeight * 0.97;

        const commentsDialogRef = this.dialog.open(CommentsComponent, {
            data: {
                timerecord: timerecord,
                currentUserId: this.userId
            },
            disableClose: true,
            hasBackdrop: true, // or false, depending on what you want
            height: height + 'px',
            width: width + 'px'
        });
        commentsDialogRef.afterClosed().subscribe(result => {
            // modal closed
        });
    }

    // open the comment modal with that day's comments
    public openChatModal(comments: any) {
        let width, height;
        if (window.innerWidth < 750) width = window.innerWidth * 0.1;
        else if (window.innerWidth < 1100) width = window.innerWidth * 0.2;
        else if (window.innerWidth < 1420) width = window.innerWidth * 0.3;
        else width = window.innerWidth * 0.37;
        height = window.innerHeight * 0.7;

        const commentsDialogRef = this.dialog.open(CommentsComponent, {
            data: comments,
            height: height + 'px',
            width: width + 'px'
        });
        commentsDialogRef.afterClosed().subscribe(result => {
            // modal closed
        });
    }

    currentEmployseeCallback(employee) {
        this.userId = employee.Value.UserId;
    }
    currentUserCallback(user) {
        if (user && user[0] && user[0].ApprovalPin) {
            this.correctPin = user[0].ApprovalPin;
        }
    }

    // used on route change to update default view time-settings for timecards
    public updateViewSettings() {
        this.pin = '';

        this._messageService.media = '';

        switch (this._view) {
            case 'timesheets':
                this.showBadges = {
                    comments: true,
                    statusError: true,
                    mapError: true
                };
                // this.showCheckboxes = false;
                this.expandAllDetails(true);
                this.count = 1;
                break;
            case 'approve-time':
                this.showBadges = {
                    comments: true,
                    statusError: true,
                    mapError: true
                };

                this.expandAllDetails(true);
                if (this.count !== 0) {
                    this.timeApprovePincCheck();
                }
                break;
            case 'export-time':
                //    TODO Only show records that have been approved if the company does approvals.
                //    Otherwise display all records matching the current filters
                this.showBadges = {
                    comments: true,
                    statusError: false,
                    mapError: false
                };
                this.showCheckboxes = true;
                this.expandAllDetails(true);

                break;
        }
    }

    private timeApprovePincCheck() {
        if (!this.pin || this.pin === '' || this.pin !== this.correctPin) {
            this.credentialPIN('', null);
        }
    }

    // expands or collapses all timecard detail sections
    public expandAllDetails(expand: boolean) {
        this.timecards.forEach(card => {
            card.expanded = expand;
        });
    }
}
