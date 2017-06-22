// Describes the suite of basic application load tests

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

import 'hammerjs';

describe('application load', () => {

  let comp:    AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ AppComponent ], // declare the test component
    });

    fixture = TestBed.createComponent(AppComponent);

    comp = fixture.componentInstance; // AppComponent test instance

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  // test that <router-outlet> is present in app.component
    // proves no errors building html
  it('should contain router-outlet', () => {
    fixture.detectChanges();
    expect(el.querySelector('router-outlet')).toBeTruthy();
  });

  it('should set the git version', () => {
    fixture.detectChanges();
    expect(comp.gitVersion).toBeDefined();
  });

  it('should set app config on ngOnInit', () => {
    fixture.detectChanges();
    expect(comp.AppConfig).toBeDefined();
  });

  it('should scroll to top on route change', () => {
    console.log('scrollTop', de.nativeElement.scrollTop);
  });

  it('should route to login if ##', () => {

  });

  it('should route to company if ##', () => {

  });
});
