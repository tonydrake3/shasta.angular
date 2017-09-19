import { Pipe, PipeTransform } from '@angular/core';
import {statusMap, StatusMap} from '../map/status.map';

/*
 * Map numeric StatusId to Status
 * Usage:
 *   value | status
 * Example:
 *   {{ 2 |  status}}
 *   formats to: Complete
 */
@Pipe({name: 'status'})
export class StatusPipe implements PipeTransform {
    transform(value: string): string {

        const statuses: StatusMap[] = statusMap;

        let statusName = '';

        statuses.forEach(status => {

            if (status.Key === value) {
                statusName = status.Value;
            }
        });

        return statusName;
    }
}
