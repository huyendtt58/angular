import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appInputFormat]'
})
export class InputFormatDirective {

  @Input('appInputFormat') format;

  constructor(private el : ElementRef) { }

  // @HostListener('focus') onFocus() {
  //   console.log('On focus');
  // }

  @HostListener('blur') onBlur() {
    let value: string = this.el.nativeElement.value;
    // console.log(this.el.nativeElement.value);
    if(this.format == 'upperCase') {
      this.el.nativeElement.value = value.toLowerCase();
    } else if(this.format == 'lowerCase') {
      this.el.nativeElement.value = value.toUpperCase();
    }
    // console.log(this.el.nativeElement.value);
  }

}