export class TimeModalDisplayData {
    employeeText: string;
    projectText: string;
    costCodeText: string;
    statusText: string;
    totalHoursText: string;
    bannerItem: BannerItem;
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
