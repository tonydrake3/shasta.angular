

export const statusMap = [
    {
        Key: 0,
        Value: 'NotSet',    // Project status not set
        CanDisplay: false
    },
    {
        Key: 1,
        Value: 'Open',      // Project is open
        CanDisplay: true
    },
    {
        Key: 2,
        Value: 'Complete',  // Project is complete
        CanDisplay: true
    },
    {
        Key: 3,
        Value: 'Bid',       // This is a bid on a project
        CanDisplay: true
    },
    {
        Key: 4,
        Value: 'Won',       // This is a won bid on a project
        CanDisplay: true
    },
    {
        Key: 5,
        Value: 'Lost',      // This is a lost bid on a project
        CanDisplay: true
    }
];
