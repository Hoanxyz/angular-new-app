import {Component, OnInit} from '@angular/core';
import {ITabsSidebar} from "../../../../shared/models/models";

@Component({
  selector: 'app-music-dashboard',
  templateUrl: './music-dashboard.component.html',
  styleUrls: ['./music-dashboard.component.scss']
})
export class MusicDashboardComponent implements OnInit {
  currentTab = 'user-info';
  user: any;
  tabs: ITabsSidebar[] = [
    {
      title: 'Thông tin chung',
      tab: 'user-info'
    },
    {
      title: 'Cập nhật thông tin',
      tab: 'user-update'
    },
    {
      title: 'Danh sách nhạc',
      tab: 'user-collections'
    },
  ];

  ngOnInit(): void {
    const userData = localStorage.getItem("currentUser");
    this.user = userData ? JSON.parse(userData) : null;
  }

  changeTab(tab: string) {
    this.currentTab = tab;
  }
}
