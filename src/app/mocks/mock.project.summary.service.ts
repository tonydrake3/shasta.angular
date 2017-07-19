import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {mockProjects} from './data/mockProject.data';

@Injectable()
export class MockProjectSummaryService {
    _projectDetail$ = new Subject();

    constructor() {}

    get projectDetail$() {
        return this._projectDetail$.asObservable();
    }

    public config (id: string) {

        this.getLatest();
    }

    getLatest() {

        // this._projects$.next(mockProjects);
        setTimeout(() => {
            this._projectDetail$.next(mockProjects);
        });
    }

    doEmit(message) {
        this._projectDetail$.next(message);
    }
}
