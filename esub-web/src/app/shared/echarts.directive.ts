import { Directive, ElementRef, Input, HostListener, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
import echarts from 'echarts';
import 'echarts/theme/macarons';

@Directive({ selector: '[esubECharts]' })

export class EChartsDirective implements AfterViewInit, OnChanges, OnDestroy {
    el: ElementRef;
    @Input() EChartsOptions: any;
    private myChart;

    constructor(el: ElementRef) {
        this.el = el;
    }

    ngAfterViewInit() {
        this.myChart = echarts.init(this.el.nativeElement, 'macarons');
        if (!this.EChartsOptions) return;

        this.myChart.setOption(this.EChartsOptions);
    }

    ngOnChanges() {}

    ngOnDestroy() {
        if (this.myChart) {
            this.myChart.dispose();
        }
    }

    @HostListener('window:resize')
    onResize() {
        if (this.myChart) {
            this.myChart.resize();
        }
    }
}
