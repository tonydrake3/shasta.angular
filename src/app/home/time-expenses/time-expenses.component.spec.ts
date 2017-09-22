import { ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MdDatepickerModule, MdNativeDateModule, MdProgressSpinnerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TimeExpensesComponent } from './time-expenses.component';
import { TimesheetCardComponent } from './timesheet-card/timesheet-card.component';
import { WeekSelectorComponent } from '../shared/components/week-selector.component';
import { BaseCardComponent } from '../shared/components/base.card.component';
import { BadgedHourComponent } from './timesheet-card/badged-hour.component';

import { TimeRecordsService } from './time-records.service';
import { MockTimeRecordsService } from '../../mocks/mock.time-records.service';
import {CurrentEmployeeService} from '../shared/services/user/current-employee.service';
import {MockCurrentEmployeeService} from '../../mocks/mock.current-employee.service';

import { KeysPipe } from '../shared/pipes/keys.pipe';

import * as moment from 'moment';
import 'hammerjs';


describe('TimeExpenses Component', () => {

  let comp:    TimeExpensesComponent;
  let fixture: ComponentFixture<TimeExpensesComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  let mockTimeRecordsService;
  let mockEmployeeService;
  let timeRecords;

  beforeEach(() => {

    mockTimeRecordsService = new MockTimeRecordsService();
      mockEmployeeService = new MockCurrentEmployeeService();
    timeRecords = new Array();

    TestBed.configureTestingModule({
      imports: [
        MdDatepickerModule,
        MdNativeDateModule,
        MdProgressSpinnerModule,
        FormsModule
      ],
      providers: [
        { provide: TimeRecordsService, useValue: mockTimeRecordsService },
        { provide: CurrentEmployeeService, useValue: mockEmployeeService },
        { provide: ActivatedRoute,
          useValue: {
            params: Observable.of({id: 'view'})
          }
        }
      ],
      declarations: [
        BadgedHourComponent,
        KeysPipe,
        BaseCardComponent,
        WeekSelectorComponent,
        TimesheetCardComponent,
        TimeExpensesComponent
      ]
    });

    // build component accessors
    fixture = TestBed.createComponent(TimeExpensesComponent);

    comp = fixture.componentInstance; // Component test instance

    de = fixture.debugElement;
    el = de.nativeElement;

    // build spys
    spyOn(comp, 'buildTimesheets');
    spyOn(comp.timesheetsComponent, 'buildTimesheets');

    // builds events
    const leftclickevent = { button: 0 };
  });

  // for all below, buildTimesheets is auto called once (from dateChanged event)
      // so we always start with detectChanges and expect (1)

  it('should show as loading from page init until first TimeRecordsService callback', () => {
    fixture.detectChanges();
    expect(comp.loading).toBeTruthy();
    mockTimeRecordsService.doEmit(timeRecords);
    expect(comp.loading).toBeFalsy();
  });

  it('should build timesheets when TimeRecordsService callback fires', () => {
    fixture.detectChanges();
    expect(comp.buildTimesheets).toHaveBeenCalledTimes(1);
    mockTimeRecordsService.doEmit(timeRecords);
    expect(comp.buildTimesheets).toHaveBeenCalledTimes(2);
  });

  it('should build timesheets when user changes timesheet grouping', () => {
    fixture.detectChanges();
    expect(comp.buildTimesheets).toHaveBeenCalledTimes(1);

    const groupByProject = de.query(By.css('[id*="time-expenses.group-by-project"]'));
    const groupByEmployee = de.query(By.css('[id*="time-expenses.group-by-employee"]'));

    groupByProject.nativeElement.click();
    groupByEmployee.nativeElement.click();

    expect(comp.buildTimesheets).toHaveBeenCalledTimes(3);
  });

  it('should build timesheets when user changes timesheet date range', () => {
    fixture.detectChanges();
    expect(comp.buildTimesheets).toHaveBeenCalledTimes(1);

    const previousButton = de.query(By.css('[id*="esub-week-selector.previous-week"]'));
    const nextButton = de.query(By.css('[id*="esub-week-selector.next-week"]'));

    previousButton.nativeElement.click();
    nextButton.nativeElement.click();

    expect(comp.buildTimesheets).toHaveBeenCalledTimes(3);
  });

  it('should build timesheets when user changes timesheet filtering', () => {
    fixture.detectChanges();
    expect(comp.buildTimesheets).toHaveBeenCalledTimes(1);

    const filterAll = de.query(By.css('[id*="time-expenses.filter-to-all"]'));
    const filterMine = de.query(By.css('[id*="time-expenses.filter-to-mine"]'));

    filterAll.nativeElement.click();
    filterMine.nativeElement.click();

    expect(comp.buildTimesheets).toHaveBeenCalledTimes(3);
  });
});
