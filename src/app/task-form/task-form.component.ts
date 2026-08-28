import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  // Готовое название задачи отдаём наверх, странице
  @Output() addTask = new EventEmitter<string>();

  // Форма из одного поля. nonNullable значит, что значение всегда строка, а не null
  taskForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  // Короткая ссылка на поле, чтобы в шаблоне не писать длинный путь
  get title() {
    return this.taskForm.controls.title;
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      // помечаем поле как "тронутое", иначе текст ошибки не появится
      this.title.markAsTouched();
      return;
    }

    this.addTask.emit(this.title.value.trim());
    this.taskForm.reset();
  }
}
