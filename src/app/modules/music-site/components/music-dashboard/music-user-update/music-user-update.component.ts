import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../../../shared/services/services.service";
import {AlertDialogComponent} from "../../../../../shared/components/alert-dialog/alert-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";


@Component({
  selector: 'app-music-user-update',
  templateUrl: './music-user-update.component.html',
  styleUrls: ['./music-user-update.component.scss']
})
export class MusicUserUpdateComponent implements OnInit {
  @Input() user!: any;
  updateForm!: FormGroup;
  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl  = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.updateForm = this.fb.group(
      {
        username: [this.user.username],
        email: [this.user.email, [Validators.email]],
        firstname: [this.user?.firstname],
        lastname: [this.user?.lastname],
        oldPassword: [null, [Validators.required]],
        password: [null],
        confirmPassword: [null],
      },{
        validators: this.passwordMatchValidator
      }
    )
  }

  private passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      control.get('confirmPassword')?.setErrors(null);
    }
  }

  update(): void {
    this.updateForm.markAllAsTouched();
    if (this.updateForm.invalid) {
      return;
    }
    const userData = {
      email: this.updateForm.get('email')?.value ? this.updateForm.get('email')?.value.trim() : "",
      firstname: this.updateForm.get('firstname')?.value ? this.updateForm.get('firstname')?.value.trim() : "",
      lastname: this.updateForm.get('lastname')?.value ? this.updateForm.get('lastname')?.value.trim() : "",
      password: this.updateForm.get('password')?.value ? this.updateForm.get('password')?.value.trim() : ""
    };
    this.apiService.updateUser(userData, this.user.id, this.updateForm.get('oldPassword')?.value).subscribe(
      (res) => {
        this.apiService.setNewDataUser(this.user.username);
        this.dialog.open(AlertDialogComponent, {
          data: {
            content: 'Cập nhật thông tin thành công'
          }
        });
      }
      ,
      (err) => {
        this.dialog.open(AlertDialogComponent, {
          data: {
            content: err
          }
        });
      }
    )
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    if (event.objectUrl != null) {
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    }
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
