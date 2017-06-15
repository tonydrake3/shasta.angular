

import { Injectable } from '@angular/core';

// provices mock data FOR PRE RELEASE DEV ONLY
// TODO delete me

import {NavigationLink} from '../models/NavigationLink';
import {TimeRecord} from '../models/time/TimeRecord';

@Injectable()
export class DEVMockDataService  {

  public navLinks: Array<NavigationLink> = [
    {
    '$id': '1',
    'Action': 'http://dev-shasta.esubonline.com/TRACKpoint/versions/v61/Shasta/Bridge.asp?s=1&m=FieldNotes&session=bearerOY&xtid=2',
    'Children': null,
    'Key': '@fieldNotes',
    'System': 1,
    'Title': 'Field Notes',
    'iconName': 'speaker_notes'
    },
    {
    '$id': '2',
    'Action': 'http://dev-shasta.esubonline.com/TRACKpoint/versions/v61/Shasta/Bridge.asp?s=1&m=FieldNotes&session=bearerOY&xtid=2',
    'Children': null,
    'Key': '@fieldNotes',
    'System': 1,
    'Title': 'Corporate Management',
    'iconName': 'assignment_turned_in'
    },
    {
    '$id': '3',
    'Action': 'http://dev-shasta.esubonline.com/TRACKpoint/versions/v61/Shasta/Bridge.asp?s=1&m=FieldNotes&session=bearerOY&xtid=2',
    'Children': null,
    'Key': '@fieldNotes',
    'System': 1,
    'Title': 'Resource Management',
    'iconName': 'rowing'
    },
    {
    '$id': '4',
    'Action': 'http://dev-shasta.esubonline.com/TRACKpoint/versions/v61/Shasta/Bridge.asp?s=1&m=FieldNotes&session=bearerOY&xtid=2',
    'Children': null,
    'Key': '@fieldNotes',
    'System': 1,
    'Title': 'Scheduling',
    'iconName': 'schedule'
    },
    {
    '$id': '5',
    'Action': 'http://dev-shasta.esubonline.com/TRACKpoint/versions/v61/Shasta/Bridge.asp?s=1&m=FieldNotes&session=bearerOY&xtid=2',
    'Children': null,
    'Key': '@fieldNotes',
    'System': 1,
    'Title': 'Issues',
    'iconName': 'alarm'
    },
  ];

