import { ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimesheetCardManager } from './timesheet-card.manager';

import * as moment from 'moment';
import 'hammerjs';

xdescribe('TimesheetCard Manager', () => {

  let timesheetCardManager: TimesheetCardManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        TimesheetCardManager
      ],
      declarations: [
      ]
    });
  });

  beforeEach(inject([TimesheetCardManager], (manager: TimesheetCardManager) => {
    timesheetCardManager = manager;
  }));

  describe('buildTimecard', () => {

    it('should return array same length of input', () => {

    })
    it('should sum up total hours by day', () => {

    })
    it('should include approved/pending/rejection status for each day', () => {

    })
    it('should include comments for each day', () => {

    })
    it('should persist employee, project, systemPhase, and costCode', () => {

    })
  });

  describe('buildWeekDateRangeDetails', () => {

    it('should return array same length of input', () => {

    })
    it('should build array of dates across specified week range', () => {

    })
  });

  describe('getTimecardTotalHours', () => {

    it('should return total hours for a specified day', () => {

    })
    it('should return total hours for entire card if no day is specific', () => {

    })
    it('should return total hours filtered by project if specific', () => {

    })
    it('should return total hours filtered by employee if specific', () => {

    })
    it('should return total hours filtered by systemPhase if specific', () => {

    })
  });
});
