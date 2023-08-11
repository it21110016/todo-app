import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})

export class TaskListComponent implements OnInit {
  tasks: any[] = []; // Array to store tasks

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks(); // Load tasks when the component is initialized
  }

  // Load tasks from the server
  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks; // Assign fetched tasks to the tasks array
    });
  }

  // Remove a task by its ID
  removeTask(task: any): void {
    this.taskService.removeTask(task._id).subscribe(() => {
      this.loadTasks(); // Refresh the task list after removing a task
    });
  }

  // Mark a task as completed
  markAsCompleted(task: any): void {
    if (!task.completed) {
      task.completed = true; // Mark the task as completed
      this.taskService.updateTask(task._id, task).subscribe(() => {
        this.loadTasks(); // Refresh the task list after marking as completed
      });
    }
  }

  // Add a new task
  addTask(task: any): void {
    this.taskService.addTask(task).subscribe(() => {
      this.loadTasks(); // Refresh the task list after adding a task
    });
  }
}
