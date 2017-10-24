import { Project } from '../../../models/domain/Project';
import { expand } from 'rxjs/operator/expand';
import { Punch } from './../../../models/domain/Punch';
import { Hours } from '../../../models/domain/Hours';
import { Employee } from '../../../models/time/TimeRecord';
import * as moment from 'moment';

// internal to timesheet-card ecosystem, not to be confused with TimeRecords, just used to help manage UI
export class Timecard {
  cardTitle: string;
  subTitle: string;
  sections: any;  // _.grouped array of TimecardSections
  expanded: boolean;
  selected: boolean;
  timecardGrid: Array<HoursApproval>;
  WeekDayHours: Array<WeekDayHours>;
  isComment: boolean;
  rejected: boolean;
  Id: string;
}

export class TimecardSection {
  grouping: string;  // this ends up being either project or employee, depending on their grouping
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
    break?: string
    systemPhrase?: string;
    //project: Project;
   // costCode: Cost
}


export class WeekDayHours {
    dayString: string;
    dateString: string;
    hours: string;
    date:  moment.Moment;
}
