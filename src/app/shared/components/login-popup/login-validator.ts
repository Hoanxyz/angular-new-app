import {AbstractControl, AsyncValidator, ValidationErrors, ValidatorFn} from "@angular/forms";
import {catchError, map, Observable, of} from "rxjs";
import {ApiService} from "../../services/services.service";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LoginValidator implements AsyncValidator {

  constructor(
    private apiService: ApiService
  ) {
  }
  static passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.apiService.isUserExist(control.value).pipe(
      map(isTaken => (
        isTaken ? { userExist: true } : null)
      ),
      catchError(() => of(null))
    );
  };
}
