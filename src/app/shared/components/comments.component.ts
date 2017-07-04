
import { Component, Input, Inject } from '@angular/core';

import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'esub-comments',
    template: `
    <div class="esub-comments">
      <p *ngFor="let comment of data">{{comment.Value}}</p>
    </div>
    `
})
export class CommentsComponent {

  constructor(public dialogRef: MdDialogRef<CommentsComponent>, @Inject(MD_DIALOG_DATA) public data: any) { }
}
