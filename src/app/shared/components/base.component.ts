// BaseComponent

import { Component, Injector } from '@angular/core';

import { AutomaticallyInjectedService } from './sample-usage-base.component';

@Component({ })
export class BaseComponent {
  private autoInjections: Array<AutomaticInjectionProvider>;

  constructor(protected injector: Injector, injectionRequests: Array<AutomaticInjectionRequest>) {
    // list of services to automatically inject, if requested by child component
    //   must provide them in the constructor
    this.autoInjections = [
      { key: 'AutomaticallyInjectedService', serviceObject: AutomaticallyInjectedService, subject: 'subject$', initializer: 'myInitMethod' }
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
        auto.serviceRef[auto.subject].subscribe(data => { this[requestedCallback](data) });  // subscribe to Observable
        auto.serviceRef[auto.initializer]();  // call initalizer
      }
    });
  }

  // list of services to dynamically provide, provided by child component
  //   automatically handles subscription, callbacks, and initializers
  inject(injections: Array<DynamicInjectionRequest>) {
    injections.forEach(injection => {
      const service = this.injector.get(injection.toInject);   // get reference to service
      service[injection.subject].subscribe(data => { this[injection.callback](data) });  // subscribe to Observable
      service[injection.initializer]();  // call initalizer
    });
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
