
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
    'timeRecordsFull': 'Time/TimeRecords/Full',
    'timeSettings': 'Time/Settings'
};

export const externalApiRoutes = {
    'geocode': 'geocode/json'
};
