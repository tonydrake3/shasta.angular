// BaseComponent
// for sample usage see https://teamesub.atlassian.net/wiki/display/SH/Base+Component
// **note about ngOnDestroy
  // this component handles OnDestroy events and clean up all injected subsriptions. If your inheriting component
  //   wishes to also use Angular's OnDestroy that's fine, but you must also call super.ngOnDestroy() to handle this cleanup

import { Component, Injector, OnDestroy } from '@angular/core';
import { Subscriber } from 'rxjs/Rx';

// imports for autoInjection
import { ProjectService } from '../../features/projects/project.service';
import { TimeRecordsService } from '../../features/time-expenses/time-records.service';


@Component({ })
export class BaseComponent implements OnDestroy {
  private autoInjections: Array<AutomaticInjectionProvider>;
  private subscriptionList: Array<Subscriber<any>>;

  constructor(protected injector: Injector, injectionRequests: Array<AutomaticInjectionRequest>) {
    this.subscriptionList = new Array();

    // list of services to automatically inject, if requested by child component
    //   must provide them in the constructor
    this.autoInjections = [
      { key: 'ProjectService', serviceObject: ProjectService, subject: 'projects$', initializer: 'getLatest' },
      { key: 'TimeRecordsService', serviceObject: TimeRecordsService, subject: 'timeRecords$', initializer: 'getLatest' }
    ];

    // and inject them
    this.autoInjections.forEach(auto => {

      // manage each request
      let requested = false;
      let requestedCallback;

      injectionRequests.forEach(request => {
        // if requested
        if (request.service === auto.key) {
          // set internals
          requested = true;
          requestedCallback = request.callback;
        }
      });

      // if requested or requests is empty []  (which indicates inheritor wants all autoInjections)
      if ((requested && requestedCallback) || injectionRequests.length === 0) {
        auto.serviceRef = injector.get(auto.serviceObject);   // get reference to service
        const sub = auto.serviceRef[auto.subject].subscribe(data => { this[requestedCallback](data) });  // subscribe to Observable
        this.subscriptionList.push(sub);  // save subscription, to later unsubscribe from
        auto.serviceRef[auto.initializer]();  // call initalizer
      }
    });
  }

  // list of services to dynamically provide, provided by child component
  //   automatically handles subscription, callbacks, and initializers
  inject(injections: Array<DynamicInjectionRequest>) {
    injections.forEach(injection => {
      const service = this.injector.get(injection.toInject);   // get reference to service
      const sub = service[injection.subject].subscribe(data => { this[injection.callback](data) });  // subscribe to Observable
      this.subscriptionList.push(sub);  // save subscription, to later unsubscribe from
      service[injection.initializer]();  // call initalizer
    });
  }

  // unsubscribe from all subscriptions
  ngOnDestroy() {
    this.subscriptionList.forEach(sub => {
      sub.unsubscribe();
    })
  }
}

// child component passes in array of these to inject(), BaseComponent automatically subscribes to them
class DynamicInjectionRequest {
  toInject: Object;
  subject: string;
  initializer: string;
  callback: string;
}

// child component passes in array of these to super(), BaseComponent facilitates DI of them and provides references
class AutomaticInjectionRequest {
  service: string;
  callback: string;
}

// internal class for BaseComponent to manage what it wants to automatically inject
class AutomaticInjectionProvider {
  key: string;
  serviceObject: Object;
  subject: string;
  initializer: string;
  serviceRef?: any;
}
