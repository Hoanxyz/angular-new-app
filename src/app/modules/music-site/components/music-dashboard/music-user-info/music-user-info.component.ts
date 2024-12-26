import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-music-user-info',
  templateUrl: './music-user-info.component.html',
  styleUrls: ['./music-user-info.component.scss']
})
export class MusicUserInfoComponent implements OnInit {
  @Input() user!: any;

  ngOnInit(): void {

  }
}
