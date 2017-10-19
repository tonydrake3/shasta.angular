import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[esubInjector]',
})
export class DynamicInjectionDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
