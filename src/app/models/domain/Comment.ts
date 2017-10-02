import {CommentType} from './CommentType';

export class Comment {

    Id?: number;
    Value?: string;
    CommentType?: CommentType;
    UserId?: number;
    Created?: string;
    Updated?: string;

    constructor (value: string, type?: CommentType) {

        this.Value = value;

        if (type) {

            this.CommentType = type;
        }
    }
}
