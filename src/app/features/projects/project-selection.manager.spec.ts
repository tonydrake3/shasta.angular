import 'hammerjs';
import {mockProjects} from '../../shared/mocks/data/mockProject.data';
import {projectSortColumns} from '../../models/configuration/sortColumns';
import * as _ from 'lodash';

import {ProjectSelectionManager} from './project-selection.manager';
import {async, TestBed} from '@angular/core/testing';
import {Project} from '../../models/domain/Project';
import {statusMap} from '../../models/configuration/statusMap';

describe('ProjectSelection Service', () => {

    /******************************************************************************************************************
     * Test Config
     ******************************************************************************************************************/
    const projects = [];
    Object.assign(projects, mockProjects['Value']);
    const sortColumn = _.orderBy(projectSortColumns, ['Ordinal'], ['asc'])[0];
    const sortName = _.orderBy(projectSortColumns, ['Ordinal'], ['asc'])[1];

    const wonStatus = _.filter(statusMap, (status) => {

        return status.Value.toLowerCase() === 'won';
    })[0];

    const lostStatus = _.filter(statusMap, (status) => {

        return status.Value.toLowerCase() === 'lost';
    })[0];

    const openStatus = _.filter(statusMap, (status) => {

        return status.Value.toLowerCase() === 'open';
    })[0];

    let projSelMgr = null;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                ProjectSelectionManager
            ]
        });

        projSelMgr = TestBed.get(ProjectSelectionManager);
    }));

    /******************************************************************************************************************
     * Test Scenarios
     ******************************************************************************************************************/
    it('init() : should trigger processProjects', async(() => {

        expect(projSelMgr).toBeDefined();

        projSelMgr.filteredProjects$
            .subscribe((filteredProjects) => {

                console.log('Subscription');
                expect(filteredProjects.length).toBe(999);
            });

        const spy = spyOn(projSelMgr, 'processProjects');
        projSelMgr.init(projects, sortColumn[0]);
        expect(projSelMgr.processProjects).toHaveBeenCalled();
        expect(spy.calls.count()).toBe(1, 'processProjects Called Once');
    }));

    it('init() : should default to 3 Open Projects', async(() => {

        projSelMgr.filteredProjects$
            .subscribe((filteredProjects: Project[]) => {

                expect(filteredProjects.length).toBe(3);
            });

        projSelMgr.init(projects, sortColumn);
    }));

    it('setStatusFilter() : should have 1 Won Project & 3 Open Projects', async(() => {

        projSelMgr.filteredProjects$
            .skip(1) // Skip init update
            .subscribe((filteredProjects: Project[]) => {

                expect(filteredProjects.length).toBe(4);

                const wonProj = _.filter(filteredProjects, (filtProj) => {

                    return filtProj.Status === wonStatus.Key;
                });

                expect(wonProj).toBeDefined();
                expect(wonProj.length).toBe(1);
            });

        projSelMgr.init(projects, sortColumn);
        projSelMgr.setStatusFilter(wonStatus);
    }));

    it('setStatusFilter() : should have 1 lost Project', async(() => {

        projSelMgr.filteredProjects$
            .skip(3) // Skip other observables
            .subscribe((filteredProjects: Project[]) => {

                expect(filteredProjects.length).toBe(1);
            });

        projSelMgr.init(projects, sortColumn);
        projSelMgr.setStatusFilter(wonStatus);
        projSelMgr.setStatusFilter(lostStatus);
        projSelMgr.setStatusFilter(openStatus);
    }));

    it('setSortColumn() : should be ordered by Project Name descending', async(() => {

        projSelMgr.filteredProjects$
            .skip(3) // Skip other observables
            .subscribe((filteredProjects: Project[]) => {

                console.log(filteredProjects);
                expect(filteredProjects.length).toBe(3);
                expect(filteredProjects[0].Name.toLowerCase()).toBe('project ab');
                expect(filteredProjects[1].Name.toLowerCase()).toBe('project aa');
                expect(filteredProjects[2].Name.toLowerCase()).toBe('project a');
            });

        projSelMgr.init(projects, sortColumn);
        projSelMgr.setStatusFilter(openStatus);
        projSelMgr.setStatusFilter(lostStatus);
        projSelMgr.setSortColumn(sortName);
    }));

    it('setSortColumn() : should be ordered by Project Name ascending', async(() => {

        projSelMgr.filteredProjects$
            .skip(1) // Skip other observables
            .subscribe((filteredProjects: Project[]) => {

                expect(filteredProjects.length).toBe(3);
                expect(filteredProjects[0].Name.toLowerCase()).toBe('project a');
                expect(filteredProjects[1].Name.toLowerCase()).toBe('project aa');
                expect(filteredProjects[2].Name.toLowerCase()).toBe('project ab');
            });

        projSelMgr.init(projects, sortColumn);
        sortName.IsDescending = false;
        projSelMgr.setSortColumn(sortName);
    }));
});
