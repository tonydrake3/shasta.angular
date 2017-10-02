import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';

export function dependentFieldValidator(dependentControl: FormControl): ValidatorFn {
    return (control: FormControl): {[key: string]: any} => {
        console.log('Control', control.value);
        console.log('DependentControl', dependentControl.value);
        return true ? {'required': {value: control.value}} : null;
    };
}
