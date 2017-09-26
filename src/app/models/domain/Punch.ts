export class Punch {
    PunchIn?: string;
    PunchInLocation?: Location;
    PunchInUserId?: number;
    PunchOut?: string;
    PunchOutLocation?: Location;
    PunchOutUserId?: number;
    TimeRecordId?: number;
    TenantId?: number;

    constructor (punchIn: string, punchOut: string) {

        this.PunchIn = punchIn;
        this.PunchOut = punchOut;
    }
}

