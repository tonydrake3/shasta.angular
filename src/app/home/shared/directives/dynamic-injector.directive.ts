import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[esubInjection]',
})
export class DynamicInjectionDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
