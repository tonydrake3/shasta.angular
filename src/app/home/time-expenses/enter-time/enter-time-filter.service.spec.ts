import { TestBed, inject } from '@angular/core/testing';
import {EnterTimeFilterService} from './enter-time-filter.service';
import {Project} from '../../../models/domain/Project';
import {TestScheduler} from 'rxjs/Rx';
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

                    const expected: Observable<Project[]> = Observable.of([]);
                    expect(service.filterByKeyValuePair(projects, { 'Nothing': ''})).toEqual(expected);

                }));

        it('collection should be empty when no matching info is passed in',
            inject([EnterTimeFilterService],
                (service: EnterTimeFilterService
                ) => {

                    const expected: Observable<Project[]> = Observable.of([]);
                    expect(service.filterByKeyValuePair(projects, {'Name': 'apples'})).toEqual(expected);

                }));

        it('collection should match when name is included when no matching info is passed in',
            inject([EnterTimeFilterService],
                (service: EnterTimeFilterService
                ) => {

                    const expected: Observable<Project[]> = Observable.of(projects);
                    expect(service.filterByKeyValuePair(projects, {'Name': 'Project'})).toEqual(expected);

                }));

        it('collection should match one when number matches only',
            inject([EnterTimeFilterService],
                (service: EnterTimeFilterService
                ) => {

                    const expected: Observable<Project[]> = Observable.of([projects[0]]);
                    expect(service.filterByKeyValuePair(projects, {'Number': '12'})).toEqual(expected);

                }));

    })

    describe('filterCollection', () => {

        it('collection should be empty when no matching info is passed in',
            inject([EnterTimeFilterService],
                (service: EnterTimeFilterService
                ) => {

                    const expected: Observable<Project[]> = Observable.of([]);
                    expect(service.filterCollection(projects, 'apples')).toEqual(expected);

                }));

        it('collection should match when name is included when no matching info is passed in',
            inject([EnterTimeFilterService],
                (service: EnterTimeFilterService
                ) => {

                    const expected: Observable<Project[]> = Observable.of(projects);
                    expect(service.filterCollection(projects, 'Project')).toEqual(expected);

                }));

        it('collection should match one when number matches only',
            inject([EnterTimeFilterService],
                (service: EnterTimeFilterService
                ) => {

                    const expected: Observable<Project[]> = Observable.of([projects[0]]);
                    expect(service.filterCollection(projects, '12')).toEqual(expected);

                }));

    });
});
