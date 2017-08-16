import {
    AfterViewInit, Directive, ElementRef, Renderer2, Input, OnChanges, ViewChildren,
    ViewChild
} from '@angular/core';
import {SelectListRewriteOptions} from '../../../models/configuration/SelectListRewriteOptions';
import * as _ from 'lodash';
import {MdSelect} from '@angular/material';

@Directive({ selector: '[esubSelectListRewrite]' })
export class SelectListRewriteDirective implements OnChanges, AfterViewInit {

    // Input members
    @Input() esubSelectListRewrite: Array<any>;
    @Input() options: SelectListRewriteOptions;

    // Private members
    private _element: HTMLElement;
    private _renderer: Renderer2;
    private _targetElement: any;
    private _targetClass: string;

    constructor (private elementRef: ElementRef, private renderer: Renderer2) {

        this._element = this.elementRef.nativeElement;
        this._renderer = renderer;
    }

    ngAfterViewInit () {

    }

    ngOnChanges(changes: any) {

        console.log(this._element);
        // if (changes.esubSelectListRewrite && changes.esubSelectListRewrite.currentValue) {
        //
        //     const currentValue = changes.esubSelectListRewrite.currentValue;
        //     const count = currentValue.length;
        //
        //     this._targetElement = this._element.getElementsByClassName(this.options.target);
        //
        //     if (count > 1) {
        //
        //         if (this._targetElement[0]) {
        //
        //             this._renderer.setProperty(this._targetElement[0], 'innerHTML', count + ' ' +
        //                 this.options.labelText + ' selected');
        //         } else {
        //
        //             console.log('SelectListRewriteDirective this._targetElement', this._targetElement);
        //             setTimeout(() => {
        //                 const target = this._element.getElementsByClassName(this.options.target);
        //                 console.log('SelectListRewriteDirective postTimeout', target);
        //                 // this._renderer.setProperty(this._targetElement[0], 'innerHTML', count + ' ' +
        //                 //     this.options.labelText + ' selected');
        //             }, 10);
        //         }
        //     } else {
        //
        //         if (this._targetElement[0]) {
        //
        //             this._renderer.setProperty(this._targetElement[0], 'innerHTML',
        //                 currentValue[0] ? currentValue[0][this.options.fieldName] : '');
        //         }
        //     }
        // }
    }

    getChildClass () {

        _.forEach(this._element.classList, (className, arrayIndex) => {
            const index = className.indexOf('ng-tns-');
            if (index !== -1) {
                this._targetClass = this._element.classList[arrayIndex];
            }
        });
    }
}
