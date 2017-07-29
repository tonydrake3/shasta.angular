import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {DynamicInjectionDirective} from '../directives/dynamic-injector.directive';
import {NotificationComponent} from '../../notifications/notifications.component';
import {PopoverService} from '../services/popover.service';

@Component({
    selector: 'esub-popover',
    template: `
        <div class="popover arrow-top-right" [ngClass]="{ 'no-display' : !open }"
             [ngStyle]="{ 'height': contentHeight + 'px', 'width': contentWidth + 'px'}">
            <div esubInjector></div>
        </div>
    `
})
export class PopoverComponent implements OnInit {

    // @Input() component: any;
    @ViewChild(DynamicInjectionDirective) esubInjector: DynamicInjectionDirective;

    // Public
    public contentWidth: number;
    public contentHeight: number;

    // Private
    private open = false;
    private _component: any;

    constructor (private _componentFactoryResolver: ComponentFactoryResolver, private _popoverService: PopoverService) {}

    ngOnInit () {

        this._popoverService.isOpen$

            .subscribe(

                (open) => {

                    this.open = open;
                    if (open) {

                        const settings = this._popoverService.settings$;
                        this.getComponentObject(settings.componentName);
                        this.contentWidth = settings.width ? settings.width : 300;
                        this.contentHeight = settings.height ? settings.height : 250;
                        this.loadComponent();
                    }
                }
            );
    }

    loadComponent() {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this._component);

        const viewContainerRef = this.esubInjector.viewContainerRef;

        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
    }

    private getComponentObject (componentName: string): any {

        switch (componentName.toLowerCase()) {

            case 'notifications':
                this._component = NotificationComponent;
                break;
        }
    }
}
