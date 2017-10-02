import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class DateFlyoutService {

    _isOpen$ = new BehaviorSubject<boolean>(false);

    public get isOpen$ () {

        return this._isOpen$.asObservable();
    }

    public openDateFlyout () {

        // console.log('Open Date Flyout');
        this._isOpen$.next(true);
    }

    public closeDateFlyout () {

        this._isOpen$.next(false);
    }

}
