// Describes the suite of basic application load tests

import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule, MdNativeDateModule } from '@angular/material';

import { WeekSelectorComponent } from './week-selector.component';

import * as moment from 'moment';
import 'hammerjs';

describe('WeekSelector Component', () => {

  let comp:    WeekSelectorComponent;
  let fixture: ComponentFixture<WeekSelectorComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, MdNativeDateModule ],
      declarations: [ WeekSelectorComponent ], // declare the test component
    });

    // build component accessors
    fixture = TestBed.createComponent(WeekSelectorComponent);

    comp = fixture.componentInstance; // AppComponent test instance

    de = fixture.debugElement;
    el = de.nativeElement;

    // build spys
    spyOn(comp, 'emit');

    // builds events
    const leftclickevent = { button: 0 };
  });

  // test that emit() actually broadcasts
  it('should broadcast dateRange when changed', () => {
    fixture.detectChanges();

    // subscribe to EventEmitter
    comp.dateChange.subscribe(date => {
      // expect this line to be called
      expect(date).toBeDefined();
    });

    // call emit
    comp.emit();
  });

  it('should init dateRange to begin/end of current week, modified by offset', () => {
    fixture.detectChanges();

    const expectedStartDate = moment().startOf('week').add(comp.startOfWeekOffset);
    const expectedEndDate = moment().endOf('week').add(comp.startOfWeekOffset);

    expect(comp.dateRange.startDate).toEqual(expectedStartDate);
    expect(comp.dateRange.endDate).toEqual(expectedEndDate);
  });

  it('should emit during ngOnOnit', () => {
    fixture.detectChanges();

    expect(comp.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit when you change the date with week arrows', () => {
    fixture.detectChanges();

    const previousButton = de.query(By.css('[id*="esub-week-selector.previous-week"]'));
    const nextButton = de.query(By.css('[id*="esub-week-selector.next-week"]'));

    previousButton.nativeElement.click();
    nextButton.nativeElement.click();

    // expect 3; once for onInit, once for back arrow, and once for forwards arrow
    expect(comp.emit).toHaveBeenCalledTimes(3);
  });

  it('should emit when you change the date from calendar picker', () => {
    fixture.detectChanges();

    const dateRange = {
      stateDate: moment(),
      endDate: moment()
    };

    comp.calendarDateSelected(dateRange);

    // expect 2; once for onInit, once for calendar date click
    expect(comp.emit).toHaveBeenCalledTimes(2);
  });

  it('should add weeks correctly', () => {
    fixture.detectChanges();

    const originalExpectedStartDate = moment().startOf('week').add(comp.startOfWeekOffset);
    const originalExpectedEndDate = moment().endOf('week').add(comp.startOfWeekOffset);

    const modifiedExpectedStartDate = originalExpectedStartDate.clone().add(1, 'weeks');
    const modifiedExpectedEndDate = originalExpectedEndDate.clone().add(1, 'weeks');

    expect(comp.dateRange.startDate).toEqual(originalExpectedStartDate);
    expect(comp.dateRange.endDate).toEqual(originalExpectedEndDate);

    comp.weekAdd(1);

    expect(comp.dateRange.startDate).toEqual(modifiedExpectedStartDate);
    expect(comp.dateRange.endDate).toEqual(modifiedExpectedEndDate);
  });
});
