import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { apiRoutes } from '../../models/configuration/apiRoutes';
import { BaseStore } from '../../shared/services/base-store.service';
import {Subject} from 'rxjs/Subject';
import {Project} from '../../models/domain/Project';

@Injectable()
export class ProjectService extends BaseStore {

    project$ = new Subject<Project>();

    constructor(protected _httpPassthrough: Http) {

        super(_httpPassthrough);
        this.init(apiRoutes.projects);
    }

    public getLatest (): Promise<any> {

        return this.load();
    }

    get projects$ () {

        return this._entity$.asObservable();
    }

    get selectedProject$ () {

        return this.project$.asObservable();
    }

    setSelectedProject (project: Project) {
        console.log('setSelected', project);
        this.project$.next(project);
    }

}
