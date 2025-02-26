import {Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator, ValidatorFn
} from '@angular/forms';

function fileSizeValidator(maxSize: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || maxSize === 0) {
      return null;
    }

    const file: File = control.value;
    if (file.size > maxSize) {
      return { fileSize: true };
    }

    return null;
  };
}

function formatFileValidator(fileTypesValidator: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || fileTypesValidator.length === 0) {
      return null;
    }
    const value = control.value || {};
    if (
      'type' in value &&
      value?.name &&
      !fileTypesValidator.includes(value?.type)
    ) {
      return { invalidFormat: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-lpb-file',
  templateUrl: './lpb-file.component.html',
  styleUrls: ['./lpb-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: LpbFileComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: LpbFileComponent
    }
  ]
})
export class LpbFileComponent implements ControlValueAccessor, OnChanges, Validator, OnDestroy {

  @ViewChild('fileInput', { static: false }) inputRef: ElementRef | undefined;
  @Input() fileTypesValidator: string[] = []; // example: ['application/pdf']
  @Input() fileTypesAccept: string[] = []; // example: ['.pdf']
  @Input() fileIcon = 'insert_drive_file';
  @Input() fileSizeMB = 10;
  @Input() showDelete = true;
  @Input() isUpload = true;
  @Input() showSize = true;
  @Input() nameClickText = 'Xem';
  @Input() styleClasses = 'primary-border dark-brown';
  @Output() clickDelete = new EventEmitter<any>();
  @Output() uploaded = new EventEmitter<any>();
  @Output() nameClicked = new EventEmitter<any>();
  uploadFile = this.fb.control('');
  touched = false;
  disabled = false;

  onChangeSubs: Subscription[] = [];

  onTouched = () => {};

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnChanges(): void {
    this.uploadFile.setValidators(
      [formatFileValidator(this.fileTypesValidator), fileSizeValidator(this.fileSizeMB * 1024 * 1024)]
    );
    this.uploadFile.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    for (const sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

  registerOnChange(onChange: any): void {
    const sub = this.uploadFile.valueChanges.subscribe(onChange);
    this.onChangeSubs.push(sub);
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  writeValue(value: any): void {
    if (value) {
      this.uploadFile.patchValue(value);
    } else {
      // @ts-ignore
      this.uploadFile.patchValue({name: '', size: 0});
    }
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  fileUploaded(event: Event, fileInput: any): void {
    // @ts-ignore
    const file = (event?.target as HTMLInputElement).files[0];
    fileInput.value = '';
    if (file) {
      // @ts-ignore
      this.uploadFile.patchValue(file);
      this.uploadFile.enable();
      this.uploadFile.markAllAsTouched();
      this.handleUpload();
    }
  }

  handleDelete(): void {
    if (this.inputRef) {
      this.inputRef.nativeElement.value = '';
    }
    this.clickDelete.emit(this.uploadFile.value);
  }

  handleUpload(): void {
    this.uploaded.emit(this.uploadFile.value);
  }

  handleNameClicked(): void {
    this.nameClicked.emit(this.uploadFile.value);
  }

  bytesToKBytes(bytes: number): number {
    return Math.ceil(bytes / 1024);
  }

  // @ts-ignore
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.uploadFile.invalid) {
      return {
        uploadFileError: true
      };
    }
  }
}
