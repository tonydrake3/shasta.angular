import {TimeRecord} from '../../../models/domain/TimeRecord';

export interface TimeModalDisplayData {
    employeeText: string;
    projectText?: string;
    costCodeText: string;
    statusText: string;
    totalHoursText: string;
}

export class IndirectCostTimeModalDisplayData implements TimeModalDisplayData {
    employeeText: string;
    projectText: string;
    costCodeText: string;
    statusText: string;
    totalHoursText: string;

    constructor(timeRecord: TimeRecord) {
        this.employeeText = timeRecord.Employee.FirstName + ' ' + timeRecord.Employee.LastName;
        this.projectText = null;
        this.costCodeText = timeRecord.IndirectCost.Description;
        this.statusText = timeRecord.TimeRecordStatus;
        this.totalHoursText = String(timeRecord.Hours.total);
    }
}

export class BannerItem {
    title: string;
    value: string;
}

export interface TimeModal {
    displayData: TimeModalDisplayData;
    didTapCancelButton(): void;
    didTapActionButton(): void;
}

export class ViewTimeModal implements TimeModal {
    displayData: TimeModalDisplayData;

    didTapCancelButton(): void {
        console.log('View Modal Tapped Cancel Button');
    }

    didTapActionButton(): void {
        console.log('View Modal Tapped Action Button');
    }
}

export class EditTimeModal implements TimeModal {
    displayData: TimeModalDisplayData;

    didTapCancelButton(): void {
        console.log('Edit Modal Tapped Cancel Button');
    }

    didTapActionButton(): void {
        console.log('Edit Modal Tapped Action Button');
    }
}
