import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Task } from '../task.model';
import { AutofocusDirective } from '../autofocus.directive';

@Component({
  selector: 'app-task-item',
  imports: [FormsModule, AutofocusDirective, RouterLink],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  // Задача приходит сверху, от страницы
  @Input() task!: Task;

  // А наверх уходят события: отметить выполненной, удалить и сохранить новое название
  @Output() toggle = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();
  @Output() save = new EventEmitter<{ id: number; title: string }>();

  // Режим редактирования — обычные поля компонента
  isEditing = false;
  editTitle = '';
  editError = ''; // текст ошибки под полем, пустой — значит ошибки нет

  startEdit(): void {
    this.isEditing = true;
    this.editTitle = this.task.title;
    this.editError = '';
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editError = '';
  }

  saveEdit(): void {
    const newTitle = this.editTitle.trim();

    // такая же проверка, как в форме добавления
    if (newTitle.length < 3) {
      this.editError = 'Название должно быть не короче 3 символов';
      return;
    }

    this.save.emit({ id: this.task.id, title: newTitle });
    this.isEditing = false;
    this.editError = '';
  }

  onRemove(): void {
    // спрашиваем подтверждение, чтобы задачу нельзя было стереть случайно
    const confirmed = window.confirm(`Удалить задачу «${this.task.title}»?`);

    if (confirmed) {
      this.remove.emit(this.task.id);
    }
  }
}
