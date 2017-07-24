import {Injectable} from '@angular/core';
import {mockNotifications} from './data/mockNotification.data';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MockNotificationService {

    _notifications = new Subject();

    constructor() {}

    get notifications$() {
        return this._notifications.asObservable();
    }

    getLatest() {

        // this._projects$.next(mockProjects);
        setTimeout(() => {
            this._notifications.next(mockNotifications['Value']);
        });
    }
}
