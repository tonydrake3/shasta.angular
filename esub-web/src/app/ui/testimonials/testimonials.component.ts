import { Component } from '@angular/core';
import { UIService } from '../ui.service'

@Component({
    selector: 'my-ui-testimonials',
    styles: [],
    templateUrl: './testimonials.component.html',
})

export class UITestimonialsComponent {
    testimonials;

    constructor(private uiService: UIService) {}

    getTestimonials(): void {
        this.testimonials = this.uiService.getTestimonials();
    }

    ngOnInit(): void {
        this.getTestimonials();
    }
}
