
export const apiRoutes = {
    'authentication': 'Identity/Token',
    'authorization': 'Identity/Authorization',
    'companyTenants': 'Identity/Authorization/Tenants',
    'currentEmployee': 'Shared/Employees/Current',
    'currentUser': 'Identity/Users/Current',
    'employees': 'Shared/Employees',
    'indirectCostCodes': 'Shared/IndirectCosts',
    'projects': 'Shared/Projects',
    'timeRecords': 'Time/TimeRecords/Full',
    'timeSettings': 'Time/Settings'
};

export const externalApiRoutes = {
    'geocode': 'geocode/json'
};
