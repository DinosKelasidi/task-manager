import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-filter',
  imports: [],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.css',
})
export class TaskFilterComponent {
  // Какой фильтр сейчас выбран: all, active или done
  @Input() current = 'all';

  // Сообщаем странице, что пользователь выбрал другой фильтр
  @Output() filterChange = new EventEmitter<string>();
}
