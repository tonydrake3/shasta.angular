// Describes the suite of basic application load tests

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WeekSelectorComponent } from './week-selector.component';

fdescribe('week selector', () => {

  let comp:    WeekSelectorComponent;
  let fixture: ComponentFixture<WeekSelectorComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ],
      declarations: [ WeekSelectorComponent ], // declare the test component
    });

    fixture = TestBed.createComponent(WeekSelectorComponent);

    comp = fixture.componentInstance; // AppComponent test instance

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  // test that emit() actually broadcasts
  it('should broadcast dateRange when changed', () => {
    fixture.detectChanges();
  });

  it('should init dateRange to begin/end of current week, modified by offset', () => {

  });

  it('should emit when you change the date from calendar picker', () => {

  });

  it('should emit when you change the date with week arrows', () => {

  });

  it('should add and substract weeks', () => {

  });
});
