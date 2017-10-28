import {CommentType} from './CommentType';
import {Timestamps} from './Timestamps';
import {User} from './User';

export class Comment {

    Id?: number;
    Value?: string;
    CommentType?: CommentType;
    UserId?: number;
    Timestamps: Timestamps;
    User: User;

    constructor (value: string, type?: CommentType) {

        this.Value = value;

        if (type) {

            this.CommentType = type;
        }
    }
}
