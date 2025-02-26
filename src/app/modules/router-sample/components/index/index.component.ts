import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {slideInAnimation} from "../../animations";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [ slideInAnimation ]
})
export class IndexComponent implements AfterViewInit {
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  getAnimationData(outlet: RouterOutlet) {
    return (outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']);
  }
}
