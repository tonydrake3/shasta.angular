import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import echarts from 'echarts';
import 'echarts/theme/macarons';

@Directive({ selector: '[myECharts]' })

export class EChartsDirective {
    el: ElementRef;
    constructor(el: ElementRef) {
        this.el = el;
    }

    @Input() EChartsOptions: any;
    private myChart;


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
        if(this.myChart) {
            this.myChart.resize();
        }
    }
}
