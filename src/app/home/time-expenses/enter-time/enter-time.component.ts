import { Component, Injector } from '@angular/core';

import { BaseComponent } from '../../shared/components/base.component';

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
    templateUrl: './enter-time.component.html'
})
export class EnterTimeComponent extends BaseComponent {

  constructor(protected injector: Injector) {
    super(injector, []);
  }
}
