import {Phase} from './Phase';
import {NumberContainingEntity} from '../NumberContainingEntity';

export class System implements NumberContainingEntity {

    Id?: string;
    Name: string;
    Number: string;
    Phases?: Phase[];
}
