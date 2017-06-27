import {TestBed, inject, async} from '@angular/core/testing';

import {ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend} from '@angular/http/testing'

import {ProjectService} from './project.service';

import 'hammerjs';
import {mockProjects} from '../../shared/mocks/data/mockProject.data';

describe('Project Service', () => {

    let _projectService: ProjectService;
    let _mockBackend: MockBackend;

    beforeEach((done) => {

        TestBed.configureTestingModule({
            providers: [
                ProjectService,
                { provide: XHRBackend, useValue: MockBackend }
            ]
        })
            .compileComponents().then(() => {
            done();
        });

    });

    beforeEach(async(inject([ProjectService, XHRBackend], (projectService: ProjectService, mockBackend: MockBackend) => {
        _projectService = projectService;
        _mockBackend = mockBackend;

        _mockBackend.connections.subscribe((connection) => {

            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(mockProjects)
            })));
        });
    })));

    describe('getLatest', () => {

        it('should return resolved Promise of Observable Array of Projects', () => {

            this._projectService.getLatest()
                .then((projects) => {
                    expect(projects.length).toBe(2);
                    expect(projects[0]['Name'].toEqual('Project A'));
                    expect(projects[1]['Name'].toEqual('Project B'));
                });
        });


    });

});

