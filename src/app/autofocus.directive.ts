import { AfterViewInit, Directive, ElementRef } from '@angular/core';

// Своя директива: ставит курсор в поле ввода сразу после его появления.
// В шаблоне пишется как обычный атрибут: <input appAutofocus />
@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  // ElementRef — ссылка на настоящий элемент страницы, на котором висит директива
  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }
}
