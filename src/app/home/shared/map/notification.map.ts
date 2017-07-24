export class NotificationMap {

    Key: string;
    Value: string;
    Icon: string;
    Action: string;
    ActionDescription: string;
}

// <img src="img/comments.svg" class="comments">
export const notificationMap: NotificationMap[] = [
    {
        Key: '0',
        Value: 'Unknown',    // Notification Type Unknown
        Icon: 'comments.svg',
        Action: '',
        ActionDescription: ''
    },
    {
        Key: '1',
        Value: 'PunchWarning',
        Icon: 'watch.svg',
        Action: '',
        ActionDescription: 'Tap here to Punch Out'
    },
    {
        Key: '2',
        Value: 'NewComment',
        Icon: 'comments.svg',
        Action: '',
        ActionDescription: 'Tap here to view the thread.'
    },
    {
        Key: '3',
        Value: 'SignTimesheet',
        Icon: 'timesheets.svg',
        Action: '',
        ActionDescription: 'Tap here to view the timesheet.'
    },
    {
        Key: '4',
        Value: 'RejectedTimesheet',
        Icon: 'timesheets.svg',
        Action: '',
        ActionDescription: 'Tap here to view the timesheet.'
    },
]
