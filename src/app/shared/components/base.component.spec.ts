import { ComponentFixture, TestBed, fakeAsync, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { BaseComponent } from './base.component';

import 'hammerjs';

xdescribe('Base Component', () => {

  let comp:    BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [  ],
      declarations: [ BaseComponent ], // declare the test component
    });

    // build component accessors
    fixture = TestBed.createComponent(BaseComponent);

    comp = fixture.componentInstance; // AppComponent test instance

    de = fixture.debugElement;
    el = de.nativeElement;

    // build spys
    // spyOn(comp, 'emit');

    // builds events
    const leftclickevent = { button: 0 };
  });

  describe('auto injection', () => {
    it('should inject and subscribe to one service', () => {

    });
    it('should inject and subscribe to all services', () => {

    });
  });

  describe('dynamic injection', () => {
    it('should inject and subscribe to one service', () => {

    });
  });

});
