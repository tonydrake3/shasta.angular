import { Injectable } from '@angular/core';
import {
    projectSidebarConfiguration, settingSidebarConfiguration, sidebarConfiguration,
    timeSidebarConfiguration
} from '../../../models/configuration/menuConfiguration';

@Injectable()
export class LookupDataService {

    constructor () {}

    getLeftSidebar (): Promise<any> {
        return new Promise((resolve) => {

            resolve(sidebarConfiguration);
        });
    }

    getProjectsMenu (): Promise<any> {
        return new Promise((resolve) => {

            resolve(projectSidebarConfiguration);
        });
    }

    getSettingsMenu (): Promise<any> {
        return new Promise((resolve) => {

            resolve(settingSidebarConfiguration);
        });
    }

    getTimesheetMenu (): Promise<any> {
        return new Promise((resolve) => {

            resolve(timeSidebarConfiguration);
        });
    }
}
