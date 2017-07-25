import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {DynamicInjectionDirective} from '../directives/dynamic-injector.directive';
import {NotificationComponent} from '../../notifications/notifications.component';
import {PopoverService} from '../services/popover.service';

@Component({
    selector: 'esub-popover',
    template: `
        <div class="popover arrow-top-right" [ngClass]="{ 'no-display' : !open }" esubClickClose><div esubInjector></div></div>
    `
})
export class PopoverComponent implements OnInit {

    @Input() component: any;
    @ViewChild(DynamicInjectionDirective) esubInjector: DynamicInjectionDirective;

    // Private
    private open = false;

    constructor (private _componentFactoryResolver: ComponentFactoryResolver, private _popoverService: PopoverService) {}

    ngOnInit () {

        this._popoverService.isOpen$

            .subscribe(

                (open) => {

                    console.log(open);
                    this.open = open;
                    this.loadComponent();
                }
            );
    }

    loadComponent() {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.component);

        const viewContainerRef = this.esubInjector.viewContainerRef;

        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
    }
}
