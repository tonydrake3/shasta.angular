import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// @Component({ })
export class BaseComponent {
  // injector: Injector;

  constructor(protected injector: Injector, private injections: Array<BaseComponentInjection>) {
    console.log('BaseComponent constructor');



    injections.forEach(injection => {
      injector.get(injection.toInject);
      // injection.subject.subscribe(data => { injection.callback(data) });
      injection.initializer();
      // console.log(injection.test());
    });
  }
}

class BaseComponentInjection {
  toInject: any;
  subject: Observable<any>; // baseComponentSampleUsageService,
  initializer: Function; // baseComponentSampleUsageService.myInitMethod,
  callback: Function; // (message: string) => { console.log('myCallback: ', message); }
  test?: any;
}


// import { Injector } from '@angular/core';
//
// export class ServiceLocator {
//     static injector: Injector;
// }
