import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {mockProjects} from './data/mockProject.data';

@Injectable()
export class MockProjectService {
  _projects$ = new Subject();

  constructor() {}

  get projects$() {
    return this._projects$.asObservable();
  }

  getLatest() {

      // this._projects$.next(mockProjects);
      setTimeout(() => {
          this._projects$.next(mockProjects);
      });
  }

  // doEmit(message) {
  //   this._projects$.next(message);
  // }
}
