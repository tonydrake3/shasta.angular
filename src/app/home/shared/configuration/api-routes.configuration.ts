
export const apiRoutes = {
    'authentication': 'Identity/Token',
    'authorization': 'Identity/Authorization',
    'companyTenants': 'Identity/Authorization/Tenants',
    'currentEmployee': 'Shared/Employees/Current',
    'currentUser': 'Identity/Users/Current',
    'employees': 'Shared/Employees',
    'enterTimeBatch': 'Time/TimeRecords/Batch',
    'indirectCostCodes': 'Shared/IndirectCosts',
    'notifications': 'DataSync/Notifications',
    'permissions': 'Identity/Permissions/Current',
    'projects': 'Shared/Projects',
    'system': 'Shared/Systems',
    'timeRecords': 'Time/TimeRecords',
    'timeReject': 'Time/TimeRecords/Reject',
    'timeRecordsFull': 'Time/TimeRecords/Full',
    'timeSettings': 'Time/Settings',
    'timeApprove': 'Time/TimeRecords/Approve',
    'timeUpdate': 'Time/TimeRecords'
};

export const externalApiRoutes = {
    'geocode': 'geocode/json'
};
