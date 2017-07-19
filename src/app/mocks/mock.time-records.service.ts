import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MockTimeRecordsService {
  _timeRecords$ = new Subject();

  constructor() {
    this._timeRecords$ = new Subject();
  }

  get timeRecords$() {
    return this._timeRecords$.asObservable();
  }

  getLatest() { }

  doEmit(message) {
    this._timeRecords$.next(message);
  }
}
