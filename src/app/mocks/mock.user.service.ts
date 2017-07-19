import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MockUserService {
  _currentUserInfo$ = new Subject();

  constructor() {
    this._currentUserInfo$ = new Subject();
  }

  get currentUserInfo$() {
    return this._currentUserInfo$.asObservable();
  }

  getLatest() { }

  doEmit(message) {
    this._currentUserInfo$.next(message);
  }
}
