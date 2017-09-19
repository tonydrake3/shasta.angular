import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AuthGuard } from './auth-guard.service';
import { AuthenticationService } from '../authentication/authentication.service';

import { MockRouter } from '../../../mocks/mock.router';
import { MockAuthenticationService } from '../../../mocks/mock.authentication.service';

import 'hammerjs';

describe('AuthGuard Service', () => {

  let mockRouter;
  let mockAuthenticationService;
  let authGuard: AuthGuard;

  beforeEach((done) => {

    mockRouter = new MockRouter();
    mockAuthenticationService = new MockAuthenticationService();

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter },
        { provide: AuthenticationService, useValue: mockAuthenticationService }
      ]
    })
    .compileComponents().then(() => {
      done();
    });

    spyOn(mockRouter, 'navigate');
    spyOn(mockAuthenticationService, 'isLoggedIn').and.callThrough();
  });

  beforeEach(inject([AuthGuard], (auth: AuthGuard) => {
    authGuard = auth;
  }));

  describe('canLoad', () => {

    it('should return true if isLoggedIn', () => {
      expect(authGuard.canLoad(['testRoute'])).toBeFalsy();
      mockAuthenticationService.isAuth = true;
      expect(authGuard.canLoad(['testRoute'])).toBeTruthy();
      expect(mockAuthenticationService.isLoggedIn).toHaveBeenCalled();
    });

    it('should return false if !isLoggedIn', () => {
      mockAuthenticationService.isAuth = false;
      expect(authGuard.canLoad(['testRoute'])).toBeFalsy();
      expect(mockAuthenticationService.isLoggedIn).toHaveBeenCalled();
    });

  });

  describe('canActivate', () => {

    it('should return true if isLoggedIn and not nav anywhere', () => {
      mockAuthenticationService.isAuth = true;
      expect(authGuard.canActivate(null, {url: 'test', root: null})).toBeTruthy();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(mockAuthenticationService.isLoggedIn).toHaveBeenCalled();
    });

    it('should return false if !isLoggedIn and to nav to login', () => {
      mockAuthenticationService.isAuth = false;
      expect(authGuard.canActivate(null, {url: 'test', root: null})).toBeFalsy();
      expect(mockRouter.navigate).toHaveBeenCalled();
      expect(mockAuthenticationService.isLoggedIn).toHaveBeenCalled();
    });
  });
});
