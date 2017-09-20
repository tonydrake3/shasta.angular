import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {routeName} from '../../configuration/web-route-names.configuration';

export interface CanComponentDeactivate {
    canDeactivate: () => any; // boolean|Promise<boolean>|Observable<boolean>;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot): Observable<boolean> | boolean  {

        return component.canDeactivate ? this.toObservable(component.canDeactivate()) : true;
    }

    private toObservable(deactivate: Promise<boolean> | boolean ): Observable<boolean> | boolean {

        const p = Promise.resolve(deactivate);
        const o = Observable.fromPromise(p);
        return o;
    }
}

/*  Code from JohnPapa.net. */
