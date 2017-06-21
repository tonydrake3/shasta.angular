import { Component, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { BaseComponent } from './base.component';


@Injectable()
export class BaseComponentSampleUsageService {
  // setup internal stuff
  _subject$;

  constructor() {
    this._subject$ = new Subject();
    console.log('BaseComponentSampleUsageService constructor');
  }

  get subject$() {
    return this._subject$.asObservable();
  }

  myInitMethod() {
    setTimeout(() => {
      this._subject$.next('first message');
    }, 500);

    setTimeout(() => {
      this._subject$.next('second message');
    }, 1000);
  }

  testFunc() {
    return 'holla';
  }
}

@Component({
  selector: 'esub-base-component-sample-usage',
  template: ``
})
export class BaseComponentSampleUsageComponent extends BaseComponent {

  constructor(protected injector: Injector, private baseComponentSampleUsageService: BaseComponentSampleUsageService) {
    super(injector, [
      {
        toInject: BaseComponentSampleUsageService,
        subject: baseComponentSampleUsageService.subject$,
        initializer: baseComponentSampleUsageService.myInitMethod,
        callback: (message: string) => {
          console.log('myCallback: ', message);
        },
        test: baseComponentSampleUsageService.testFunc
      }
    ]);

    // baseComponentSampleUsageService.subject$.subscribe(data => {
    //   console.log('manual: ', data);
    // });
    // baseComponentSampleUsageService.myInitMethod();

    console.log('BaseComponentSampleUsageComponent constructor');
    // notice how we never actuall subscribe to either observable... our BaseComponent automagically handles a subscribe and a getLatest
  }


}
