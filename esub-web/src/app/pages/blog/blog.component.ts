import { Component } from '@angular/core';
import { PagesService } from '../pages.service'

@Component({
    selector: 'my-page-blog',
    styles: [],
    templateUrl: './blog.component.html',
    providers: [PagesService]
})

export class PageBlogComponent {
    posts;

    constructor(private pagesService: PagesService) {}

    getPosts(): void {
        this.posts = this.pagesService.getPosts();
    }

    ngOnInit(): void {
        this.getPosts();
    }
}
