import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMiddle]'
})
export class MiddleDirective {

  constructor(private el: ElementRef) { 
    el.nativeElement.style.verticalAlign = 'middle'
  }

}
