import { Component, Input, Injector } from '@angular/core';
import { MdDialog } from '@angular/material';

import { WeekDateRange, WeekDateRangeDetails } from '../../../models/Date';
import { Timecard, TimecardSection, Badges } from './timecard.model';

import { BaseComponent } from '../../shared/components/base.component';
import { CommentsComponent } from '../../shared/components/comments.component';

import { TimesheetCardManager } from './timesheet-card.manager';

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
    selector: 'esub-timesheet-card',
    templateUrl: './timesheet-card.component.html',
    providers: [ TimesheetCardManager ]
})
export class TimesheetCardComponent extends BaseComponent {
  @Input() loading: boolean;

  public timecards: Array<Timecard>;    // the built cards, what the template will display
  public dateRange: Array<WeekDateRangeDetails>;    // builds the 7 day week based on input dateRange

  public entityLookupTable: Array<any>;   // local lookup table for entities (Employee, Project) built during timecard buildup
  public moment = moment;

  private userId: string;

  // view management
  public _view: string;    // valid entries are timesheets, approve-time, export-time

  // setter on input to monitor for changes
  @Input()
  set view(view: string) {
    this._view = view;
    this.updateViewSettings();
  }
  public showBadges: Badges;
  public showCheckboxes: boolean;

  constructor(protected injector: Injector, public dialog: MdDialog, public timesheetCardManager: TimesheetCardManager) {
    super(injector, [
      { service: 'UserService', callback: 'userServiceCallback'}
    ]);

    this.timecards = [];
  }

  // build timesheets from timerecords, timerecords should already be pre-filtered for date & user
    // valid groupBy is 'employee' or 'project'
  public buildTimesheets(timerecords: Array<any>, dateRange: WeekDateRange, groupTimesheetsBy: string, showFilter: string) {
      console.log(_.filter(timerecords, timerecord => {
          return !timerecord.Project  ;
      }));

    if (!timerecords || timerecords.length === 0) return;

    this.entityLookupTable = [];

    // build date labels
    this.dateRange = this.timesheetCardManager.buildWeekDateRangeDetails(dateRange);

    // filter results by date
    timerecords = _.filter(timerecords, timerecord => {
      return dateRange.startDate.isSameOrBefore(timerecord.Hours.Date) &&
        dateRange.endDate.isSameOrAfter(timerecord.Hours.Date);
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

    const cards = new Array<any>();
    // one groupedTimerecord equates to one Timecard
    for (const key in groupedTimerecords) {
      if (groupedTimerecords.hasOwnProperty(key)) {
        let title;
        if (this.entityLookupTable[key]) {
          title = this.entityLookupTable[key].Title;
        } else {
          title = 'Unknown';
        }
        cards.push({
          cardTitle: this.getEntityName(key),
          subTitle: title,
          sections: this.buildSections(groupedTimerecords[key], groupTimesheetsBy)
        });
      }
    }

    // insert Hour objects at each nesting level and organize
    this.timecards = this.timesheetCardManager.buildTimecard(cards, this.dateRange);
    this.updateViewSettings();
  }

  // creates sections (within a project or employee)
  buildSections(timerecords: Array<any>, groupTimesheetsBy: string) {

    const sections = Array<TimecardSection>();

    // build full details, to then group against
    timerecords.forEach(timerecord => {
      this.saveEntity(timerecord, 'Employee');
      this.saveEntity(timerecord, 'Project');
      this.saveEntity(timerecord, 'SystemPhase');
      this.saveEntity(timerecord, 'CostCode');

      sections.push({
        grouping: groupTimesheetsBy === 'employee' ? this.getEntityName(timerecord.Project.Id) : this.getEntityName(timerecord.Employee.Id),
        systemPhase: timerecord.SystemPhase ? this.getEntityName(timerecord.SystemPhase.Id) : 'Unknown',
        costCode: timerecord.CostCode ? this.getEntityName(timerecord.CostCode.Id) : 'Unknown',
        hours: timerecord.Hours,
        status: timerecord.TimeRecordStatus,
        comments: timerecord.Comments,
        mapError: timerecord.MapLocationError
      });
    });

    // group by grouping (anti employee/project), then system-phase, then costCode
    const groupedSections: any = _.groupBy(sections, 'grouping');

    // group by system-phase
    for (const systemPhaseKey in groupedSections) {
      if (groupedSections.hasOwnProperty(systemPhaseKey)) {
        const system: any = _.groupBy(groupedSections[systemPhaseKey], 'systemPhase');

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
  saveEntity(timerecord: any, accessor: string) {
    if (!timerecord[accessor]) {
      return;
    }
    if (this.entityLookupTable[timerecord[accessor].Id]) {
      // if already there, merge incase there's more data
      _.assign(this.entityLookupTable[timerecord[accessor].Id], [timerecord[accessor]]);
    } else {
      // or just save it to the lookup table
      this.entityLookupTable[timerecord[accessor].Id] = timerecord[accessor];
    }
  }

  // returns a formatted entity name for an Employee or a Project
  getEntityName(Id: string): string {
    let name = '';

    if (this.entityLookupTable[Id]) {
      if (this.entityLookupTable[Id].FirstName || this.entityLookupTable[Id].LastName) {
        name = this.entityLookupTable[Id].FirstName + ' ' + this.entityLookupTable[Id].LastName
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

  // mark all checkboxes for row
  markAll(costCode: any, toggle: boolean) {
    for (const dayKey in costCode.days) {
      if (costCode.days.hasOwnProperty(dayKey)) {
        const day = costCode.days[dayKey];
        if (day.hours !== 0) {
          day.selected = toggle;
        }
      }
    }
  }

  // open the comment modal with that day's comments
  openChatModal(comments: Array<any>) {
    let width, height;
    if (window.innerWidth < 750) width = window.innerWidth * .3;
    else if (window.innerWidth < 1100) width = window.innerWidth * .4;
    else if (window.innerWidth < 1420) width = window.innerWidth * .5;
    else width = window.innerWidth * .6;
    height = window.innerHeight * .5;

    const commentsDialogRef = this.dialog.open(CommentsComponent, {
      data: comments,
      height: height + 'px',
      width: width + 'px'
    });
    commentsDialogRef.afterClosed().subscribe(result => {
      // modal closed
    });
  }

  userServiceCallback(user) {
    this.userId = user.Id;
  }


  // used on route change to update default view settings for timecards
  updateViewSettings() {
    switch (this._view) {
      case 'timesheets':
        this.showBadges = {
          comments: true,
          statusError: true,
          mapError: true
        };
        this.showCheckboxes = false;
        this.expandAllDetails(false);
        break;
      case 'approve-time':
        this.showBadges = {
          comments: true,
          statusError: true,
          mapError: true
        };
        this.showCheckboxes = true;
        this.expandAllDetails(true);
        break;
      case 'export-time':
        //    TODO Only show records that have been approved if the company does approvals.
        //    Otherwise display all records matching the current filters
        this.showBadges = {
          comments: true,
          statusError: false,
          mapError: false
        };
        this.showCheckboxes = false;
        this.expandAllDetails(true);
        break;
    }
  }


  // expands or collapses all timecard detail sections
  expandAllDetails(expand: boolean) {
    this.timecards.forEach(card => {
      card.expanded = expand;
    });
  }
}
