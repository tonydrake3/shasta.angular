import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';

import {EnterTimeManager} from '../enter-time.manager';
import {Employee} from '../../../../models/domain/Employee';
import {Project} from '../../../../models/domain/Project';
import {CostCode} from '../../../../models/domain/CostCode';
import {EntryCard, EntryGridLine} from '../models/TimeEntry';

@Component({
    selector: 'esub-enter-time-grid',
    templateUrl: './enter-time-grid.component.html'
})
export class EnterTimeGridComponent implements OnInit {

    @Output() displayGrid: EventEmitter<boolean> = new EventEmitter<boolean>();

    public dateFormat: string;
    public groupCardsBy: string;
    public groupedLines: Array<EntryCard>;
    public employees: Array<Employee>;
    public projects: Array<Project>;
    public indirectCosts: Array<CostCode>;
    public loading: boolean;


    constructor (private _enterTimeManager: EnterTimeManager, private _changeRef: ChangeDetectorRef) {

        this.dateFormat = 'MMM. Do, YYYY';
        this.groupCardsBy = 'Date';
        this.loading = true;
    }

    ngOnInit () {

        this.employees = this._enterTimeManager.getEmployees();
        this.projects = this._enterTimeManager.getProjects();
        this.indirectCosts = this._enterTimeManager.getIndirectCodes();
        this.groupCardsBy = this._enterTimeManager.getGroupBy();

        this.groupedLines = [];

        this._enterTimeManager.cards$
            .map(c => c as EntryCard)
            .subscribe(
                (card) => {

                    console.log('EnterTimeGridComponent card', card);
                    this.groupedLines.push(card);
                    // this.buildCards(lines);
                    // this.groupedLines = line;
                });

        // this._enterTimeManager.gridLines$
        //     .map(gl => gl as EntryGridLine)
        //     .subscribe(
        //         (line) => {
        //
        //             console.log('EnterTimeGridComponent gridlines', line);
        //
        //             if (this.groupedLines.length > 0) {
        //
        //                 const card = _.filter(this.groupedLines, (group) => {
        //
        //                     return group.Key === line.Key;
        //                 });
        //
        //                 card[0].ProjectLines.push(line.ProjectLine);
        //             }
        //
        //             // this.groupedLines.push(line);
        //             // this.buildCards(lines);
        //             // this.groupedLines = line;
        //         });

        this._enterTimeManager.processing$
            .subscribe(
                (processing) => {
                    console.log('PROCESSING', processing);
                    this.loading = processing;
            });

        setTimeout(() => {

            this._enterTimeManager.getGroupedLines();
        }, 20);
    }

    public addMoreLines () {

        this.displayGrid.emit(false);
    }

    public deleteCard () {


    }

    public deleteAllLines() {

        this._enterTimeManager.clearLines();
        this.displayGrid.emit(false);
    }

    public updateGrouping (groupBy: string) {

        this.groupCardsBy = groupBy;
        this.groupedLines = [];
        this._enterTimeManager.setGroupBy(groupBy);
    }

    public getFilteredEmployees (projectId: string) {

        // console.log('EnterTimeGridComponent getFilteredEmployees', projectId);
        return this._enterTimeManager.filterEmployees(projectId);
    }

    private buildCards (lines) {

        console.log('EnterTimeGridComponent buildCards enter');
        for (let i = 0; i < lines.length; i++) {
            console.log('EnterTimeGridComponent buildCards', this.groupedLines);
            setTimeout(() => {
                this.groupedLines.push(lines[i]);
                console.log('EnterTimeGridComponent buildCards', this.groupedLines);
            }, 200 * i);
        }
    }
}
