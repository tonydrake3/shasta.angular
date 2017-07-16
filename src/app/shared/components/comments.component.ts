
import { Component, Input, Inject } from '@angular/core';

import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'esub-comments',
    template: `
    <div class="esub-comments">
      <p class="text-center title-bold">Comments</p>
      <div *ngFor="let comment of data" class="comment-block">
        <p class="paragraph-regular">{{comment.Value}}</p>
        <div class="signature row">
          <img src="assets/images/g1.jpg" class="rounded-circle img30_30">
          <div>
            <span class="label-disabled">Comment by: FAKE NAME</span>
            <span class="accent-disabled">12:00 AM - 12/26/12</span>
          </div>
        </div>
      </div>
      <md-dialog-actions>
        <md-input-container floatPlaceholder="never">
          <input mdInput placeholder="Add Comments" [(ngModel)]="newComment">
        </md-input-container>
        <button md-button (click)="addComment()">Post</button>
      </md-dialog-actions>
    </div>
    `
})
export class CommentsComponent {
  public newComment: string;

  constructor(public dialogRef: MdDialogRef<CommentsComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
    console.log('COMMENT DATA', data)
  }

  addComment() {
    console.log('NEWCOMMENT', this.newComment)
  }
}
