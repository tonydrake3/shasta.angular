import { Hours } from '../../../models/domain/Hours';

// internal to timesheet-card ecosystem, not to be confused with TimeRecords, just used to help manage UI
export class Timecard {
  cardTitle: string;
  subTitle: string;
  sections: any;  // _.grouped array of TimecardSections
  expanded: boolean;
}

export class TimecardSection {
  grouping: string;  // this ends up being either project or employee, depending on their grouping
  systemPhase: string;
  costCode: string;
  hours: Hours;
  status: string;
  comments: Array<any>;
  mapError: any;
}

export class Badges {
  comments: boolean;
  statusError: boolean;
  mapError: boolean;
}
