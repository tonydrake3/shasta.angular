import * as moment from 'moment';

export class WeekDateRange {
  startDate: moment.Moment;
  endDate: moment.Moment;
}

export class WeekDateRangeDetails {
  dayString: string;
  dateString: string;
  date: moment.Moment;
}
