import {Component, ComponentFactoryResolver, Input, OnChanges, ViewChild} from '@angular/core';
import {DynamicInjectionDirective} from '../directives/dynamic-injector.directive';
import {NotificationComponent} from '../../notifications/notifications.component';

@Component({
    selector: 'esub-popover',
    template: `
        <div class="popover arrow-top-right" [ngClass]="{ 'no-display' : !open }"><div esubInjector></div></div>
    `
})
export class PopoverComponent implements OnChanges {

    @Input() open: boolean;
    @Input() component: any;

    @ViewChild(DynamicInjectionDirective) esubInjector: DynamicInjectionDirective;

    constructor (private _componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnChanges (changes) {

        if (changes.open.currentValue) {
            this.loadComponent();
        }
    }

    loadComponent() {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.component);

        const viewContainerRef = this.esubInjector.viewContainerRef;

        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
    }
}
