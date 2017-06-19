import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProjectService } from '../../../features/projects/project.service';

@Injectable()
export class ProjectGuard {

    // constructor(private _router: Router) {}

    // canLoad (route: Route): Promise<boolean> {
    //
    //     // return new Promise((resolve) => {
    //     //     this._projectService.hasMultipleProjects()
    //     //
    //     //         .then((result: any) => {
    //     //
    //     //             if (result) {
    //     //                 resolve(true);
    //     //             } else {
    //     //                 this._router.navigate(['dashboard']);
    //     //                 resolve(false);
    //     //             }
    //     //         });
    //     // });
    //
    // }
    //
    // canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    //
    //     return new Promise((resolve) => {
    //         this._projectService.hasMultipleProjects()
    //
    //             .then((result: any) => {
    //
    //                 if (result) {
    //                     resolve(true);
    //                 } else {
    //                     this._router.navigate(['dashboard']);
    //                     resolve(false);
    //                 }
    //             });
    //     });
    // }
}
