import { Component, Injector } from '@angular/core';

import { BaseComponent } from '../components/base.component';
import { MockEmptyService } from '../mocks/mock.empty.service';
import { MockProjectService } from '../mocks/mock.project.service';

@Component({
  template: ``
})
export class MockEmptyComponent extends BaseComponent {
  private projectService: MockProjectService;

  constructor(protected injector: Injector) {
    super(injector, [
      {
        service: 'ProjectService',
        callback: 'projectServiceCallback'
      }
    ]);

    this.projectService = super.getServiceRef('ProjectService') as MockProjectService;
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

  callAPublicMethod() {
    this.projectService.aPublicMethod();
  }

  public projectServiceCallback(data) { }
  public emptyServiceCallback(data) { }
}
