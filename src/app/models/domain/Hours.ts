export class Hours {
    regularTime = 0;
    overtime = 0;
    doubleTime = 0;

    constructor(regularTime: number = 0, overtime: number = 0, doubleTime: number = 0) {
        this.regularTime = regularTime;
        this.overtime = overtime;
        this.doubleTime = doubleTime;
    }
}
