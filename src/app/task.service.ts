import { Injectable } from '@angular/core';
import { Task } from './task.model';

// Сервис — единственное место, где хранятся задачи и происходит работа
// с localStorage. Компоненты только вызывают его методы.
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private storageKey = 'tasks';
  private tasks: Task[] = this.loadTasks();

  getTasks(): Task[] {
    return this.tasks;
  }

  // Одна задача по её id — нужна странице подробностей
  getTaskById(id: number): Task | undefined {
    return this.tasks.find((item) => item.id === id);
  }

  addTask(title: string, description: string): void {
    const newTask: Task = {
      id: Date.now(), // время в миллисекундах — простой способ получить уникальный id
      title: title,
      description: description,
      done: false,
    };

    this.tasks.push(newTask);
    this.saveTasks();
  }

  updateTask(id: number, title: string): void {
    const task = this.tasks.find((item) => item.id === id);

    if (task) {
      task.title = title;
      this.saveTasks();
    }
  }

  updateDescription(id: number, description: string): void {
    const task = this.tasks.find((item) => item.id === id);

    if (task) {
      task.description = description;
      this.saveTasks();
    }
  }

  toggleTask(id: number): void {
    const task = this.tasks.find((item) => item.id === id);

    if (task) {
      task.done = !task.done;
      this.saveTasks();
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((item) => item.id !== id);
    this.saveTasks();
  }

  private loadTasks(): Task[] {
    const saved = localStorage.getItem(this.storageKey);

    if (!saved) {
      return [];
    }

    const tasks: Task[] = JSON.parse(saved);

    // Задачи, сохранённые до появления описания, поля description не имеют.
    // Подставляем пустую строку, чтобы шаблоны не наткнулись на undefined.
    return tasks.map((task) => ({ ...task, description: task.description || '' }));
  }

  private saveTasks(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }
}
