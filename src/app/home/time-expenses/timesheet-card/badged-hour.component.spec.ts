import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BadgedHourComponent } from './badged-hour.component';

import 'intl/locale-data/jsonp/en.js';

describe('BadgedHour Component', () => {

  let comp:    BadgedHourComponent;
  let fixture: ComponentFixture<BadgedHourComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ BadgedHourComponent ]
    });

    // build component accessors
    fixture = TestBed.createComponent(BadgedHourComponent);

    comp = fixture.componentInstance; // Component test instance

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('should display comment badge only if comment is present and current view shows comment badge', () => {
    let comment = de.query(By.css('[id*="badged-hour.has-comment"]'));

    // before setting data
    expect(comment).toBeNull();

    // don't show but do have

    comp.showBadges = {
      statusError: false,
      comments: false,
      mapError: false
    };
    comp.day = {
      status: 'Rejected',
      comments: [1],
      mapError: false,
      comment: 0
    };

    fixture.detectChanges();
    comment = de.query(By.css('[id*="badged-hour.has-comment"]'));
    expect(comment).toBeNull();

    // do show but don't have

    comp.showBadges = {
      statusError: true,
      comments: true,
      mapError: false
    };
    comp.day = {
      status: 'Pending',
      comments: [],
      mapError: false,
      comment: 0
    };

    fixture.detectChanges();
    comment = de.query(By.css('[id*="badged-hour.has-comment"]'));
    expect(comment).toBeNull();

    // do show and do have

    comp.showBadges = {
      statusError: true,
      comments: true,
      mapError: false
    };
    comp.day = {
      status: 'Rejected',
      comments: [1],
      mapError: false,
      comment: 0
    };

    fixture.detectChanges();
    comment = de.query(By.css('[id*="badged-hour.has-comment"]'));
    expect(comment).not.toBeNull();
  });

  it('should display map error badge only if map error exists and current view shows map error badge', () => {
    let mapErr = de.query(By.css('[id*="badged-hour.has-map-error"]'));

    // before setting data
    expect(mapErr).toBeNull();

    // don't show but do have

    comp.showBadges = {
      statusError: false,
      comments: false,
      mapError: false
    };
    comp.day = {
      status: 'Rejected',
      comments: [1],
      mapError: true,
      comment: 0
    };

    fixture.detectChanges();
    mapErr = de.query(By.css('[id*="badged-hour.has-map-error"]'));
    expect(mapErr).toBeNull();

    // do show but don't have

    comp.showBadges = {
      statusError: true,
      comments: true,
      mapError: true
    };
    comp.day = {
      status: 'Pending',
      comments: [],
      mapError: false,
      comment: 0
    };

    fixture.detectChanges();
    mapErr = de.query(By.css('[id*="badged-hour.has-map-error"]'));
    expect(mapErr).toBeNull();

    // do show and do have

    comp.showBadges = {
      statusError: true,
      comments: true,
      mapError: true
    };
    comp.day = {
      status: 'Rejected',
      comments: [1],
      mapError: true,
      comment: 0
    };

    fixture.detectChanges();
    mapErr = de.query(By.css('[id*="badged-hour.has-map-error"]'));
    expect(mapErr).not.toBeNull();
  });

  it('should display in red (via class .has-error) if status is Rejected and current view shows status badge', () => {
    const hours = (de.query(By.css('[id*="badged-hour.hour"]'))).nativeElement;
    let hoursCss = hours.getAttribute('class');

    // before setting data
    expect(hoursCss).not.toContain('has-error');

    // don't show but do have

    comp.showBadges = {
      statusError: false,
      comments: false,
      mapError: false
    };
    comp.day = {
      status: 'Rejected',
      comments: [],
      mapError: false,
      hours: 0
    };

    fixture.detectChanges();
    hoursCss = hours.getAttribute('class');
    expect(hoursCss).not.toContain('has-error');

    // do show but don't have

    comp.showBadges = {
      statusError: true,
      comments: false,
      mapError: false
    };
    comp.day = {
      status: 'Pending',
      comments: [],
      mapError: false,
      hours: 0
    };

    fixture.detectChanges();
    hoursCss = hours.getAttribute('class');
    expect(hoursCss).not.toContain('has-error');

    // do show and do have

    comp.showBadges = {
      statusError: true,
      comments: false,
      mapError: false
    };
    comp.day = {
      status: 'Rejected',
      comments: [],
      mapError: false,
      hours: 0
    };

    fixture.detectChanges();
    hoursCss = hours.getAttribute('class');
    expect(hoursCss).toContain('has-error');
  });
});
