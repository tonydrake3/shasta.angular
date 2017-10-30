import { Project } from '../../../models/domain/Project';
import { expand } from 'rxjs/operator/expand';
import { Punch } from './../../../models/domain/Punch';
import { Hours } from '../../../models/domain/Hours';
import {Employee} from 'app/models/domain/Employee';
import * as moment from 'moment';
import {TimeRecordConvertible} from '../time-record-detail-modal/ModalModels';
import {TimeRecord} from '../../../models/domain/TimeRecord';

// internal to timesheet-card ecosystem, not to be confused with TimeRecords, just used to help manage UI
export class Timecard {
  cardTitle: string;
  subTitle: string;
  sections: any; // _.grouped array of TimecardSections
  expanded: boolean;
  selected: boolean;
  timecardGrid: Array<HoursApproval>;
  WeekDayHours: Array<WeekDayHours>;
  isComment: boolean;
  rejected: boolean;
  Id: string;
}

export class TimecardSection {
  grouping: string; // this ends up being either project or employee, depending on their grouping
  systemPhase: string;
  costCode: string;
  hours: Hours;
  status: string;
  comments: Array<any>;
  mapError: any;
  punch: any;
  expanded: boolean;
  Id: string;
  project: Project;
  employee: Employee;
}

export class Badges {
  comments: boolean;
  statusError: boolean;
  mapError: boolean;
}

export class HoursApproval {
    status: string;
    day: string;
    job: string;
    hourlyValues: string;
    Regulartime: number;
    Overtime: number;
    Doubletime: number;
    isSelected: boolean;
    punch: Punch;
    costCode: string;
    $id: string;
    isRejected: boolean;
    note: string;
    comments: Array<any>;
    TimeRecordId: string;
    projectId: string;
    employee: Employee;
    punchIn?: Date;
    punchOut?: Date;
    break?: string;
    systemPhrase?: string;

    // asTimeRecord(): TimeRecord {
    //     const timeRecord = new TimeRecord();
    //
    //     timeRecord.Hours = new Hours();
    //     timeRecord.Hours.RegularTime = this.Regulartime;
    //     timeRecord.Hours.DoubleTime = this.Doubletime;
    //     timeRecord.Hours.Overtime = this.Overtime;
    //
    //     timeRecord.Punch = this.punch;
    //
    //     /* I NEED THESE PLEASE :) */
    //     // timeRecord.Project = this.Project;
    //     // timeRecord.CostCode = this.CostCode;
    //     // timeRecord.TimeRecordStatus = this.TimeRecordStatus;
    //     // timeRecord.Breaks = this.Breaks;
    //     // timeRecord.IndirectCost = this.IndirectCost;
    //     // timeRecord.System = this.System;
    //     // timeRecord.Phase = this.Phase;
    //
    //     timeRecord.Comments = this.comments;
    //     timeRecord.Id = this.TimeRecordId;
    //     timeRecord.Employee = this.employee;
    //
    //     return timeRecord;
    // }
}

export class WeekDayHours {
  dayString: string;
  dateString: string;
  hours: string;
  date: moment.Moment;
}

