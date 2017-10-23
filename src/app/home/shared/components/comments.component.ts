import { Timecard } from './../../time-expenses/timesheet-card/timecard.model';
import { Comment } from './../../../models/domain/Comment';

import { Component, Input, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import * as _ from 'lodash';
import * as moment from 'moment';
import { CommentsService } from 'app/home/shared/services/comments.service';

@Component({
  selector: 'esub-comments',
  templateUrl: '../views/comments.html',
  styles: [`
  .youComments {
    background-color:#556B2F; border-color: #556B2F;color: white;
  }
  .myComments {
    background-color:#008080; border-color: #008080; color: white;
  }
`]
})
export class CommentsComponent {
  public newComment: string;
  public comments: any[];
  private TimeRecordId: string;
  public loading = false;
  public currentUserId: string;

  constructor(
    public dialogRef: MdDialogRef<CommentsComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private _commentservice: CommentsService
  ) {
    if (data) {
      this.buildTimerecordComments(data.timerecord, data.currentUserId);
    }
  }

  private buildTimerecordComments(timerecord: any, currentUserId: string) {
   this.comments  = timerecord.Comments;
    this.TimeRecordId = timerecord.Id;
    this.currentUserId = currentUserId;
  }

  private buildTimeCardComments(timecard: any): void {
    this.comments = []; // new  Observable<Comment[]>();
    const sections = timecard.sections;
    _.forEach(sections, section => {
      const costCodes = section['Unknown'];

      _.forEach(costCodes, costcode => {
        _.forEach(costcode['days'], day => {
          if (day['comments'] && day['comments'].length > 0) {
            if (day['comments']) {
              _.forEach(day['comments'], comment => {
                this.comments = _.concat(this.comments, comment);
              });
            }
          }
        });
      });
    });

    console.log('COMMENT DATA', this.comments);
  }

  public getCss(userId: string): boolean {
      if ( !userId) {
          return true;
      }
      if ( userId === this.currentUserId) {
          return true;
      }
      return false;
  }

  public addComment(newComment) {
    if (newComment && newComment.value.trim() !== '') {
      const timestamps = {
        Updated: moment().toISOString()
      };

      const comment = {
        Value: newComment.value,
        CommentType: 'Normal',
        Timestamps: timestamps
      };

      let comments: any[] = [];

      comments = _.concat(comments, comment);

      const enity = {
        id: this.TimeRecordId,
        Comments: comments
      };

      this.loading = true;
      newComment.value = '';
      this._commentservice.addComments(enity).subscribe(resp => {
        const result = resp;
        if (result === 200) {

          this.comments = _.concat(this.comments, comment);

          console.log('NEWCOMMENT', this.comments);
          this.getCss(this.currentUserId);
          this.loading = false;
        }
      });
    }
  }
}
