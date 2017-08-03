// BaseComponent
// for sample usage see https://teamesub.atlassian.net/wiki/display/SH/Base+Component
// **note about ngOnDestroy
  // this component handles OnDestroy events and clean up all injected subsriptions. If your inheriting component
  //   wishes to also use Angular's OnDestroy that's fine, but you must also call super.ngOnDestroy() to handle this cleanup

import { Component, Injector, OnDestroy } from '@angular/core';
import { Subscriber } from 'rxjs/Rx';

// imports for autoInjection
import { ProjectService } from '../../shared/services/project.service';
import { TimeRecordsService } from '../../time-expenses/time-records.service';
import { UserService } from '../services/user/user.service';
import {ProjectSummaryService} from '../../projects/project-summary/project-summary.service';
import {MapsService} from '../services/maps.service';
import {WeatherService} from '../services/weather.service';

@Component({ })
export class BaseComponent implements OnDestroy {
  private autoInjections: Array<AutomaticInjectionProvider>;
  private subscriptionList: Array<Subscriber<any>>;

  constructor(protected injector: Injector, injectionRequests: Array<AutomaticInjectionRequest>) {
    this.subscriptionList = new Array();

    // empty array [] input for injectionRequests indiciates zero autoInjections
    if (injectionRequests.length === 0) return;

    // list of services to automatically inject, if requested by child component
    //   must provide them in the constructor
    this.autoInjections = [
      { key: 'ProjectService', serviceObject: ProjectService, subject: 'projects$', initializer: 'getLatest' },
      {},
      {},
      { key: 'TimeRecordsService', serviceObject: TimeRecordsService, subject: 'timeRecords$', initializer: 'getLatest' },
      { key: 'UserService', serviceObject: UserService, subject: 'currentUserInfo$', initializer: 'getLatest' },
      { key: 'ProjectSummaryService', serviceObject: ProjectSummaryService, subject: 'projectDetail$', initializer: 'getLatest' },
      { key: 'MapsService', serviceObject: MapsService, subject: 'location$', initializer: 'getLatest'},
      { key: 'WeatherService', serviceObject: WeatherService, subject: 'weather$', initializer: 'getLatest'}
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

      // if requested
      if (requested && requestedCallback) {
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

  // given a service key, returns direct access to that service to facilitate calling public methods on requested service
  //     calls should be wrapped in an if(exists) because retVal is not guarenteed
  //     example usage:   `this.projectService = super.getServiceRef('ProjectService') as ProjectService;`
  getServiceRef(serviceKey: string): Object {
    for (const autoKey in this.autoInjections) {
      if (this.autoInjections.hasOwnProperty(autoKey)) {

        const auto = this.autoInjections[autoKey];

        if (auto.key === serviceKey && auto.serviceRef) {
          return auto.serviceRef
        }
      }
    }

    return null;
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
