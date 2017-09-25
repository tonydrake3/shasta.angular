export enum TimeEntryTab {
    TimeInTimeOut = 1,
    Hours,
    Indirect
}

export class EnterTimeFormTab {
    public Index: number;
    public Title: string;
    public TabType: TimeEntryTab
}

export const enterTimeTabs: Array<EnterTimeFormTab> = [

    {
        Index: 0,
        Title: 'Enter Hours',
        TabType: TimeEntryTab.Hours
    },
    {
        Index: 1,
        Title: 'Enter Time In/Time Out',
        TabType: TimeEntryTab.TimeInTimeOut
    },
    {
        Index: 2,
        Title: 'Enter Indirect Costs',
        TabType: TimeEntryTab.Indirect
    }
];
