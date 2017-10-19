import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {PopoverOptions} from '../../../models/configuration/PopoverOptions';

@Injectable()
export class PopoverService {

    private _isOpen$ = new BehaviorSubject<boolean>(false);
    private _options: PopoverOptions;

    public get isOpen$ () {

        return this._isOpen$.asObservable();
    }

    public get settings$ (): PopoverOptions {

        return this._options;
    }

    public getCurrentPopoverState (): boolean {

        return this._isOpen$.value;
    }

    public openPopover (options: PopoverOptions) {

        this._options = options;
        this._isOpen$.next(true);
    }

    public closePopover () {

        this._isOpen$.next(false);
    }

}
