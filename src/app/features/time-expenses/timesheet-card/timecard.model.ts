import { Hours } from '../../../models/time/TimeRecord';

// internal to timesheet-card ecosystem, not to be confused with TimeRecords, just used to help manage UI
export class Timecard {
  cardTitle: string;
  subTitle: string;
  sections: any;  // _.grouped array of TimecardSections
}

export class TimecardSection {
  grouping: string;  // this ends up being either project or employee, depending on their grouping
  system: string;
  phase: string;
  codeCode: string;
  hours: Hours;
}
