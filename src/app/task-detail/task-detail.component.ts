import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AutofocusDirective } from '../autofocus.directive';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-detail',
  imports: [RouterLink, FormsModule, AutofocusDirective],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css',
})
export class TaskDetailComponent implements OnInit {
  // Задачи может не быть: например, если открыть адрес с несуществующим id
  task: Task | undefined;

  // Режим редактирования описания нужен только этой странице
  isEditing = false;
  editDescription = '';

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    // id приходит из адреса строкой, поэтому переводим его в число
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.task = this.taskService.getTaskById(id);
  }

  startEdit(): void {
    if (this.task) {
      this.isEditing = true;
      this.editDescription = this.task.description;
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  saveEdit(): void {
    if (this.task) {
      this.taskService.updateDescription(this.task.id, this.editDescription.trim());
      this.isEditing = false;
    }
  }

  onToggle(): void {
    if (this.task) {
      this.taskService.toggleTask(this.task.id);
    }
  }
}
