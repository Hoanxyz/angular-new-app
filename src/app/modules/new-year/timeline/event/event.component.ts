import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Event} from "../../../../shared/models/models";
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  @ViewChild('content') content!: ElementRef<HTMLDivElement>;
  @ViewChild('button') button!: ElementRef<HTMLButtonElement>;
  @Input() noLine = false;
  @Input() event: Event | undefined;
  expand = false;
  settings = {
    counter: false,
    plugins: [lgZoom]
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };
  toggle() {
    this.expand = !this.expand;
    const expandedClass = "timeline__item-body--expanded";
    const animOptions = {
      duration: 300,
      easing: "cubic-bezier(0.65,0,0.35,1)"
    };
    const divContent = this.content.nativeElement;
    const buttonExpand = this.button.nativeElement;
    if (this.expand) {
      buttonExpand.ariaExpanded = "true";
      divContent.ariaHidden = "false";
      divContent.classList.add(expandedClass);
      const divHeight = divContent.offsetHeight;
      divContent.animate([
        { height: "0px" },
        { height: `${divHeight}px` }
      ],animOptions);
    } else {
      const divHeight = divContent.offsetHeight;
      buttonExpand.ariaExpanded = "false";
      divContent.ariaHidden = "true";
      divContent.classList.remove(expandedClass);
      animOptions.duration *= 2;
      divContent.animate([
        { height: `${divHeight}px` },
        { height: `${divHeight}px` },
        { height: "0px" }
      ],animOptions);
    }
  }
}
