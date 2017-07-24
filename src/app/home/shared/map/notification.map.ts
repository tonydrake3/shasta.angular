export class NotificationMap {

    Key: string;
    Value: string;
    Icon: string;
    Action: string;
}

// <img src="img/comments.svg" class="comments">
export const notificationMap: NotificationMap[] = [
    {
        Key: '0',
        Value: 'Unknown',    // Notification Type Unknown
        Icon: 'comments.svg',
        Action: ''
    },
    {
        Key: '1',
        Value: 'PunchWarning',
        Icon: 'watch.svg',
        Action: ''
    },
    {
        Key: '2',
        Value: 'NewComment',
        Icon: 'comments.svg',
        Action: ''
    },
    {
        Key: '3',
        Value: 'SignTimesheet',
        Icon: 'timesheets.svg',
        Action: ''
    },
    {
        Key: '4',
        Value: 'RejectedTimesheet',
        Icon: 'timesheets.svg',
        Action: ''
    },
]
