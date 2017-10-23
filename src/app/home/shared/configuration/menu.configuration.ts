export const projectSidebarConfiguration = [
    {
        '$id': '2',
        'Action': '/project/summary',
        'Children': null,
        'Key': '@project',
        'System': 1,
        'Title': 'Project Summary',
        'SidebarId': 'projectSummary',
        'iconName': '',
        'Ordinal': 2,
        'Visible': true,
        'expandFull': false
    },
    {
        '$id': '3',
        'Action': '/trackpoint/3',
        'Children': null,
        'Key': '',
        'System': 1,
        'Title': 'Field Notes',
        'SidebarId': 'fieldNotes',
        'iconName': '',
        'Ordinal': 3,
        'Visible': true,
        'expandFull': false
    },
    {
        '$id': '4',
        'Action': '/project/daily-reports',
        'Children': null,
        'Key': '',
        'System': 1,
        'Title': 'Daily Reports',
        'SidebarId': 'dailyReports',
        'iconName': '',
        'Ordinal': 4,
        'Visible': true,
        'expandFull': false
    },
    {
        '$id': '5',
        'Action': '/project/rfi',
        'Children': null,
        'Key': '',
        'System': 1,
        'Title': 'RFIs',
        'SidebarId': 'rfis',
        'iconName': '',
        'Ordinal': 5,
        'Visible': true,
        'expandFull': false
    },
    {
        '$id': '6',
        'Action': '/project/submittals',
        'Children': null,
        'Key': '',
        'System': 1,
        'Title': 'Submittals',
        'SidebarId': 'submittals',
        'iconName': '',
        'Ordinal': 6,
        'Visible': true,
        'expandFull': false
    },
    {
        '$id': '7',
        'Action': '/trackpoint/2',
        'Children': null,
        'Key': '',
        'System': 1,
        'Title': 'Issues',
        'SidebarId': 'issues',
        'iconName': '',
        'Ordinal': 7,
        'Visible': true,
        'expandFull': false
    }
];

export const timeSidebarConfiguration = [
    {
        '$id': '1',
        'Action': '/time/timesheets',
        'Children': null,
        'Key': '',
        'System': 1,
        'Title': 'Timesheets',
        'SidebarId': 'timesheets',
        'iconName': '',
        'Ordinal': 2,
        'Visible': true,
        'expandFull': false
    },
    {
        '$id': '2',
        'Action': '/time/approve-time',
        'Children': null,
        'Key': '',
        'System': 1,
        'Title': 'Approve Time',
        'SidebarId': 'approveTime',
        'iconName': '',
        'Ordinal': 3,
        'Visible': true,
        'expandFull': false
    },
    {
        '$id': '3',
        'Action': '/time/export-time',
        'Children': null,
        'Key': '',
        'System': 1,
        'Title': 'Export Time',
        'SidebarId': 'exportTime',
        'iconName': '',
        'Ordinal': 4,
        'Visible': true,
        'expandFull': false
    },
    {
        '$id': '4',
        'Action': '/time/enter',
        'Children': null,
        'Key': '',
        'System': 1,
        'Title': 'Enter Time',
        'iconName': '',
        'Ordinal': 1,
        'Visible': true,
        'expandFull': false
    },
    {
        '$id': '4',
        'Action': '/time-expenses/settings',
        'Children': null,
        'Key': '',
        'System': 1,
        'Title': 'Settings',
        'SidebarId': 'timeSettings',
        'iconName': '',
        'Ordinal': 4,
        'Visible': true,
        'expandFull': false
    }
];

export const settingSidebarConfiguration = [
    {
        '$id': '7',
        'Action': '/settings',
        'Children': null,
        'Key': 'admin-settings',
        'System': 1,
        'Title': 'Admin',
        'SidebarId': 'adminSettings',
        'iconName': '',
        'Ordinal': 7,
        'Visible': true,
        'expandFull': false
    },
    {
        '$id': '7',
        'Action': '/settings',
        'Children': null,
        'Key': 'list-management',
        'System': 1,
        'Title': 'List Management',
        'SidebarId': 'listManagementSettings',
        'iconName': '',
        'Ordinal': 7,
        'Visible': true,
        'expandFull': false
    },
    {
        '$id': '7',
        'Action': '/settings',
        'Children': null,
        'Key': 'project-management',
        'System': 1,
        'Title': 'Project Management',
        'SidebarId': 'projectManagementSettings',
        'iconName': '',
        'Ordinal': 7,
        'Visible': true,
        'expandFull': false
    }
];

export const sidebarConfiguration = [
    {
        '$id': '1',
        'Action': '/trackpoint/1',
        'Children': null,
        'Key': '',
        'System': 1,
        'Title': 'Corporate Management',
        'SidebarId': 'corporateManagement',
        'iconName': 'folder',
        'Ordinal': 1,
        'Visible': true,
        'expandFull': false
    },
    {
        '$id': '2',
        'Action': '/project',
        'Children': null,
        'Key': 'select',
        'System': 1,
        'Title': 'Select Project',
        'SidebarId': 'selectProject',
        'iconName': 'assignment',
        'Ordinal': 2,
        'Visible': true,
        'expandFull': false
    },
    {
        '$id': '3',
        'Action': '/project/summary',
        'Children': projectSidebarConfiguration,
        'Key': '@project',
        'System': 1,
        'Title': '',
        'SidebarId': 'selectedProjectSummary',
        'iconName': 'event_note',
        'Ordinal': 3,
        'Visible': false,
        'expandFull': false
    },
    {
        '$id': '4',
        'Action': '/time/timesheets',
        'Children': timeSidebarConfiguration,
        'Key': '',
        'System': 1,
        'Title': 'Time',
        'SidebarId': 'time',
        'iconName': 'access_time',
        'Ordinal': 4,
        'Visible': true,
        'expandFull': false
    },
    {
        '$id': '5',
        'Action': '/trackpoint/5',
        'Children': null,
        'Key': '',
        'System': 1,
        'Title': 'Resource Management',
        'SidebarId': 'resourceManagement',
        'iconName': 'change_history',
        'Ordinal': 5,
        'Visible': true,
        'expandFull': false
    },
    {
        '$id': '6',
        'Action': '/trackpoint/6',
        'Children': null,
        'Key': '',
        'System': 1,
        'Title': 'Scheduling',
        'SidebarId': 'scheduling',
        'iconName': 'today',
        'Ordinal': 6,
        'Visible': true,
        'expandFull': false
    },
];
