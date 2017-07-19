import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { apiRoutes } from '../shared/configuration/api-routes.configuration';
import { BaseStore } from '../../shared/services/base-store.service';

@Injectable()
export class TimeRecordsService extends BaseStore {

    constructor(protected _httpPassthrough: Http) {
        super(_httpPassthrough);
        // this.init(apiRoutes.timeRecords);
    }

    public getLatest (): Promise<any> {
        // return this.load();
        return new Promise((resolve, reject) => {
          this._entity$.next(FakeTimeRecords);
          resolve(FakeTimeRecords);
        });
    }

    get timeRecords$ () {
        return this._entity$.asObservable();
    }

}



const FakeTimeRecords = {
  Value: [
    {
      Id: 'tr0001',
      Comments: [],
      CostCode: {
        Id: 'cc0001',
        Name: 'Maintenance'
      },
      Employee: {
        Id: 'e0001',
        FirstName: 'Charles',
        LastName: 'Woods'
      },
      Hours: {
        Date: '2017-07-13T13:00:45.703Z',
        DoubleTime: 0,
        Overtime: 0,
        RegularTime: 2
      },
      Project: {
        Id: 'p0001',
        Name: 'eSUB'
      },
      SystemPhase: {
        Id: 'sp0002',
        Name: '3rd Floor'
      },
      TimeRecordStatus: 'Pending',
      MapLocationError: true
    },
    {
      Id: 'tr0002',
      Comments: [
        {
          Value: 'Here is my comment',
          User: {
            Id: 'e0001',
            FirstName: 'Charles',
            LastName: 'Woods'
          }
        }
      ],
      CostCode: {
        Id: 'cc0001',
        Name: 'Maintenance'
      },
      Employee: {
        Id: 'e0002',
        FirstName: 'Elizabeth',
        LastName: 'Floyd'
      },
      Hours: {
        Date: '2017-07-13T13:00:45.703Z',
        DoubleTime: 0,
        Overtime: 0,
        RegularTime: 2
      },
      Project: {
        Id: 'p0002',
        Name: 'Seamgen'
      },
      SystemPhase: {
        Id: 'sp0002',
        Name: '3rd Floor'
      },
      TimeRecordStatus: 'Rejected'
    },
    {
      Id: 'tr0003',
      Comments: [
        {
          Value: 'Here is my comment',
          User: {
            Id: 'e0001',
            FirstName: 'Charles',
            LastName: 'Woods'
          }
        }
      ],
      CostCode: {
        Id: 'cc0001',
        Name: 'Maintenance'
      },
      Employee: {
        Id: 'e0002',
        FirstName: 'Elizabeth',
        LastName: 'Floyd'
      },
      Hours: {
        Date: '2017-07-14T13:00:45.703Z',
        DoubleTime: 0,
        Overtime: 0,
        RegularTime: 2
      },
      Project: {
        Id: 'p0001',
        Name: 'eSUB'
      },
      SystemPhase: {
        Id: 'sp0001',
        Name: '2nd Floor'
      },
      TimeRecordStatus: 'Rejected',
      MapLocationError: true
    },
    {
      Id: 'tr0004',
      Comments: [],
      CostCode: {
        Id: 'cc0001',
        Name: 'Maintenance'
      },
      Employee: {
        Id: 'e0001',
        FirstName: 'Charles',
        LastName: 'Woods'
      },
      Hours: {
        Date: '2017-07-14T13:00:45.703Z',
        DoubleTime: 0,
        Overtime: 0,
        RegularTime: 2
      },
      Project: {
        Id: 'p0001',
        Name: 'eSUB'
      },
      SystemPhase: {
        Id: 'sp0001',
        Name: '2nd Floor'
      },
      TimeRecordStatus: 'Pending'
    },
    {
      Id: 'tr0005',
      Comments: [
        {
          Value: 'Here is my comment',
          User: {
            Id: 'e0001',
            FirstName: 'Charles',
            LastName: 'Woods'
          }
        }
      ],
      CostCode: {
        Id: 'cc0001',
        Name: 'Maintenance'
      },
      Employee: {
        Id: 'e0001',
        FirstName: 'Charles',
        LastName: 'Woods'
      },
      Hours: {
        Date: '2017-07-13T13:00:45.703Z',
        DoubleTime: 0,
        Overtime: 0,
        RegularTime: 2
      },
      Project: {
        Id: 'p0001',
        Name: 'eSUB'
      },
      SystemPhase: {
        Id: 'sp0001',
        Name: '2nd Floor'
      },
      TimeRecordStatus: 'Rejected',
      MapLocationError: true
    },
    {
      Id: 'tr0006',
      Comments: [
        {
          Value: 'Here is my comment',
          User: {
            Id: 'e0001',
            FirstName: 'Charles',
            LastName: 'Woods'
          }
        }
      ],
      CostCode: {
        Id: 'cc0001',
        Name: 'Maintenance'
      },
      Employee: {
        Id: 'e0001',
        FirstName: 'Charles',
        LastName: 'Woods'
      },
      Hours: {
        Date: '2017-07-12T13:00:45.703Z',
        DoubleTime: 0,
        Overtime: 0,
        RegularTime: 2
      },
      Project: {
        Id: 'p0002',
        Name: 'Seamgen'
      },
      SystemPhase: {
        Id: 'sp0001',
        Name: '2nd Floor'
      },
      TimeRecordStatus: 'Approved',
      MapLocationError: true
    },
    {
      Id: 'tr0006',
      Comments: [],
      CostCode: {
        Id: 'cc0002',
        Name: 'Finance'
      },
      Employee: {
        Id: 'e0001',
        FirstName: 'Charles',
        LastName: 'Woods'
      },
      Hours: {
        Date: '2017-07-12T13:00:45.703Z',
        DoubleTime: 0,
        Overtime: 0,
        RegularTime: 2
      },
      Project: {
        Id: 'p0002',
        Name: 'Seamgen'
      },
      SystemPhase: {
        Id: 'sp0001',
        Name: '2nd Floor'
      },
      TimeRecordStatus: 'Approved'
    },
    {
      Id: 'tr0006',
      Comments: [],
      CostCode: {
        Id: 'cc0003',
        Name: 'Overhead'
      },
      Employee: {
        Id: 'e0001',
        FirstName: 'Charles',
        LastName: 'Woods'
      },
      Hours: {
        Date: '2017-07-12T13:00:45.703Z',
        DoubleTime: 0,
        Overtime: 0,
        RegularTime: 2
      },
      Project: {
        Id: 'p0002',
        Name: 'Seamgen'
      },
      SystemPhase: {
        Id: 'sp0001',
        Name: '2nd Floor'
      },
      TimeRecordStatus: 'Approved',
      MapLocationError: true
    },
    {
      Id: 'tr0007',
      Comments: [],
      CostCode: {
        Id: 'cc0003',
        Name: 'Overhead'
      },
      Employee: {
        Id: 'e0001',
        FirstName: 'Charles',
        LastName: 'Woods'
      },
      Hours: {
        Date: '2017-07-12T13:00:45.703Z',
        DoubleTime: 0,
        Overtime: 0,
        RegularTime: 2
      },
      Project: {
        Id: 'p0002',
        Name: 'Seamgen'
      },
      SystemPhase: {
        Id: 'sp0002',
        Name: '3rd Floor'
      },
      TimeRecordStatus: 'Approved'
    },
    {
      Id: 'tr0008',
      Comments: [],
      CostCode: {
        Id: 'cc0003',
        Name: 'Overhead'
      },
      Employee: {
        Id: 'e0001',
        FirstName: 'Charles',
        LastName: 'Woods'
      },
      Hours: {
        Date: '2017-07-10T13:00:45.703Z',
        DoubleTime: 0,
        Overtime: 0,
        RegularTime: 2
      },
      Project: {
        Id: 'p0002',
        Name: 'Seamgen'
      },
      SystemPhase: {
        Id: 'sp0002',
        Name: '3rd Floor'
      },
      TimeRecordStatus: 'Rejected'
    },
  ]};
