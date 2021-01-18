import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value as string;
  if (!value) { return null; }
  const isValidEmail = /[\w]{6,}@[\w]+\.[\w]+/.test(control.value as string);
  return isValidEmail ? null : {emailValidator: true};
}

export function rePasswordValidatorFactory(targetControl: AbstractControl): ValidatorFn {
  return function rePasswordValidator(control: AbstractControl): ValidationErrors | null {
    const areTheSame = targetControl.value === control.value;
    return areTheSame ? null : { rePasswordValidator: true };
  }
}