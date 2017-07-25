import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class PopoverService {

    _isOpen$ = new BehaviorSubject<boolean>(false);

    public get isOpen$ () {

        return this._isOpen$.asObservable();
    }

    public openPopover () {

        this._isOpen$.next(true);
    }

    public closePopover () {

        this._isOpen$.next(false);
    }

}
