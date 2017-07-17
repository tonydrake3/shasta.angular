
export class StatusMap {

    Key: string;
    Value: string;
    CanDisplay: boolean;
    IsSelected: boolean;
    IsFiltered: boolean;
}

export const statusMap: StatusMap[] = [
    {
        Key: '0',
        Value: 'NotSet',    // Project status not set
        CanDisplay: false,
        IsSelected: false,
        IsFiltered: false
    },
    {
        Key: '1',
        Value: 'Open',      // Project is open
        CanDisplay: true,
        IsSelected: true,
        IsFiltered: true
    },
    {
        Key: '2',
        Value: 'Complete',  // Project is complete
        CanDisplay: true,
        IsSelected: false,
        IsFiltered: false
    },
    {
        Key: '3',
        Value: 'Bid',       // This is a bid on a project
        CanDisplay: true,
        IsSelected: false,
        IsFiltered: false
    },
    {
        Key: '4',
        Value: 'Won',       // This is a won bid on a project
        CanDisplay: true,
        IsSelected: false,
        IsFiltered: false
    },
    {
        Key: '5',
        Value: 'Lost',      // This is a lost bid on a project
        CanDisplay: true,
        IsSelected: false,
        IsFiltered: false
    }
];
