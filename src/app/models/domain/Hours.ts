export class Hours {
    RegularTime = 0;
    Overtime = 0;
    DoubleTime = 0;
    Date?: string;
    get total(): number {
        return this.RegularTime + this.Overtime + this.DoubleTime
    }

    constructor(regularTime: number = 0, overtime: number = 0, doubleTime: number = 0, date?: string) {
        this.RegularTime = regularTime;
        this.Overtime = overtime;
        this.DoubleTime = doubleTime;
        if (date) {
            this.Date = date;
        }
    }
}
