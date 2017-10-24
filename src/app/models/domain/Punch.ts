import { DbGeography } from 'app/models/domain/DbGeography';

export class Punch {
  punchIn?: Date;
  punchInLocation?: DbGeography;
  punchInUserId?: number;
  punchOut?: Date;
  punchOutLocation?: DbGeography;
  punchOutUserId?: number;
  timeRecordId?: number;
  tenantId?: number;

  PunchIn?: string;
  PunchInLocation?: Location;
  PunchInUserId?: number;
  PunchOut?: string;
  PunchOutLocation?: Location;
  PunchOutUserId?: number;
  TimeRecordId?: number;
  TenantId?: number;

  constructor(punchIn: string, punchOut: string) {
    this.PunchIn = punchIn;
    this.PunchOut = punchOut;
  }
}
