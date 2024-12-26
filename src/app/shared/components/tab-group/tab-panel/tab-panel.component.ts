import {Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TabGroupComponent} from "../tab-group.component";

@Component({
  selector: 'app-tab-panel',
  templateUrl: './tab-panel.component.html',
  styleUrls: ['./tab-panel.component.scss']
})
export class TabPanelComponent implements OnInit, OnDestroy {

  @Input() title: string | undefined;
  @ViewChild(TemplateRef, {static: true}) panelBody!: TemplateRef<unknown>;
  constructor(private tabGroup: TabGroupComponent) {}

  ngOnInit() {
    this.tabGroup.addTabPanel(this);
  }
  ngOnDestroy() {
    this.tabGroup.removeTabPanel(this);
  }
}
