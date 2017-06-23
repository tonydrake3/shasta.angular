
// Sample usage for automatic and dynamic service references to use with BaseComponent
// to exercise sample provide all services in shared.module and declare this sample component

import { Component, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { BaseComponent } from './base.component';

@Injectable()
export class AutomaticallyInjectedService {
  _subject$;

  constructor() {
    this._subject$ = new Subject();
  }

  get subject$() {
    return this._subject$.asObservable();
  }

  myInitMethod() {
    setInterval(() => {
      this._subject$.next('ITS AUTOMATIC! ');
    }, 2000);
  }
}

@Injectable()
export class BaseComponentSampleUsageService {
  _subject$;

  constructor() {
    this._subject$ = new Subject();
  }

  get subject$() {
    return this._subject$.asObservable();
  }

  myInitMethod() {
    setInterval(() => {
      this._subject$.next('message1 ');
    }, 2000);
  }
}
@Injectable()
export class BaseComponentSampleUsageService2 {
  _subject$;

  constructor() {
    this._subject$ = new Subject();
  }

  get subject$() {
    return this._subject$.asObservable();
  }

  myInitMethod() {
    setInterval(() => {
      this._subject$.next('message2 ');
    }, 2000);
  }
}

@Component({
  selector: 'esub-base-component-sample-usage',
  template: ``
})
export class BaseComponentSampleUsageComponent extends BaseComponent {

  constructor(protected injector: Injector, private baseComponentSampleUsageService: BaseComponentSampleUsageService,
    private baseComponentSampleUsageService2: BaseComponentSampleUsageService2) {

    // this is the list of "automatic" services we want BaseComponent to subscribe to for us
    //  notice how AutomaticallyInjectedService isn't actually injected into this Component,
    //  the only thing we must provide is Injector to our BaseComponent
    super(injector, [
      {
        service: 'AutomaticallyInjectedService',
        callback: 'myAutomaticCallback'
      }
    ]);

    // this is the list of "dynamic" services we want BaseComponent to manage for us
    //   it will subscribe to them, call the initalizer, and notify our callback as necessary
    super.inject([
      {
        toInject: BaseComponentSampleUsageService,
        subject: 'subject$',
        initializer: 'myInitMethod',
        callback: 'myCallback'
      },
      {
        toInject: BaseComponentSampleUsageService2,
        subject: 'subject$',
        initializer: 'myInitMethod',
        callback: 'myCallback2'
      }
    ]);

    // notice how we never actually subscribe to any observables
  }

  myCallback(message) {
    console.log('myCallback', message);
  }
  myCallback2(message) {
    console.log('myCallback2', message);
  }
  myAutomaticCallback(message) {
    console.log('MAGIC: ', message);
  }
}
