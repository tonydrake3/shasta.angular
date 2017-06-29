
// internal to timesheet-card ecosystem, not to be confused with TimeRecords, just used to help manage UI
export class Timecard {
  cardTitle: string;
  subTitle: string;
  sections: Array<TimecardSection>
}

export class TimecardSection {
  grouping: string;  // this ends up being either project or employee, depending on their grouping
  system: string;
  phase: string;
  codeCode: string;
}
