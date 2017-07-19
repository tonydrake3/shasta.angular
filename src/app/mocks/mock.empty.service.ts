import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MockEmptyService {
  _subject$;

  constructor() {
    this._subject$ = new Subject();
  }

  get subject$() {
    return this._subject$.asObservable();
  }

  myInitMethod() { }

  doEmit(message) {
    this._subject$.next(message);
  }
}
