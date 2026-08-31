import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  // Название и описание отдаём наверх одним объектом
  @Output() addTask = new EventEmitter<{ title: string; description: string }>();

  // Форма из двух полей. nonNullable значит, что значение всегда строка, а не null
  taskForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(200)], // описание необязательное, но не длиннее 200 символов
    }),
  });

  // Короткие ссылки на поля, чтобы в шаблоне не писать длинный путь
  get title() {
    return this.taskForm.controls.title;
  }

  get description() {
    return this.taskForm.controls.description;
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      // помечаем поля как "тронутые", иначе текст ошибки не появится
      this.title.markAsTouched();
      this.description.markAsTouched();
      return;
    }

    this.addTask.emit({
      title: this.title.value.trim(),
      description: this.description.value.trim(),
    });

    this.taskForm.reset();
  }
}
