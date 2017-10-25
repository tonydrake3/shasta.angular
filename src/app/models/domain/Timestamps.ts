export class Timestamps {

    Updated?: Date;
    Created?: Date;
    ClientUpdated?: Date;
    ClientCreated?: Date;

    constructor() {
        this.Updated = new Date();
        this.Created = new Date();
        this.ClientUpdated = new Date();
        this.ClientCreated = new Date();
    }
}
