import {Component, Input} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MusicService} from "../../../shared/services/music.service";
import {AlertDialogComponent} from "../../../../../shared/components/alert-dialog/alert-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MusicSharedService} from "../../../shared/services/music-shared.service";

@Component({
  selector: 'app-music-user-collections',
  templateUrl: './music-user-collections.component.html',
  styleUrls: ['./music-user-collections.component.scss']
})
export class MusicUserCollectionsComponent {
  @Input() user!: any;
  formData = this.fb.group({
    name: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private musicService: MusicService,
    public dialog: MatDialog,
    public sharedService: MusicSharedService
  ) {
  }

  create(): void {
    if (this.formData.invalid) {
      return;
    }
    const req = {
      name: this.formData.get('name')?.value,
      userId: this.user.id
    };
    this.musicService.createSongCollection(req).subscribe(
      (res: any) => {
        this.dialog.open(AlertDialogComponent, {
          data: {
            content: 'Tạo thành công'
          }
        });
        this.musicService.storageCollections();
      },
      (err: any) => {
        this.dialog.open(AlertDialogComponent, {
          data: {
            content: err
          }
        });
      }
    )
  }
}
