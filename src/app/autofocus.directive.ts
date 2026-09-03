import { AfterViewInit, Directive, ElementRef } from '@angular/core';

// Своя директива: ставит курсор в поле ввода сразу после его появления.
// В шаблоне пишется как обычный атрибут: <input appAutofocus />
// Тип HTMLElement, а не HTMLInputElement, чтобы работало и на <textarea>.
@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements AfterViewInit {
  // ElementRef — ссылка на настоящий элемент страницы, на котором висит директива
  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }
}
