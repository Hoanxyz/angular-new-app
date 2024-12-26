import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CommonValidators {

  static fileSizeValidator(maxSize: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value)

      { return null; }

      const file: File = control.value;
      if (file.size > maxSize) { return { fileSize: true };
      }

      return null;
    };
  }

  static formatExcelValidator(fileType: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value?.type && !fileType.includes(value?.type)) { return {invalidFormat: true};
      }
      return null;
    };
  }


}
