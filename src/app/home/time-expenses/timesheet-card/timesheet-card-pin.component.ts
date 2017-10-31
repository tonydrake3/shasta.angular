import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { selector } from 'rxjs/operator/publish';
import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import {ReloadType} from '../../../models/ReloadType';
import {MessageService} from './message.service';

@Component({
  selector: 'esub-timesheet-card-pin',
  templateUrl: './timesheet-card-pin.component.html'
})
export class TimesheetCardPinComponent implements OnInit, OnDestroy {
  public pinFormGroup: FormGroup;
  public correctPin: string;
  private type: string;

  constructor(
    private _messageService: MessageService<ReloadType>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MdDialogRef<TimesheetCardPinComponent>
  ) {
    this.correctPin = data.correctPin;
    this.type = data.type;

    // localStorage.setItem('PIN_KEY$', null);
    // localStorage.setItem('PIN_KEY$', this.userPin);
  }

  ngOnInit() {
    this.pinFormGroup = this.fb.group({});
    this.pinFormGroup = this.fb.group({
      pinEntered: [
        '',
        Validators.compose([
          Validators.required,
          this.customValidate.bind(this.correctPin),
          this.customValidate
        ])
      ]
    });
  }

  ngOnDestroy() {}

  public customValidate(input: FormControl) {
    // const pin = localStorage.getItem('PIN_KEY$');
    if (this) {
      const pin = this;
      if (pin && pin === input.value.trim()) {
        return null;
      }
      return { notPin: true };
    }
  }

  public onSubmit({ data, valid }: { data: any; valid: boolean }) {
    if (!valid) return;

    // if (this.type === 'onHourlyValues') {
    //   this.dialogRef.close({ pin: this.correctPin });
    // } else {
      this.dialogRef.close({ pin: this.correctPin });
   //   this._messageService.messageSource$.next('pinEntered');
    // }
  }

  public Close(event) {
    event.preventDefault();
    this.dialogRef.close();
  }
}
