// Как выглядит одна задача
export interface Task {
  id: number;
  title: string;
  description: string; // необязательное пояснение к задаче
  done: boolean;
}
