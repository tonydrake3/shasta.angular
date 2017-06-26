import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injectable } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { AppComponent } from './app.component';

import { MockRouter } from './shared/mocks/mock.router';

import 'hammerjs';

describe('App Component', () => {

  let comp:    AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let mockRouter;

  beforeEach((done) => {
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ AppComponent ],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);

      comp = fixture.componentInstance; // AppComponent test instance

      de = fixture.debugElement;
      el = de.nativeElement;
      done();
    });
  });

  describe('init', () => {
    it('should contain router-outlet', () => {
      expect(el.querySelector('router-outlet')).toBeTruthy();
    });

    it('should set the git version', () => {
      expect(comp.gitVersion).toBeDefined();
    });

    it('should set app config on ngOnInit', () => {
      fixture.detectChanges();
      expect(comp.AppConfig).toBeDefined();
    });

    it('should set the git version', () => {
      fixture.detectChanges();
      expect(comp.gitVersion).toBeDefined();
    });
  });

  describe('listeners', () => {
    it('should scroll to top on route change', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      document.body.scrollTop = 100;
      mockRouter.triggerNavEvents();
      expect(document.body.scrollTop).toEqual(0);
    }));
  });
});
