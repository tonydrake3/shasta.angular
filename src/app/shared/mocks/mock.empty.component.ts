import { Component, Injector } from '@angular/core';

import { BaseComponent } from '../components/base.component';
import { MockEmptyService } from '../mocks/mock.empty.service';

@Component({
  template: ``
})
export class MockEmptyComponent extends BaseComponent {
  constructor(protected injector: Injector) {
    super(injector, [
      {
        service: 'ProjectService',
        callback: 'projectServiceCallback'
      }
    ]);
  }

  initDynamicInjections() {
    super.inject([
      {
        toInject: MockEmptyService,
        subject: 'subject$',
        initializer: 'myInitMethod',
        callback: 'emptyServiceCallback'
      }
    ]);
  }

  public projectServiceCallback(data) { }
  public emptyServiceCallback(data) { }
}
