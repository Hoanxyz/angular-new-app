import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-example-container',
  templateUrl: './example-container.component.html',
  styleUrls: ['./example-container.component.scss']
})
export class ExampleContainerComponent implements OnInit {
  @ViewChild('dynamicComponentOne', { read: ViewContainerRef, static: true}) containerRefOne!: ViewContainerRef;
  @ViewChild('dynamicComponentTwo', { read: ViewContainerRef, static: true}) containerRefTwo!: ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver) {

  }

  ngOnInit(): void {

  }

  async addDynamicCompOne() {
    this.clearDynamicComp(this.containerRefOne);
    const { DynamicContentOneComponent } = await import('../dynamic-content-one/dynamic-content-one.component');
    const componentFactory = this.cfr.resolveComponentFactory(
      DynamicContentOneComponent
    );
    const componentRef = this.containerRefOne.createComponent(componentFactory);
    componentRef.instance.data = "INPUT DATA 1";
  }

  async addDynamicCompTwo() {
    this.clearDynamicComp(this.containerRefTwo);
    const { DynamicContentTwoComponent } = await import('../dynamic-content-two/dynamic-content-two.component');
    const componentFactory = this.cfr.resolveComponentFactory(
      DynamicContentTwoComponent
    );
    const componentRef = this.containerRefTwo.createComponent(componentFactory);
    componentRef.instance.data = "INPUT DATA 2";
  }

  clearDynamicComp(conRef: ViewContainerRef) {
    conRef.clear();
  }
}
