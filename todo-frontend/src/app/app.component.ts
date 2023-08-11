import { Component } from '@angular/core';
import { TaskService } from './task.service';

// Define the structure of a Task
interface Task {
  id: number;
  name: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  // Initialize an array to store tasks and a variable for a new task
  tasks: Task[];
  task: string;
  // eslint-disable-next-line @typescript-eslint/no-empty-function

  // Constructor to initialize the component and inject the TaskService
  constructor(
    private taskService: TaskService,
  ) {
    this.tasks = [];
    this.task = '';
  }
  title = 'task-ui';

  // Fetch tasks from the server when the component is initialized
  ngOnInit() {
    this.taskService.getTasks().subscribe((data) => {
      console.log(data);
      this.tasks = data as Task[];
    });
  }

  // Add a new task to the server and clear the task input
  addTask(task: string) {
    this.taskService.addTask(task).subscribe();
    this.task = '';
  }

  // Remove a task from the server by its ID
  removeTask(id: number) {
    this.taskService.removeTask(id).subscribe((data) => {
      console.log(data);
    });
  }
}