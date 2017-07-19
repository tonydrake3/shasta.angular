import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TimesheetCardComponent } from './timesheet-card.component';
import { TimesheetCardManager } from './timesheet-card.manager';
import { BaseCardComponent } from '../../shared/components/base.card.component';
import { BadgedHourComponent } from './badged-hour.component';

import { UserService } from '../../shared/services/user/user.service';

import { KeysPipe } from '../../shared/pipes/keys.pipe';

import * as moment from 'moment';
import 'hammerjs';

xdescribe('TimesheetCard Component', () => {

  let comp:    TimesheetCardComponent;
  let fixture: ComponentFixture<TimesheetCardComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        MdNativeDateModule,
        FormsModule,
        HttpModule
      ],
      providers: [
        UserService,
        TimesheetCardManager,
        { provide: XHRBackend, useClass: MockBackend }
      ],
      declarations: [
        BadgedHourComponent,
        KeysPipe,
        BaseCardComponent,
        TimesheetCardComponent
      ]
    });

    // build component accessors
    fixture = TestBed.createComponent(TimesheetCardComponent);

    comp = fixture.componentInstance; // Component test instance

    de = fixture.debugElement;
    el = de.nativeElement;

    // builds events
    const leftclickevent = { button: 0 };
  });

  describe('buildTimesheets', () => {

    it('should create an array or Timesheet Cards from a set of timeRecords', () => {

    })
    it('should filter results by specified date range', () => {

    })
    it('should filter results by specified user', () => {

    })
    it('should update view settings', () => {

    })
  })

  describe('buildSections', () => {

    it('should create a series of nested section objects from a grouped set of time records', () => {

    })
  })

  it('saveEntity should save the specified entity', () => {

  });

  it('getEntityName should get specified entity name', () => {

  });

  it('getEntityName should return Unknown if entity not found', () => {

  });

  it('markAll should set selected for all items in specified costCode', () => {

  });
});
