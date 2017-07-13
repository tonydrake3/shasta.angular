// import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { MaterialModule, MdNativeDateModule } from '@angular/material';
// import { FormsModule } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
//
// import { TimeExpensesComponent } from './time-expenses.component';
// import { TimesheetCardComponent } from './timesheet-card/timesheet-card.component';
// import { WeekSelectorComponent } from '../../shared/components/week-selector.component';
// import { BaseCardComponent } from '../../shared/components/base.card.component';
// import { BadgedHourComponent } from './timesheet-card/badged-hour.component';
//
// import { TimeRecordsService } from './time-records.service';
// import { MockTimeRecordsService } from '../../shared/mocks/mock.time-records.service';
// import { UserService } from '../../shared/services/user/user.service';
// import { MockUserService } from '../../shared/mocks/mock.user.service';
//
// import { KeysPipe } from '../../shared/pipes/keys.pipe';
//
// import * as moment from 'moment';
// import 'hammerjs';
//
// fdescribe('TimeExpenses Component', () => {
//
//   let comp:    TimeExpensesComponent;
//   let fixture: ComponentFixture<TimeExpensesComponent>;
//   let de:      DebugElement;
//   let el:      HTMLElement;
//
//   let mockTimeRecordsService;
//   let mockUserService;
//
//   beforeEach(() => {
//
//     mockTimeRecordsService = new MockTimeRecordsService();
//     mockUserService = new MockUserService();
//
//     TestBed.configureTestingModule({
//       imports: [
//         MaterialModule,
//         MdNativeDateModule,
//         FormsModule
//       ],
//       providers: [
//         { provide: TimeRecordsService, useValue: mockTimeRecordsService },
//         { provide: UserService, useValue: mockUserService },
//         { provide: ActivatedRoute,
//           useValue: {
//             params: Observable.of({id: 'view'})
//           }
//         }
//       ],
//       declarations: [
//         BadgedHourComponent,
//         KeysPipe,
//         BaseCardComponent,
//         WeekSelectorComponent,
//         TimesheetCardComponent,
//         TimeExpensesComponent
//       ]
//     });
//
//     // build component accessors
//     fixture = TestBed.createComponent(TimeExpensesComponent);
//
//     comp = fixture.componentInstance; // Component test instance
//
//     de = fixture.debugElement;
//     el = de.nativeElement;
//
//     // build spys
//     spyOn(comp, 'buildTimesheets');
//
//     // builds events
//     const leftclickevent = { button: 0 };
//   });
//
//   it('should build timesheets when TimeRecordsService callback fires', () => {
//
//   });
//
//   it('should build timesheets when user changes timesheet grouping', () => {
//
//   });
//
//   it('should build timesheets when user changes timesheet date range', () => {
//
//   });
//
//   it('should build timesheets when user changes timesheet filtering', () => {
//
//   });
//
//   it('should show as loading from page init until first TimeRecordsService callback', () => {
//
//   });
//
//   it('should ignore build timesheet requests until loading is complete', () => {
//
//   });
// });
