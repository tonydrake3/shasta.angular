import { TestBed, inject } from '@angular/core/testing';
import {EnterTimeFilterService} from './enter-time-filter.service';
import {Project} from '../../../models/domain/Project';
import {Observable} from 'rxjs/Observable';

describe('EntityDisplayFormatterService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EnterTimeFilterService]
        });
    });

    it('should be created', inject([EnterTimeFilterService], (service: EnterTimeFilterService) => {
        expect(service).toBeTruthy();
    }));

    let projects: Project[];

    beforeEach(() => {

        const project1 = new Project();
        project1.Name = 'Project1';
        project1.Number = '123';

        const project2 = new Project();
        project2.Name = 'Project2';
        project2.Number = '456';

        projects = [project1, project2];
    });

    describe('filterByKeyValuePair', () => {

        it('collection should be empty when the keys are not there',
            inject([EnterTimeFilterService],
                (service: EnterTimeFilterService
                ) => {

                    const expected: Project[] = [];
                    expect(service.filterByKeyValuePair(projects, { 'Nothing': 'nothing'})).toEqual(expected);

                }));

        it('collection should be empty when no matching info is passed in',
            inject([EnterTimeFilterService],
                (service: EnterTimeFilterService
                ) => {

                    const expected: Project[] = [];
                    expect(service.filterByKeyValuePair(projects, {'Name': 'apples'})).toEqual(expected);

                }));

        it('collection should match when name is included when no matching info is passed in',
            inject([EnterTimeFilterService],
                (service: EnterTimeFilterService
                ) => {

                    const expected: Project[] = projects;
                    expect(service.filterByKeyValuePair(projects, {'Name': 'Project'})).toEqual(expected);

                }));

        it('collection should match case does not match',
            inject([EnterTimeFilterService],
                (service: EnterTimeFilterService
                ) => {

                    const expected: Project[] = projects;
                    expect(service.filterByKeyValuePair(projects, {'Name': 'project'})).toEqual(expected);

                }));

        it('collection should match one when number matches only',
            inject([EnterTimeFilterService],
                (service: EnterTimeFilterService
                ) => {

                    const expected: Project[] = [projects[0]];
                    expect(service.filterByKeyValuePair(projects, {'Number': '12'})).toEqual(expected);

                }));

    });

    describe('filterCollectionByKey', () => {

        it('collection should be empty when no matching info is passed in',
            inject([EnterTimeFilterService],
                (service: EnterTimeFilterService
                ) => {

                    const expected: Project[] = [];
                    expect(service.filterCollectionByKey(projects, 'apples')).toEqual(expected);

                }));

        it('collection should match when name is included when no matching info is passed in',
            inject([EnterTimeFilterService],
                (service: EnterTimeFilterService
                ) => {

                    const expected: Project[] = projects;
                    expect(service.filterCollectionByKey(projects, 'Project')).toEqual(expected);

                }));

        it('collection should match one when number matches only',
            inject([EnterTimeFilterService],
                (service: EnterTimeFilterService
                ) => {

                    const expected: Project[] = [projects[0]];
                    expect(service.filterCollectionByKey(projects, '12')).toEqual(expected);

                }));

        it('collection should match one when number - name is sent',
            inject([EnterTimeFilterService],
                (service: EnterTimeFilterService
                ) => {
                    const projectArray: Project[] = [projects[0]];
                    const expected: Observable<Project[]> = Observable.of(projectArray);
                    expect(service.filterCollection('123 - P', projects)).toEqual(expected);

                }));

    });
});
