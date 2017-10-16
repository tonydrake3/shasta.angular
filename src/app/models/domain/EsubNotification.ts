import {BaseClass} from '../BaseClass';

export class EsubNotification extends BaseClass {

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
        this.setIcon();
    }

    private setIcon () {

        // console.log('setIcon', this.NotificationType);
        switch (this.NotificationType) {

            case 'Comment':
                this.Icon = 'comments.svg';
                break;
            case 'Rejection':
                this.Icon = 'timesheets.svg';
                break;
            case 'Approval':
                this.Icon = 'timesheets.svg';
                break;
        }
        // console.log('setIcon', this.Icon);
    }
}
