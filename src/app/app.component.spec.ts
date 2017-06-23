import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injectable } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import 'hammerjs';

describe('AppComponent', () => {

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

export class MockRouter {
  public url;
  private subject = new Subject();
  public events = this.subject.asObservable();

  navigate(url: string) {
    this.url = url;
    this.triggerNavEvents();
  }

  triggerNavEvents() {
    const ne = new NavigationEnd(0, 'http://localhost:4200/#/login', 'http://localhost:4200/#/login');
    this.subject.next(ne);
  }
}
