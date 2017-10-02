import { Pipe, PipeTransform } from '@angular/core';

/*
 * Take numeric value and apply optional precision value
 * If no value is supplied, apply decimal precision of 2
 * Usage:
 *   value | precision
 * Example:
 *   {{ 154.33333 | precision }}
 *   formats to: 154.33
 *
 * Usage:
 *   value | precision: 3
 * Example:
 *   {{ 4.33333 | precision:3 }}
 *   formats to: 4.33
 */
@Pipe({name: 'precision'})
export class NumericPrecisionPipe implements PipeTransform {
    transform(value: number, precision?: number): string {

        if (precision) return value.toPrecision(precision);

        const integerValue = Math.floor(value);

        const length = Math.max(Math.floor(Math.log10(Math.abs(value))), 0) + 1;

        return value.toPrecision(length + 2);
    }
}
