import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MockCurrentEmployeeService {
    _currentEmployee = new Subject();

    constructor() {
        this._currentEmployee = new Subject();
    }

    get currentEmployee$() {
        return this._currentEmployee.asObservable();
    }

    getLatest() { }

    doEmit(message) {
        this._currentEmployee.next(message);
    }
}
