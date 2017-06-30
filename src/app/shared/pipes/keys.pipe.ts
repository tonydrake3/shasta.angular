import { PipeTransform, Pipe } from '@angular/core';

// reads in a array of key:value objects and returns each as an object to
//    be used in an ngFor with obj.key and obj.value returned

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {

    // pass in argument as in  | keys:toIgnore  to ignore a named objject
    const ignore = args ? args.toString() : '';

    const keys = [];
    for (const key in value) {
      if (value.hasOwnProperty(key) && key !== ignore) {
        keys.push({key: key, value: value[key]});
      }
    }
    return keys;
  }
}
