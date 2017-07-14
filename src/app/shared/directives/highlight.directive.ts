import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({ selector: '[esubTextHighlight]' })
export class TextHighlightDirective implements OnInit {

    // Input members
    @Input() esubTextHighlight: string;
    @Input() filterText: string;

    // Private members
    private _el: ElementRef;
    private  _renderer: Renderer2;

    constructor (private el: ElementRef, private renderer: Renderer2) {

        this._el = el;
        this._renderer = renderer;
        // console.log('NativeElement', this._element.nativeElement);
    }

    /******************************************************************************************************************
     * Lifecycle Methods
     ******************************************************************************************************************/

    ngOnInit () {

        this.addText();
    }

    /******************************************************************************************************************
     * Private Methods
     ******************************************************************************************************************/

    private addText () {

        const index = this.esubTextHighlight.toLowerCase().indexOf(this.filterText.toLowerCase());

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
