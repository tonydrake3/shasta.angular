// import {Injectable} from '@angular/core';
// import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import {validateTimeBreakOverlap} from '../../shared/validators/time-break-overlap.validator';
// import {validateTime, validateTimeWithPeriod} from '../../shared/validators/time-entry.validator';
//
// @Injectable()
// export class EnterTimeGridBuilderService {
//
//     private _isNotHtml5Time: boolean;
//
//     constructor (private _builder: FormBuilder) {}
//
//     public init () {
//
//
//     }
//
//     public createForm (): FormGroup {
//
//         return this._builder.group({
//             cards: this._builder.array([])
//         });
//     }
//
//     public addCard(form: FormGroup) {
//
//         const cards = <FormArray>form.controls['cards'];
//         const newCard = this.createCardGroup();
//
//         cards.push(newCard);
//     }
//
//     private createCardGroup (): FormGroup {
//
//         return this._builder.group({
//             cardRows: this._builder.array([])
//         });
//     }
//
//     public addRow(form: FormGroup) {
//
//         const gridCards = <FormArray>form.controls['cardRows'];
//         const newCardRow = this.initRow();
//
//         gridCards.push(newCardRow);
//     }
//
//     private initRow() {
//
//         return this._builder.group({
//             project: ['', [Validators.required]],
//             system: '',
//             phase: '',
//             costCode: ['', [Validators.required]],
//             employee: '',
//             employees: ['', [Validators.required]],
//             dates: ['', [Validators.required]],
//             standardHours: '',
//             overtimeHours: '',
//             doubleTimeHours: '',
//             timeEntry: this._builder.group(this.buildTimeEntryFormGroup(),
//                 {validator: validateTimeBreakOverlap('in', 'out', 'in', 'out')}),
//                 notes: ''
//         });
//     }
//
//     private buildTimeEntryFormGroup () {
//
//         if (this._isNotHtml5Time) {
//
//             return {
//
//                 time: this._builder.group(this.buildTimeDetailFormGroup(),
//                     {validator: validateTimeWithPeriod('in', 'out', 'startAfterEnd')}),
//                 break: this._builder.group(this.buildTimeDetailFormGroup(),
//                     {validator: validateTimeWithPeriod('in', 'out', 'breakStartAfterEnd')})
//             };
//         }
//         return {
//
//             time: this._builder.group(this.buildTimeDetailFormGroup(),
//                 {validator: validateTime('in', 'out', 'startAfterEnd')}),
//             break: this._builder.group(this.buildTimeDetailFormGroup(),
//                 {validator: validateTime('in', 'out', 'breakStartAfterEnd')})
//         };
//     }
//
//     private buildTimeDetailFormGroup () {
//
//         if (this._isNotHtml5Time) {
//
//             return {
//
//                 inValue: '',
//                 inPeriod: '',
//                 outValue: '',
//                 outPeriod: ''
//             };
//         }
//         return {
//
//             in: '',
//             out: ''
//         };
//     }
//
// }
