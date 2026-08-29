import { Routes } from '@angular/router';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { AboutPageComponent } from './about-page/about-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' }, // с главной сразу на список задач
  { path: 'tasks', component: TasksPageComponent },
  { path: 'tasks/:id', component: TaskDetailComponent }, // :id — номер задачи из адреса
  { path: 'about', component: AboutPageComponent },
];
