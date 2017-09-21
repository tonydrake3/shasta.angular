export class TimeSettings {
    'Id': string;
    'Overridable': OverridableSettings;
    'IsActive': boolean;
    'TenantId': string;
}

export class OverridableSettings {

    'FirstLevelApprovalClaim': string;
    'IsFirstLevelApprovalRequired': boolean;
    'SecondLevelApprovalClaim': string;
    'IsSecondLevelApprovalRequired': boolean;
    'IsPunchInPunchOutEnabled': boolean;
    'IsTimeApprovalEnabled': boolean;
    'IsUnitsEnabled': boolean;
    'RequireSignTimeCardEnabled': boolean;
    'RequireVerifyBreaksEnabled': boolean;
    'Notifications': NotificationSettings;
    'OvertimeThresholdDaily': number;
    'OvertimeThresholdWeekly': number;
    'PerDiemThreshold': number;
    'UseLaborActivitiesWithEstimates': boolean;
    'WorkWeekType': string;
    'WeekEndingDay': string;
}

export class NotificationSettings {

    'AlertWhenWorkedNotPunchedOutAfterValue': number;
    'IsAlertWhenWorkedNotPunchedOutAfterEnabled': boolean;
    'TimesheetApprovalNotificationsEnabled': boolean;
    'TimesheetRejectionNotificationsEnabled': boolean;
    'CommentNotificationsEnabled': boolean;
    'PunchMilesOutsideProjectLocation': number;
}
