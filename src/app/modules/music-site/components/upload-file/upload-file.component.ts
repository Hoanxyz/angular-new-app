import {Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild} from '@angular/core';
import

{
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  ValidatorFn
}
  from '@angular/forms';
import {Subscription} from 'rxjs';

function fileSizeValidator(maxSize: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || maxSize === 0)

    { return null; }

    const file: File = control.value;
    if (file.size > maxSize) { return { fileSize: true };
    }

    return null;
  };
}

function formatFileValidator(fileTypesValidator: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || fileTypesValidator.length === 0) { return null; }
    const value = control.value;
    if (!fileTypesValidator.includes(value?.type))

    { return {invalidFormat: true}
      ;
    }
    return null;
  };
}

export interface FileUpload {
  size: number | undefined;
  name: string;
}

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [

    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: UploadFileComponent }
    ,

    { provide: NG_VALIDATORS, multi: true, useExisting: UploadFileComponent }
  ]
})
export class UploadFileComponent implements ControlValueAccessor, OnChanges, Validator, OnDestroy {
  @ViewChild('fileInput', { static: false }) inputRef!: ElementRef;
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
  fileData: FileUpload = {
    name: "",
    size: 0
  };
  uploadFile = this.fb.control(this.fileData);
  touched = false;
  disabled = false;

  onChangeSubs: Subscription[] = [];

  onTouched = () => {};

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnChanges(): void

    { this.uploadFile.setValidators( [formatFileValidator(this.fileTypesValidator), fileSizeValidator(this.fileSizeMB * 1024 * 1024)] ); this.uploadFile.updateValueAndValidity(); }
  ngOnDestroy(): void {
    for (const sub of this.onChangeSubs) {
      sub.unsubscribe();
    }
  }

  registerOnChange(onChange: any): void {
    const sub = this.uploadFile.valueChanges.subscribe(onChange); this.onChangeSubs.push(sub);
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  writeValue(value: any): void {
    if (value)

    { this.uploadFile = this.fb.control(value); }
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched(); this.touched = true;
    }
  }

  fileUploaded(event: Event, fileInput: any): void {
    // @ts-ignore
    const file = (event?.target as HTMLInputElement).files[0];
    fileInput.value = '';
    if (file) { // @ts-ignore
      this.uploadFile.patchValue(file); this.uploadFile.enable(); this.uploadFile.markAllAsTouched(); this.handleUpload();
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
  bytesToKBytes(bytes: number | undefined): number {
    if (!bytes) {
      return 0;
    }
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
