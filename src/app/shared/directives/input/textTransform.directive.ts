import {Directive, ElementRef, HostListener, Input} from "@angular/core";
type optionsTransform = 'uppercase' | 'capitalize' | 'lowercase' | 'none'

@Directive({
  selector: 'input[textTransform]'
})

export class TextTransformDirective {
  @Input('textTransform') option!: optionsTransform;
  constructor(private el: ElementRef) {
  }

  @HostListener('input')
  onInput() {
    this.el.nativeElement.value = this.transformText(this.el.nativeElement.value);
  }

  transformText(text: string): string {
    switch (this.option) {
      case "capitalize":
        return text.charAt(0).toUpperCase() + text.slice(1);
      case "uppercase":
        return text.toUpperCase();
      case "lowercase":
        return text.toLowerCase();
      case "none":
        return text;
      default:
        return text;
    }
  }
}
