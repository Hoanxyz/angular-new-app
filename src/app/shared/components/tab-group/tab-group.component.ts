import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TabPanelComponent} from "./tab-panel/tab-panel.component";

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements OnInit {

  tabPanelList: TabPanelComponent[] = [];
  @Input() tabActiveIndex = 0;
  @Output() tabActiveChange = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  selectItem(idx: number): void {
    this.tabActiveIndex = idx;
    this.tabActiveChange.emit(idx);
  }

  addTabPanel(tab: TabPanelComponent): void {
    this.tabPanelList.push(tab);
  }

  removeTabPanel(tab: TabPanelComponent): void {
    let index = -1;
    const tabPanelList: TabPanelComponent[] = [];
    this.tabPanelList.forEach((item, idx) => {
      if (tab === item) {
        index = idx;
        return;
      }
      tabPanelList.push(item);
    });
    this.tabPanelList = tabPanelList;
    if (index !== -1) {
      this.selectItem(0);
    }
  }
}