  // make this match the model, but what is the model actually supposed to be...
  public timeRecords: Array<any> = [{
            '$id': '2',
            'Id': '73du8616-bc67-4312-9503-19dbc2538c7e',
            'ApprovedByUserId': null,
            'ApprovedDate': null,
            'BreaksVerified': false,
            'Breaks': [{
                       '$id': '3',
                       'Id': 'bdd3a57b-be17-4a1e-80b1-2dcdefd6c62b',
                       'Type': 0,
                       'TimeIn': '2017-04-12T10:30:00Z',
                       'TimeOut': '2017-04-12T11:00:00Z'
                       }, {
                       '$id': '4',
                       'Id': '655a5c53-c181-485f-a231-4d740eee3ecf',
                       'Type': 0,
                       'TimeIn': '2017-04-12T11:30:00Z',
                       'TimeOut': '2017-04-12T12:00:00Z'
                       }],
            'Comments': [{
                         '$id': '5',
                         'Id': 'd3dc25f8-1b4f-4a48-af5f-58a3c2f18828',
                         'UserId': '2d63622f-1f49-4128-be68-5cfdbcd59983',
                         'User': {
                         '$id': '480',
                         'FirstName': 'John',
                         'LastName': 'Smith',
                         'AccessFailedCount': 0,
                         'Claims': null,
                         'Email': 'jsmith@esub.com',
                         'EmailConfirmed': false,
                         'Id': '2d63622f-1f49-4128-be68-5cfdbcd59983',
                         'LockoutEnabled': false,
                         'LockoutEndDateUtc': null,
                         'PhoneNumber': null,
                         'PhoneNumberConfirmed': false,
                         'Roles': null,
                         'TwoFactorEnabled': false,
                         'UserName': 'manager@esub.com',
                         'ProfilePicUrl': 'https://tinyurl.com/luuvldd'
                         },
                         'Value': `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                         ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                         dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                         deserunt mollit anim id est laborum.`,
                         'Timestamps': {
                         '$id': '6',
                         'ClientCreated': null,
                         'ClientUpdated': null,
                         'Created': '2017-04-12T10:55:00Z',
                         'Updated': '2017-04-12T10:55:00Z'
                         }
                         }, {
                         '$id': '5',
                         'Id': 'd3hy25f8-1b4f-4a48-af5f-58a3c2f18828',
                         'UserId': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'Value': `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                         ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                         dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                         deserunt mollit anim id est laborum.`,
                         'Timestamps': {
                         '$id': '6',
                         'ClientCreated': null,
                         'ClientUpdated': null,
                         'Created': '2017-04-12T10:56:00Z',
                         'Updated': '2017-04-12T10:56:00Z'
                         }
                         }],
            'CostCode': {
            '$id': '7',
            'Id': '14d042b2-277b-4772-a524-dee566b0e512',
            'Code': 'Basement',
            'Name': 'Basement',
            'IsOverheadActivity': false
            },
            'Employee': {
            '$id': '8',
            'Id': '55827eb4-4d86-4cc0-b202-04b43453ce4d',
            'FirstName': 'FName1',
            'LastName': 'LName2',
            'Number': '1'
            },
            'Hours': {
            '$id': '9',
            'DoubleTime': 0.00,
            'Overtime': 0.00,
            'RegularTime': 3.00,
            'Date': '2017-04-12T00:00:00Z'
            },
            'ManualHours': false,
            'Project': {
            '$id': '10',
            'Id': 'c6ec990e-1383-44af-800d-b5d9193980fa',
            'Name': 'Jefferson Highschool',
            'Number': '1',
            'Status': 1,
            'System': null
            },
            'Punch': {
            '$id': '11',
            'PunchIn': '2017-03-21T18:00:02.957Z',
            'PunchInLocation': {
            '$id': '12',
            'Latitude': 0.0,
            'Longitude': 0.0
            },
            'PunchOut': '2017-03-21T21:00:02.957Z',
            'PunchOutLocation': {
            '$id': '13',
            'Latitude': 0.0,
            'Longitude': 0.0
            },
            'PunchInDistance': null,
            'PunchOutDistance': null,
            'IsActive': true,
            'TenantId': '00000000-0000-0000-0000-000000000001'
            },
            'SecondLvlApprovedByUserId': null,
            'SecondLvlApprovedDate': null,
            'SignedDate': '2017-04-06T22:17:40.053',
            'TimeRecordStatus': 'Signed',
            'Timestamps': {
            '$id': '14',
            'ClientCreated': '2017-04-06T22:17:40.053',
            'ClientUpdated': '2017-04-06T22:17:40.053',
            'Created': '2017-04-06T22:17:40.053',
            'Updated': '2017-04-06T22:17:40.053'
            },
            'Units': 0.00
            }, {
            '$id': '15',
            'Id': '1da36ce2-592e-4690-820b-29b57c4039e4',
            'ApprovedByUserId': null,
            'ApprovedDate': null,
            'BreaksVerified': false,
            'Breaks': [],
            'Comments': [{
                         '$id': '5',
                         'Id': 'd3dc2128-1b4f-4a48-af5f-58a3c2f18828',
                         'UserId': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'User': {
                         '$id': '662',
                         'FirstName': 'Field',
                         'LastName': 'Worker',
                         'AccessFailedCount': 0,
                         'Claims': null,
                         'Email': null,
                         'EmailConfirmed': false,
                         'Id': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'LockoutEnabled': false,
                         'LockoutEndDateUtc': null,
                         'PhoneNumber': null,
                         'PhoneNumberConfirmed': false,
                         'Roles': null,
                         'TwoFactorEnabled': false,
                         'UserName': 'fieldworker@esub.com',
                         'ProfilePicUrl': 'https://tinyurl.com/luuvldd'
                         },
                         'Value': `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                         et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                         ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                         nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                         anim id est laborum.`,
                         'Timestamps': {
                         '$id': '6',
                         'ClientCreated': null,
                         'ClientUpdated': null,
                         'Created': '2017-04-12T10:55:00Z',
                         'Updated': '2017-04-12T10:55:00Z'
                         }
                         }],
            'CostCode': {
            '$id': '16',
            'Id': '14d042b2-277b-4772-a524-dee566b0e512',
            'Code': 'Basement',
            'Name': 'Basement',
            'IsOverheadActivity': false
            },
            'Employee': {
            '$id': '17',
            'Id': '55827eb4-4d86-4cc0-b202-04b43453ce4d',
            'FirstName': 'FName1',
            'LastName': 'LName2',
            'Number': '1'
            },
            'Hours': {
            '$id': '18',
            'DoubleTime': 0.00,
            'Overtime': 0.00,
            'RegularTime': 3.00,
            'Date': '2017-03-21T00:00:00Z'
            },
            'ManualHours': true,
            'Project': {
            '$id': '19',
            'Id': 'c6ec990e-1383-44af-800d-b5d9193980fa',
            'Name': 'Jefferson Highschool',
            'Number': '1',
            'Status': 1,
            'System': null
            },
            'Punch': null,
            'SecondLvlApprovedByUserId': null,
            'SecondLvlApprovedDate': null,
            'SignedDate': '2017-04-07T18:24:56.46',
            'TimeRecordStatus': 'Signed',
            'Timestamps': {
            '$id': '20',
            'ClientCreated': '2017-04-07T18:24:56.46',
            'ClientUpdated': '2017-04-07T18:24:56.46',
            'Created': '2017-04-07T18:24:56.46',
            'Updated': '2017-04-07T18:24:56.46'
            },
            'Units': 0.00
            }, {
            '$id': '21',
            'Id': 'f74e33e7-3b38-4223-afea-2a05eae2a9cc',
            'ApprovedByUserId': null,
            'ApprovedDate': null,
            'BreaksVerified': false,
            'Breaks': [],
            'Comments': [{
                         '$id': '5',
                         'Id': 'd3dc25f8-1b4f-4a48-af5f-58m5c2f18828',
                         'UserId': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'User': {
                         '$id': '662',
                         'FirstName': 'Field',
                         'LastName': 'Worker',
                         'AccessFailedCount': 0,
                         'Claims': null,
                         'Email': null,
                         'EmailConfirmed': false,
                         'Id': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'LockoutEnabled': false,
                         'LockoutEndDateUtc': null,
                         'PhoneNumber': null,
                         'PhoneNumberConfirmed': false,
                         'Roles': null,
                         'TwoFactorEnabled': false,
                         'UserName': 'fieldworker@esub.com',
                         'ProfilePicUrl': 'https://tinyurl.com/luuvldd'
                         },
                         'Value': `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                         et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                         ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                         fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                         mollit anim id est laborum.`,
                         'Timestamps': {
                         '$id': '6',
                         'ClientCreated': null,
                         'ClientUpdated': null,
                         'Created': '2017-04-12T10:55:00Z',
                         'Updated': '2017-04-12T10:55:00Z'
                         }
                         }],
            'CostCode': {
            '$id': '22',
            'Id': '14d042b2-277b-4772-a524-dee566b0e512',
            'Code': 'Basement',
            'Name': 'Basement',
            'IsOverheadActivity': false
            },
            'Employee': {
            '$id': '23',
            'Id': '55827eb4-4d86-4cc0-b202-04b43453ce4d',
            'FirstName': 'FName1',
            'LastName': 'LName2',
            'Number': '1'
            },
            'Hours': {
            '$id': '24',
            'DoubleTime': 0.00,
            'Overtime': 0.00,
            'RegularTime': 7.00,
            'Date': '2017-04-10T00:00:00Z'
            },
            'ManualHours': true,
            'Project': {
            '$id': '25',
            'Id': 'c6ec990e-1383-44af-800d-b5d9193980fa',
            'Name': 'Jefferson Highschool',
            'Number': '1',
            'Status': 1,
            'System': null
            },
            'Punch': null,
            'SecondLvlApprovedByUserId': null,
            'SecondLvlApprovedDate': null,
            'SignedDate': '2017-04-07T18:24:56.46',
            'TimeRecordStatus': 'Signed',
            'Timestamps': {
            '$id': '26',
            'ClientCreated': '2017-04-07T18:24:56.46',
            'ClientUpdated': '2017-04-07T18:24:56.46',
            'Created': '2017-04-07T18:24:56.46',
            'Updated': '2017-04-07T18:24:56.46'
            },
            'Units': 0.00
            }, {
            '$id': '27',
            'Id': 'b58a82d8-4507-4db2-94a1-6375ffec574e',
            'ApprovedByUserId': null,
            'ApprovedDate': null,
            'BreaksVerified': false,
            'Breaks': [],
            'Comments': [{
                         '$id': '5',
                         'Id': 'd3dc25f8-1b4f-4a48-af5f-58a3c2f18828',
                         'UserId': 'b94b11c8-d042-k5g9-b558-ef969cfd3b3e',
                         'User': {
                         '$id': '662',
                         'FirstName': 'Field',
                         'LastName': 'Worker',
                         'AccessFailedCount': 0,
                         'Claims': null,
                         'Email': null,
                         'EmailConfirmed': false,
                         'Id': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'LockoutEnabled': false,
                         'LockoutEndDateUtc': null,
                         'PhoneNumber': null,
                         'PhoneNumberConfirmed': false,
                         'Roles': null,
                         'TwoFactorEnabled': false,
                         'UserName': 'fieldworker@esub.com',
                         'ProfilePicUrl': 'https://tinyurl.com/luuvldd'
                         },
                         'Value': `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                         et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                         ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                         nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                         anim id est laborum.`,
                         'Timestamps': {
                         '$id': '6',
                         'ClientCreated': null,
                         'ClientUpdated': null,
                         'Created': '2017-04-12T10:55:00Z',
                         'Updated': '2017-04-12T10:55:00Z'
                         }
                         }],
            'CostCode': {
            '$id': '28',
            'Id': '14d042b2-277b-4772-a524-dee566b0e512',
            'Code': 'Basement',
            'Name': 'Basement',
            'IsOverheadActivity': false
            },
            'Employee': {
            '$id': '29',
            'Id': '55827eb4-4d86-4cc0-b202-04b43453ce4d',
            'FirstName': 'FName1',
            'LastName': 'LName2',
            'Number': '1'
            },
            'Hours': {
            '$id': '30',
            'DoubleTime': 0.00,
            'Overtime': 2.00,
            'RegularTime': 3.00,
            'Date': '2017-04-10T00:00:00Z'
            },
            'ManualHours': true,
            'Project': {
            '$id': '31',
            'Id': 'c6ec990e-1383-44af-800d-b5d9193980fa',
            'Name': 'Jefferson Highschool',
            'Number': '1',
            'Status': 1,
            'System': null
            },
            'Punch': null,
            'SecondLvlApprovedByUserId': null,
            'SecondLvlApprovedDate': null,
            'SignedDate': '2017-04-07T18:24:56.46',
            'TimeRecordStatus': 'Signed',
            'Timestamps': {
            '$id': '32',
            'ClientCreated': '2017-04-07T18:24:56.46',
            'ClientUpdated': '2017-04-07T18:24:56.46',
            'Created': '2017-04-07T18:24:56.46',
            'Updated': '2017-04-07T18:24:56.46'
            },
            'Units': 0.00
            }, {
            '$id': '33',
            'Id': '333cf3de-4aeb-460b-866d-6ff1c6d8c2ae',
            'ApprovedByUserId': null,
            'ApprovedDate': null,
            'BreaksVerified': false,
            'Breaks': [],
            'Comments': [{
                         '$id': '34',
                         'Id': '0825779f-e332-4752-a94f-d7cc6fa786d7',
                         'UserId': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'User': {
                         '$id': '662',
                         'FirstName': 'Field',
                         'LastName': 'Worker',
                         'AccessFailedCount': 0,
                         'Claims': null,
                         'Email': null,
                         'EmailConfirmed': false,
                         'Id': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'LockoutEnabled': false,
                         'LockoutEndDateUtc': null,
                         'PhoneNumber': null,
                         'PhoneNumberConfirmed': false,
                         'Roles': null,
                         'TwoFactorEnabled': false,
                         'UserName': 'fieldworker@esub.com',
                         'ProfilePicUrl': 'https://tinyurl.com/luuvldd'
                         },
                         'Value': 'Test Comment',
                         'Timestamps': {
                         '$id': '35',
                         'ClientCreated': null,
                         'ClientUpdated': null,
                         'Created': '2017-04-12T10:55:00Z',
                         'Updated': '2017-04-12T10:55:00Z'
                         }
                         }],
            'CostCode': {
            '$id': '36',
            'Id': '14d042b2-277b-4772-a524-dee566b0e512',
            'Code': 'Basement',
            'Name': 'Basement',
            'IsOverheadActivity': false
            },
            'Employee': {
            '$id': '37',
            'Id': '55827eb4-4d86-4cc0-b202-04b43453ce4d',
            'FirstName': 'FName1',
            'LastName': 'LName2',
            'Number': '1'
            },
            'Hours': {
            '$id': '38',
            'DoubleTime': 0.00,
            'Overtime': 3.00,
            'RegularTime': 0.00,
            'Date': '2017-03-28T00:00:00Z'
            },
            'ManualHours': true,
            'Project': {
            '$id': '39',
            'Id': 'c6ec990e-1383-44af-800d-b5d9193980fa',
            'Name': 'Jefferson Highschool',
            'Number': '1',
            'Status': 1,
            'System': null
            },
            'Punch': null,
            'SecondLvlApprovedByUserId': null,
            'SecondLvlApprovedDate': null,
            'SignedDate': null,
            'TimeRecordStatus': 'Approved',
            'Timestamps': {
            '$id': '40',
            'ClientCreated': '2017-04-07T18:24:56.46',
            'ClientUpdated': '2017-04-07T18:24:56.46',
            'Created': '2017-04-07T18:24:56.46',
            'Updated': '2017-04-07T18:24:56.46'
            },
            'Units': 0.00
            }, {
            '$id': '41',
            'Id': 'f3240e32-cdc6-4e2d-a9fe-9e1cc1fd0486',
            'ApprovedByUserId': null,
            'ApprovedDate': null,
            'BreaksVerified': false,
            'Breaks': [],
            'Comments': [{
                         '$id': '5',
                         'Id': 'd3dc25f8-1b4f-4a48-m6ff-58a3c2f18828',
                         'UserId': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'User': {
                         '$id': '662',
                         'FirstName': 'Field',
                         'LastName': 'Worker',
                         'AccessFailedCount': 0,
                         'Claims': null,
                         'Email': null,
                         'EmailConfirmed': false,
                         'Id': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'LockoutEnabled': false,
                         'LockoutEndDateUtc': null,
                         'PhoneNumber': null,
                         'PhoneNumberConfirmed': false,
                         'Roles': null,
                         'TwoFactorEnabled': false,
                         'UserName': 'fieldworker@esub.com',
                         'ProfilePicUrl': 'https://tinyurl.com/luuvldd'
                         },
                         'Value': `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                           deserunt mollit anim id est laborum.`,
                         'Timestamps': {
                         '$id': '6',
                         'ClientCreated': null,
                         'ClientUpdated': null,
                         'Created': '2017-04-12T10:55:00Z',
                         'Updated': '2017-04-12T10:55:00Z'
                         }
                         }, {
                         '$id': '5',
                         'Id': 'd3dchg48-1b4f-4a48-af5f-58a3c2f18828',
                         'UserId': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'Value': `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                         ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                         dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                         deserunt mollit anim id est laborum.`,
                         'Timestamps': {
                         '$id': '6',
                         'ClientCreated': null,
                         'ClientUpdated': null,
                         'Created': '2017-04-12T10:55:00Z',
                         'Updated': '2017-04-12T10:55:00Z'
                         }
                         }],
            'CostCode': {
            '$id': '42',
            'Id': '14d042b2-277b-4772-a524-dee566b0e512',
            'Code': 'Basement',
            'Name': 'Basement',
            'IsOverheadActivity': false
            },
            'Employee': {
            '$id': '43',
            'Id': '55827eb4-4d86-4cc0-b202-04b43453ce4d',
            'FirstName': 'FName1',
            'LastName': 'LName2',
            'Number': '1'
            },
            'Hours': {
            '$id': '44',
            'DoubleTime': 0.00,
            'Overtime': 4.00,
            'RegularTime': 0.00,
            'Date': '2017-04-10T00:00:00Z'
            },
            'ManualHours': true,
            'Project': {
            '$id': '45',
            'Id': 'c6ec990e-1383-44af-800d-b5d9193980fa',
            'Name': 'Jefferson Highschool',
            'Number': '1',
            'Status': 1,
            'System': null
            },
            'Punch': null,
            'SecondLvlApprovedByUserId': null,
            'SecondLvlApprovedDate': null,
            'SignedDate': '2017-04-07T18:24:56.46',
            'TimeRecordStatus': 'Signed',
            'Timestamps': {
            '$id': '46',
            'ClientCreated': '2017-04-07T18:24:56.46',
            'ClientUpdated': '2017-04-07T18:24:56.46',
            'Created': '2017-04-07T18:24:56.46',
            'Updated': '2017-04-07T18:24:56.46'
            },
            'Units': 0.00
            }, {
            '$id': '47',
            'Id': '4633ebd6-1b82-494a-a370-d294cf833827',
            'ApprovedByUserId': null,
            'ApprovedDate': null,
            'BreaksVerified': false,
            'Breaks': [],
            'Comments': [{
                         '$id': '5',
                         'Id': 'd3dc25f8-1b4f-4a48-af5f-58alw2s18828',
                         'UserId': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'User': {
                         '$id': '662',
                         'FirstName': 'Field',
                         'LastName': 'Worker',
                         'AccessFailedCount': 0,
                         'Claims': null,
                         'Email': null,
                         'EmailConfirmed': false,
                         'Id': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'LockoutEnabled': false,
                         'LockoutEndDateUtc': null,
                         'PhoneNumber': null,
                         'PhoneNumberConfirmed': false,
                         'Roles': null,
                         'TwoFactorEnabled': false,
                         'UserName': 'fieldworker@esub.com',
                         'ProfilePicUrl': 'https://tinyurl.com/luuvldd'
                         },
                         'Value': `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.`,
                         'Timestamps': {
                         '$id': '6',
                         'ClientCreated': null,
                         'ClientUpdated': null,
                         'Created': '2017-04-12T10:55:00Z',
                         'Updated': '2017-04-12T10:55:00Z'
                         }
                         }, {
                         '$id': '5',
                         'Id': 'd3dc25f8-1b4f-4a48-af5f-ab93c2f18828',
                         'UserId': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'Value': `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                          ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.`,
                         'Timestamps': {
                         '$id': '6',
                         'ClientCreated': null,
                         'ClientUpdated': null,
                         'Created': '2017-04-12T10:55:00Z',
                         'Updated': '2017-04-12T10:55:00Z'
                         }
                         }],
            'CostCode': {
            '$id': '48',
            'Id': '14d042b2-277b-4772-a524-dee566b0e512',
            'Code': 'Basement',
            'Name': 'Basement',
            'IsOverheadActivity': false
            },
            'Employee': {
            '$id': '49',
            'Id': '55827eb4-4d86-4cc0-b202-04b43453ce4d',
            'FirstName': 'FName1',
            'LastName': 'LName2',
            'Number': '1'
            },
            'Hours': {
            '$id': '50',
            'DoubleTime': 0.00,
            'Overtime': 3.00,
            'RegularTime': 7.00,
            'Date': '2017-03-21T00:00:00Z'
            },
            'ManualHours': true,
            'Project': {
            '$id': '51',
            'Id': 'c6ec990e-1383-44af-800d-b5d9193980fa',
            'Name': 'Jefferson Highschool',
            'Number': '1',
            'Status': 1,
            'System': null
            },
            'Punch': null,
            'SecondLvlApprovedByUserId': null,
            'SecondLvlApprovedDate': null,
            'SignedDate': '2017-04-07T18:24:56.46',
            'TimeRecordStatus': 'Signed',
            'Timestamps': {
            '$id': '52',
            'ClientCreated': '2017-04-07T18:24:56.46',
            'ClientUpdated': '2017-04-07T18:24:56.46',
            'Created': '2017-04-07T18:24:56.46',
            'Updated': '2017-04-07T18:24:56.46'
            },
            'Units': 0.00
            }, {
            '$id': '53',
            'Id': '84046574-8434-4cd6-a345-ec9927fed29b',
            'ApprovedByUserId': null,
            'ApprovedDate': null,
            'BreaksVerified': false,
            'Breaks': [{
                       '$id': '54',
                       'Id': '620417e0-5a64-4b21-abe3-b74a9a6078db',
                       'Type': 0,
                       'TimeIn': '2017-04-05T11:00:00Z',
                       'TimeOut': '2017-03-28T11:30:00Z'
                       }],
            'Comments': [{
                         '$id': '55',
                         'Id': '8544b01f-18d2-4fca-9a89-27a083e6260c',
                         'UserId': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'User': {
                         '$id': '662',
                         'FirstName': 'Field',
                         'LastName': 'Worker',
                         'AccessFailedCount': 0,
                         'Claims': null,
                         'Email': null,
                         'EmailConfirmed': false,
                         'Id': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'LockoutEnabled': false,
                         'LockoutEndDateUtc': null,
                         'PhoneNumber': null,
                         'PhoneNumberConfirmed': false,
                         'Roles': null,
                         'TwoFactorEnabled': false,
                         'UserName': 'fieldworker@esub.com',
                         'ProfilePicUrl': 'https://tinyurl.com/luuvldd'
                         },
                         'Value': 'Test Comment',
                         'Timestamps': {
                         '$id': '56',
                         'ClientCreated': null,
                         'ClientUpdated': null,
                         'Created': '2017-04-12T10:55:00Z',
                         'Updated': '2017-04-12T10:55:00Z'
                         }
                         }],
            'CostCode': {
            '$id': '57',
            'Id': '14d042b2-277b-4772-a524-dee566b0e512',
            'Code': 'Basement',
            'Name': 'Basement',
            'IsOverheadActivity': false
            },
            'Employee': {
            '$id': '58',
            'Id': '55827eb4-4d86-4cc0-b202-04b43453ce4d',
            'FirstName': 'FName1',
            'LastName': 'LName2',
            'Number': '1'
            },
            'Hours': {
            '$id': '59',
            'DoubleTime': 0.00,
            'Overtime': 0.00,
            'RegularTime': 12.00,
            'Date': '2017-03-28T00:00:00Z'
            },
            'ManualHours': true,
            'Project': {
            '$id': '60',
            'Id': 'c6ec990e-1383-44af-800d-b5d9193980fa',
            'Name': 'Jefferson Highschool',
            'Number': '1',
            'Status': 1,
            'System': null
            },
            'Punch': null,
            'SecondLvlApprovedByUserId': null,
            'SecondLvlApprovedDate': null,
            'SignedDate': null,
            'TimeRecordStatus': 'Rejected',
            'Timestamps': {
            '$id': '61',
            'ClientCreated': '2017-04-07T18:24:56.46',
            'ClientUpdated': '2017-04-07T18:24:56.46',
            'Created': '2017-04-07T18:24:56.46',
            'Updated': '2017-04-07T18:24:56.46'
            },
            'Units': 0.00
            }, {
            '$id': '62',
            'Id': '1c99d1b0-12a0-4eac-8700-f7b6107fd876',
            'ApprovedByUserId': null,
            'ApprovedDate': null,
            'BreaksVerified': false,
            'Breaks': [{
                       '$id': '63',
                       'Id': 'de96eb83-35f0-4749-a3e7-fae6bf10f5ab',
                       'Type': 0,
                       'TimeIn': '2017-04-12T11:00:00Z',
                       'TimeOut': '2017-04-12T11:30:00Z'
                       }],
            'Comments': [{
                         '$id': '64',
                         'Id': 'd79ae9d8-e4be-4b1e-afbb-2d2cc4ecb81c',
                         'UserId': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'User': {
                         '$id': '662',
                         'FirstName': 'Field',
                         'LastName': 'Worker',
                         'AccessFailedCount': 0,
                         'Claims': null,
                         'Email': null,
                         'EmailConfirmed': false,
                         'Id': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'LockoutEnabled': false,
                         'LockoutEndDateUtc': null,
                         'PhoneNumber': null,
                         'PhoneNumberConfirmed': false,
                         'Roles': null,
                         'TwoFactorEnabled': false,
                         'UserName': 'fieldworker@esub.com',
                         'ProfilePicUrl': 'https://tinyurl.com/luuvldd'
                         },
                         'Value': 'Test Comment',
                         'Timestamps': {
                         '$id': '65',
                         'ClientCreated': '2017-04-12T10:55:00Z',
                         'ClientUpdated': '2017-04-12T10:55:00Z',
                         'Created': '2017-04-12T10:55:00Z',
                         'Updated': '2017-04-12T10:55:00Z'
                         }
                         }],
            'CostCode': {
            '$id': '66',
            'Id': '14d042b2-277b-4772-a524-dee566b0e512',
            'Code': 'Basement',
            'Name': 'Basement',
            'IsOverheadActivity': false
            },
            'Employee': {
            '$id': '67',
            'Id': '55827eb4-4d86-4cc0-b202-04b43453ce4d',
            'FirstName': 'FName1',
            'LastName': 'LName2',
            'Number': '1'
            },
            'Hours': {
            '$id': '68',
            'DoubleTime': 0.00,
            'Overtime': 0.00,
            'RegularTime': 7.00,
            'Date': '2017-04-05T00:00:00Z'
            },
            'ManualHours': false,
            'Project': {
            '$id': '69',
            'Id': 'c6ec990e-1383-44af-800d-b5d9193980fa',
            'Name': 'Jefferson Highschool',
            'Number': '1',
            'Status': 1,
            'System': null
            },
            'Punch': {
            '$id': '70',
            'PunchIn': '2017-03-28T00:00:00Z',
            'PunchInLocation': {
            '$id': '71',
            'Latitude': 0.0,
            'Longitude': 0.0
            },
            'PunchOut': '2017-03-28T07:00:00Z',
            'PunchOutLocation': {
            '$id': '72',
            'Latitude': 0.0,
            'Longitude': 0.0
            },
            'PunchInDistance': null,
            'PunchOutDistance': null,
            'IsActive': true,
            'TenantId': '00000000-0000-0000-0000-000000000001'
            },
            'SecondLvlApprovedByUserId': null,
            'SecondLvlApprovedDate': null,
            'SignedDate': null,
            'TimeRecordStatus': 'Approved',
            'Timestamps': {
            '$id': '73',
            'ClientCreated': '2017-04-07T18:24:56.46',
            'ClientUpdated': '2017-04-07T18:24:56.46',
            'Created': '2017-04-07T18:24:56.46',
            'Updated': '2017-04-07T18:24:56.46'
            },
            'Units': 0.00
            }, {
            '$id': '74',
            'Id': '42e9014e-ff09-4fdb-b0db-fca375e18b76',
            'ApprovedByUserId': null,
            'ApprovedDate': null,
            'BreaksVerified': false,
            'Breaks': [],
            'Comments': [],
            'CostCode': {
            '$id': '75',
            'Id': '14d042b2-277b-4772-a524-dee566b0e512',
            'Code': 'Basement',
            'Name': 'Basement',
            'IsOverheadActivity': false
            },
            'Employee': {
            '$id': '76',
            'Id': '55827eb4-4d86-4cc0-b202-04b43453ce4d',
            'FirstName': 'FName1',
            'LastName': 'LName2',
            'Number': '1'
            },
            'Hours': {
            '$id': '77',
            'DoubleTime': 2.00,
            'Overtime': 1.00,
            'RegularTime': 6.00,
            'Date': '2017-04-10T00:00:00Z'
            },
            'ManualHours': true,
            'Project': {
            '$id': '78',
            'Id': 'c6ec990e-1383-44af-800d-b5d9193980fa',
            'Name': 'Jefferson Highschool',
            'Number': '1',
            'Status': 1,
            'System': null
            },
            'Punch': null,
            'SecondLvlApprovedByUserId': null,
            'SecondLvlApprovedDate': null,
            'SignedDate': null,
            'TimeRecordStatus': 'Approved',
            'Timestamps': {
            '$id': '79',
            'ClientCreated': '2017-04-07T18:24:56.46',
            'ClientUpdated': '2017-04-07T18:24:56.46',
            'Created': '2017-04-07T18:24:56.46',
            'Updated': '2017-04-07T18:24:56.46'
            },
            'Units': 0.00
            }, {
            '$id': '2',
            'Id': '73aa8616-bc67-4312-9503-19dbc2538c7e',
            'ApprovedByUserId': null,
            'ApprovedDate': null,
            'BreaksVerified': false,
            'Breaks': [{
                       '$id': '3',
                       'Id': 'bdd3a57b-be17-4a1e-80b1-2dcdefd6c62b',
                       'Type': 0,
                       'TimeIn': '2017-04-12T10:30:00Z',
                       'TimeOut': '2017-04-12T11:00:00Z'
                       }, {
                       '$id': '4',
                       'Id': '655a5c53-c181-485f-a231-4d740eee3ecf',
                       'Type': 0,
                       'TimeIn': '2017-04-12T11:30:00Z',
                       'TimeOut': '2017-04-12T12:00:00Z'
                       }],
            'Comments': [{
                         '$id': '5',
                         'Id': 'd3dc25f8-1b4f-4a48-af5f-58a3c2f18828',
                         'UserId': 'b94b11c8-d042-4bc9-b558-ef969cfd3b3e',
                         'User': {
                         '$id': '480',
                         'FirstName': 'John',
                         'LastName': 'Smith',
                         'AccessFailedCount': 0,
                         'Claims': null,
                         'Email': 'jsmith@esub.com',
                         'EmailConfirmed': false,
                         'Id': '2d63622f-1f49-4128-be68-5cfdbcd59983',
                         'LockoutEnabled': false,
                         'LockoutEndDateUtc': null,
                         'PhoneNumber': null,
                         'PhoneNumberConfirmed': false,
                         'Roles': null,
                         'TwoFactorEnabled': false,
                         'UserName': 'manager@esub.com',
                         'ProfilePicUrl': 'https://tinyurl.com/luuvldd'
                         },
                         'Value': 'Test Comment',
                         'Timestamps': {
                         '$id': '6',
                         'ClientCreated': null,
                         'ClientUpdated': null,
                         'Created': '2017-04-12T10:55:00Z',
                         'Updated': '2017-04-12T10:55:00Z'
                         }
                         }],
            'CostCode': {
            '$id': '7',
            'Id': '14d042b2-277b-4772-a524-dee566b0e512',
            'Code': 'Basement',
            'Name': 'Basement',
            'IsOverheadActivity': false
            },
            'Employee': {
            '$id': '8',
            'Id': '55827eb4-4d86-4cc0-b202-04b43453ce4d',
            'FirstName': 'FName1',
            'LastName': 'LName2',
            'Number': '1'
            },
            'Hours': {
            '$id': '9',
            'DoubleTime': 0.00,
            'Overtime': 4.00,
            'RegularTime': 0.00,
            'Date': '2017-03-12T00:00:00Z'
            },
            'ManualHours': false,
            'Project': {
            '$id': '10',
            'Id': 'c6ec990e-1383-44af-800d-b5d9193980fa',
            'Name': 'Jefferson Highschool',
            'Number': '1',
            'Status': 1,
            'System': null
            },
            'Punch': {
            '$id': '11',
            'PunchIn': '2017-03-21T21:00:01.037Z',
            'PunchInLocation': {
            '$id': '12',
            'Latitude': 0.0,
            'Longitude': 0.0
            },
            'PunchOut': '2017-03-21T21:00:02.957Z',
            'PunchOutLocation': {
            '$id': '13',
            'Latitude': 0.0,
            'Longitude': 0.0
            },
            'PunchInDistance': null,
            'PunchOutDistance': null,
            'IsActive': true,
            'TenantId': '00000000-0000-0000-0000-000000000001'
            },
            'SecondLvlApprovedByUserId': null,
            'SecondLvlApprovedDate': null,
            'SignedDate': null,
            'TimeRecordStatus': 'Pending',
            'Timestamps': {
            '$id': '14',
            'ClientCreated': '2017-04-06T22:17:40.053',
            'ClientUpdated': '2017-04-06T22:17:40.053',
            'Created': '2017-04-06T22:17:40.053',
            'Updated': '2017-04-06T22:17:40.053'
            },
            'Units': 0.00
            }, {
            '$id': '2',
            'Id': '73ad1616-bc67-4312-9503-19dbc2538c7e',
            'ApprovedByUserId': null,
            'ApprovedDate': null,
            'BreaksVerified': false,
            'Breaks': [],
            'Comments': [{
                         '$id': '5',
                         'Id': 'd3fc25f8-1b4f-4a48-af5f-58a3c2f18828',
                         'UserId': '2d63622f-1f49-4128-be68-5cfdbcd59983',
                         'User': {
                         '$id': '480',
                         'FirstName': 'John',
                         'LastName': 'Smith',
                         'AccessFailedCount': 0,
                         'Claims': null,
                         'Email': 'jsmith@esub.com',
                         'EmailConfirmed': false,
                         'Id': '2d63622f-1f49-4128-be68-5cfdbcd59983',
                         'LockoutEnabled': false,
                         'LockoutEndDateUtc': null,
                         'PhoneNumber': null,
                         'PhoneNumberConfirmed': false,
                         'Roles': null,
                         'TwoFactorEnabled': false,
                         'UserName': 'manager@esub.com',
                         'ProfilePicUrl': 'https://tinyurl.com/luuvldd'
                         },
                         'Value': 'Test Comment',
                         'Timestamps': {
                         '$id': '6',
                         'ClientCreated': null,
                         'ClientUpdated': null,
                         'Created': '2017-04-12T10:55:00Z',
                         'Updated': '2017-04-12T10:55:00Z'
                         }
                         }],
            'CostCode': {
            '$id': '7',
            'Id': '14d042b2-277b-4772-a524-dee566b0e512',
            'Code': 'Basement',
            'Name': 'Basement',
            'IsOverheadActivity': false
            },
            'Employee': {
            '$id': '8',
            'Id': '55827eb4-4d86-4cc0-b202-04b43453ce4d',
            'FirstName': 'FName1',
            'LastName': 'LName2',
            'Number': '1'
            },
            'Hours': {
            '$id': '9',
            'DoubleTime': 0.00,
            'Overtime': 4.00,
            'RegularTime': 0.00,
            'Date': '2017-03-12T00:00:00Z'
            },
            'ManualHours': true,
            'Project': {
            '$id': '10',
            'Id': '26f4f8d1-9483-4361-a4d7-9ec8baf2353d',
            'Name': 'Esub Remodel',
            'Number': '1',
            'Status': 1,
            'System': null
            },
            'SecondLvlApprovedByUserId': null,
            'SecondLvlApprovedDate': null,
            'SignedDate': null,
            'TimeRecordStatus': 'Pending',
            'Timestamps': {
            '$id': '14',
            'ClientCreated': '2017-04-06T22:17:40.053',
            'ClientUpdated': '2017-04-06T22:17:40.053',
            'Created': '2017-04-06T22:17:40.053',
            'Updated': '2017-04-06T22:17:40.053'
            },
            'Units': 0.00
          }];
}
