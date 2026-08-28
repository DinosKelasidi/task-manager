import { Pipe, PipeTransform } from '@angular/core';

// Свой pipe: подбирает правильное окончание слова "задача" для числа.
// В шаблоне пишется так: {{ count }} {{ count | tasksWord }}
@Pipe({
  name: 'tasksWord',
})
export class TasksWordPipe implements PipeTransform {
  transform(count: number): string {
    const lastTwoDigits = count % 100;
    const lastDigit = count % 10;

    // 11, 12, 13, 14 — особый случай: всегда "задач"
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return 'задач';
    }

    if (lastDigit === 1) {
      return 'задача';
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'задачи';
    }

    return 'задач';
  }
}
