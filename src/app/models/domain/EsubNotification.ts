import {BaseClass} from '../BaseClass';

export class EsubNotification extends BaseClass {

    ActionText?: string;
    Body: string;
    EntityId: string;
    Icon: string;
    Id: string;
    IsRead: boolean;
    NotificationType: string;
    Payload: string;
    RecipientUserId: string;
    Title: string;

    constructor(json) {

        super();
        this.fromObject(json);
        this.setAttributes();
    }

    private setAttributes () {

        // console.log('setIcon', this.NotificationType);
        switch (this.NotificationType) {

            case 'Comment':
                this.Icon = 'comments.svg';
                this.ActionText = 'Tap here to view the comment.';
                break;
            case 'Rejection':
                this.Icon = 'timesheets.svg';
                this.ActionText = 'Tap here to view the time record.';
                break;
            case 'Approval':
                this.Icon = 'timesheets.svg';
                this.ActionText = 'Tap here to view the time record.';
                break;
        }
        // console.log('setIcon', this.Icon);
    }
}
