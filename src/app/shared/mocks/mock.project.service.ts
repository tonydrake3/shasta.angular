import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {mockProjects} from './data/mockProject.data';

@Injectable()
export class MockProjectService {
  _projects$ = new Subject();

  constructor() {
    this._projects$ = new Subject();
  }

  get projects$() {
    return this._projects$.asObservable();
  }

  getLatest() {
      this._projects$.next(mockProjects);
  }

  doEmit(message) {
    this._projects$.next(message);
  }
}
