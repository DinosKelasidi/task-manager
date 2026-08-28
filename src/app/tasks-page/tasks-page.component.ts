import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFilterComponent } from '../task-filter/task-filter.component';
import { TasksWordPipe } from '../tasks-word.pipe';

@Component({
  selector: 'app-tasks-page',
  imports: [TaskFormComponent, TaskItemComponent, TaskFilterComponent, TasksWordPipe],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css',
})
export class TasksPageComponent implements OnInit {
  tasks: Task[] = [];
  filter = 'all'; // all, active или done

  // Сервис приходит через конструктор — это внедрение зависимостей в Angular
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  // Задачи, которые сейчас видно на экране
  get filteredTasks(): Task[] {
    if (this.filter === 'active') {
      return this.tasks.filter((task) => !task.done);
    }

    if (this.filter === 'done') {
      return this.tasks.filter((task) => task.done);
    }

    return this.tasks;
  }

  // Сколько задач ещё не выполнено
  get activeCount(): number {
    return this.tasks.filter((task) => !task.done).length;
  }

  onAddTask(title: string): void {
    this.taskService.addTask(title);
    this.tasks = this.taskService.getTasks();
  }

  onToggle(id: number): void {
    this.taskService.toggleTask(id);
    this.tasks = this.taskService.getTasks();
  }

  onRemove(id: number): void {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }

  onSave(event: { id: number; title: string }): void {
    this.taskService.updateTask(event.id, event.title);
    this.tasks = this.taskService.getTasks();
  }

  onFilterChange(value: string): void {
    this.filter = value;
  }
}
