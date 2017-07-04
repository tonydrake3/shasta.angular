export class SortColumn {
    Key: string;
    Value: string;
    IsSelected: boolean;
    Ordinal: number;
    IsDescending: boolean;
}

export const projectSortColumns = [
    {
        Key: 'LastAccessedDate',
        Value: 'Recent',
        IsSelected: true,
        Ordinal: 0,
        IsDescending: true
    },
    {
        Key: 'Name',
        Value: 'Name',
        IsSelected: false,
        Ordinal: 1,
        IsDescending: true
    },
    {
        Key: 'Number',
        Value: 'Number',
        IsSelected: false,
        Ordinal: 2,
        IsDescending: true
    }
];
