import { TestBed, inject } from '@angular/core/testing';

import { TimeRecordUpdaterService } from './time-record-updater.service';

describe('TimeRecordUpdaterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeRecordUpdaterService]
    });
  });

  it('should be created', inject([TimeRecordUpdaterService], (service: TimeRecordUpdaterService) => {
    expect(service).toBeTruthy();
  }));
});
