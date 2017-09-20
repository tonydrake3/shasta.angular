import {
    Directive, ElementRef, OnInit, HostListener, Output, EventEmitter
} from '@angular/core';
import * as moment from 'moment';
import {TimeFormatPipe} from '../pipes/time-format.pipe';

@Directive({ selector: '[esubTimeInput]' })

export class TimeInputDirective implements OnInit {

    @Output() timeChange: EventEmitter<string>;
    @Output() timePeriodChange: EventEmitter<string>;
    el: ElementRef;

    private _originalValue: string;
    private _period: string;

    @HostListener('focus', ['$event.target.value'])
    onFocus(value) {

        this.el.nativeElement.setSelectionRange(0, value.length);
        this._originalValue = value;
    }

    @HostListener('blur', ['$event.target.value'])
    onBlur(value) {

        if (this._originalValue !== value) {
            const transformedTime = this._timeFormatPipe.transform(value);
            const today = moment(transformedTime, ['HH:mm']);
            this.timeChange.emit(today.format('h:mm'));
            this.timePeriodChange.emit(today.format('A').toString());
        }
    }

    @HostListener('keydown', ['$event'])
    onKeydown(event) {

        if ((event.code && this.checkCode(event.code)) || (event.keyCode && this.checkKeyCode(event.keyCode))) {
            return true;
        }
        event.preventDefault();
        return false;
    }
    constructor(el: ElementRef, private _timeFormatPipe: TimeFormatPipe) {
        this.el = el;
        this.timeChange = new EventEmitter<string>();
        this.timePeriodChange = new EventEmitter<string>();
    }

    ngOnInit () {

        if (this.el.nativeElement.value && this.el.nativeElement.value !== '') {

            this.el.nativeElement.value = this._timeFormatPipe.transform(this.el.nativeElement.value);
        }

    }

    private checkCode (code) {

        switch (code) {
            case 'Digit0':
            case 'Digit1':
            case 'Digit2':
            case 'Digit3':
            case 'Digit4':
            case 'Digit5':
            case 'Digit6':
            case 'Digit7':
            case 'Digit8':
            case 'Digit9':
            case 'Backspace':
            case 'Semicolon':
            case 'Delete':
            case 'Numpad0':
            case 'Numpad1':
            case 'Numpad2':
            case 'Numpad3':
            case 'Numpad4':
            case 'Numpad5':
            case 'Numpad6':
            case 'Numpad7':
            case 'Numpad8':
            case 'Numpad9':
            case 'Tab':
            case 'ArrowLeft':
            case 'ArrowRight':
                return true;
            default:
                return false;
        }
    }

    private checkKeyCode (code) {

        switch (code) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case 8:
            case 58:
            case 46:
            case 96:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 9:
            case 37:
            case 39:
                return true;
            default:
                return false;
        }
    }
}

