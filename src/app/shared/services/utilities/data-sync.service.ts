
import {Injectable} from '@angular/core';
import {Project} from '../../../models/domain/Project';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class DataSyncService {

    _project$ = new ReplaySubject<Project>();

    get project$ () {

        console.log('GetProject');
        return this._project$.asObservable();
    }

    setProject (newProject: Project) {

        console.log('Set Project');
        this._project$.next(newProject);
    }

}
