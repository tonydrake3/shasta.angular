import { Injectable } from '@angular/core';

@Injectable()
export class LookupDataService {

    constructor () {}

    getTimesheetMenu () {

    }

    getProjectsMenu (): Promise<any> {
        return new Promise((resolve) => {

            resolve();
        });
    }
}
