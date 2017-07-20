import { Component } from '@angular/core';

import { TimeRecordsService } from '../time-records.service';

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
    templateUrl: './enter-time.component.html'
})
export class EnterTimeComponent {

  constructor(private timeRecordsService: TimeRecordsService) { }
}
