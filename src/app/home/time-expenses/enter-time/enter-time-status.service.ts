import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

// TODO: Remove service when angular issue 11836 (CanDeactivateChild) is implemented.
//       https://github.com/angular/angular/issues/11836
@Injectable()
export class EnterTimeStatusService {

    private _enterFormDirty: Subject<boolean>;
    private _enterGridDirty: Subject<boolean>;

    constructor () {

        this._enterFormDirty = new Subject<boolean>();
        this._enterGridDirty = new Subject<boolean>();
    }

    public get formDirty$ () {

        return this._enterFormDirty.asObservable();
    }

    public setFormDirty (flag: boolean) {

        this._enterFormDirty.next(flag);
    }

    public get gridDirty$ () {

        return this._enterGridDirty.asObservable();
    }

    public setGridDirty (flag: boolean) {

        this._enterGridDirty.next(flag);
    }

    public getLatest () {

    }
}

