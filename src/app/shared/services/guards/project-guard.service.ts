import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProjectService } from '../../../features/projects/project.service';

@Injectable()
export class ProjectGuard implements CanActivate  {

    constructor(private _router: Router, private _projectService: ProjectService) {}

    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

        return new Promise((resolve, reject) => {

            this._projectService.projects$

                .subscribe(
                    (projects) => {
                        console.log('canActivateCallback', projects['Value'].length > 1);
                        if (projects['Value'].length > 1) {

                            resolve(true);
                        } else {

                            // sessionStorage.setItem('project', JSON.stringify(projects['value'][0].Id));
                            this._router.navigate(['dashboard']);
                            resolve(false);
                        }
                    },
                    (error) => {
                        this._router.navigate(['project']);
                        reject(error);
                    }
                )
        });
    }
}
