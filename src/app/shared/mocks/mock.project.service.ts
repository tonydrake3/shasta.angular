import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MockProjectService {
  _projects$ = new Subject();

  constructor() {
    this._projects$ = new Subject();
  }

  get projects$() {
    return this._projects$.asObservable();
  }

  getLatest() { }

  doEmit(message) {
    this._projects$.next(message);
  }

  public aPublicMethod() { }
}
