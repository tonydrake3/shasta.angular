import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {DataSyncService} from '../services/utilities/data-sync.service';

@Directive({ selector: '[esubTextHighlight]' })
export class TextHighlightDirective implements OnInit {

    @Input() esubTextHighlight: string;
    @Input() filterText: string;

    private _el: ElementRef;
    private  _renderer: Renderer2;

    constructor (private el: ElementRef, private renderer: Renderer2, private _syncService: DataSyncService) {

        this._el = el;
        this._renderer = renderer;
        // console.log('NativeElement', this._element.nativeElement);
    }

    ngOnInit () {

        this.addText();
    }

    addText () {

        const index = this.esubTextHighlight.toLowerCase().indexOf(this.filterText);

        if (this.filterText.length > 0 && index > -1) {

            let content = this.esubTextHighlight.substring(0, index);
            content += '<span class=\"highlight\">' +
                this.esubTextHighlight.substring(index, index + this.filterText.length) + '</span>';
            content += this.esubTextHighlight.substring(index + this.filterText.length);
            this._renderer.setProperty(this._el.nativeElement, 'innerHTML', content);

        } else {

            this._renderer.setProperty(this._el.nativeElement, 'innerHTML', this.esubTextHighlight);
        }
    }
}
