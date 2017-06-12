

import { Injectable } from '@angular/core';

// provices mock data FOR PRE RELEASE DEV ONLY
// TODO delete me

@Injectable()
export class DEVMockDataService  {

  public navLinks = [
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
  ]
}
