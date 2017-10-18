import {Injectable} from '@angular/core';
import {mockNotifications} from './data/mockNotification.data';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class MockNotificationService {

    private _notifications = new ReplaySubject(1);

    constructor() {}

    getLatest() {

        // this._projects$.next(mockProjects);
        setTimeout(() => {
            this._notifications.next(mockNotifications['Value']);
        });
    }

    get notifications$() {
        return this._notifications.asObservable();
    }
}
