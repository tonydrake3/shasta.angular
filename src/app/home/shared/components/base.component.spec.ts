import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Injector, Component, Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { MockEmptyService } from '../../../mocks/mock.empty.service';
import { MockProjectService } from '../../../mocks/mock.project.service';
import { MockEmptyComponent } from '../../../mocks/mock.empty.component';
import {ProjectService} from '../services/project.service';

import 'hammerjs';

describe('Base Component', () => {

  let comp:    MockEmptyComponent;
  let fixture: ComponentFixture<MockEmptyComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;
  let mockProjectService: MockProjectService;
  let mockEmptyService: MockEmptyService;

  beforeEach((done) => {
    mockProjectService = new MockProjectService();
    mockEmptyService = new MockEmptyService();

    TestBed.configureTestingModule({
      providers: [
        Injector,
        { provide: ProjectService, useValue: mockProjectService },
        { provide: MockEmptyService, useValue: mockEmptyService }
      ],
      declarations: [ MockEmptyComponent ], // declare the test component
    })
    .compileComponents().then(() => {
      // build component accessors
      fixture = TestBed.createComponent(MockEmptyComponent);

      comp = fixture.componentInstance; // Component test instance

      de = fixture.debugElement;
      el = de.nativeElement;

      // build spys
      spyOn(comp, 'projectServiceCallback');
      spyOn(comp, 'emptyServiceCallback');
      spyOn(mockProjectService, 'aPublicMethod');

      done();
    });
  });

  describe('auto injection', () => {
    it('should inject and subscribe to one service', async(() => {
      mockProjectService.doEmit('its automagic');
      expect(comp.projectServiceCallback).toHaveBeenCalledWith('its automagic');
    }));

    it('should allow calls to public methods inside autoInjected services', async(() => {
      expect(mockProjectService.aPublicMethod).not.toHaveBeenCalled();
      comp.callAPublicMethod();
      expect(mockProjectService.aPublicMethod).toHaveBeenCalled();
    }));
  });

  describe('dynamic injection', () => {
    it('should inject and subscribe to one service', async(() => {
      comp.initDynamicInjections();
      mockEmptyService.doEmit('its dyanmic shiggy shiggy');
      expect(comp.emptyServiceCallback).toHaveBeenCalledWith('its dyanmic shiggy shiggy');
    }));
  });

});
