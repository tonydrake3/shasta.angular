import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { TimeRecordsService } from './time-records.service';

import 'hammerjs';

describe('TimeRecords Service', () => {

  let timeRecordsService: TimeRecordsService;

  beforeEach((done) => {

    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ TimeRecordsService ]
    })
    .compileComponents().then(() => {
      done();
    });
  });

  beforeEach(inject([TimeRecordsService], (time: TimeRecordsService) => {
    timeRecordsService = time;
  }));

  describe('getLatest', () => {

    it('should return and resolve a promise', () => {
      const timePromise = timeRecordsService.getLatest();
      expect(timePromise).toEqual(jasmine.any(Promise));
    });

  });

  describe('get timeRecords$', () => {

    it('should return an Observable', () => {
      const timeObservable = timeRecordsService.timeRecords$;
      expect(timeObservable).toEqual(jasmine.any(Observable));
    });

  });
});
