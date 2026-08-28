import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.model';
import { AutofocusDirective } from '../autofocus.directive';

@Component({
  selector: 'app-task-item',
  imports: [FormsModule, AutofocusDirective],
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

  // Режим редактирования — обычное поле компонента
  isEditing = false;
  editTitle = '';

  startEdit(): void {
    this.isEditing = true;
    this.editTitle = this.task.title;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  saveEdit(): void {
    const newTitle = this.editTitle.trim();

    // такая же проверка, как в форме добавления
    if (newTitle.length < 3) {
      return;
    }

    this.save.emit({ id: this.task.id, title: newTitle });
    this.isEditing = false;
  }
}
