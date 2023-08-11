import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  // Object to hold the properties of the new task
  newTask: any = {
    title: '',
    description: '',
    completed: false,
  };

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    // Component initialization logic
  }

  // Method to add a new task
  addTask(): void {
    // Check if the title and description are not empty
    if (!this.newTask.title || !this.newTask.description) {
      return; // Exit the method if title or description is empty
    }

    // Call the taskService to add the new task
    this.taskService.addTask(this.newTask).subscribe((task) => {
      // Clear the newTask object after adding a task
      this.newTask = {
        title: '',
        description: '',
        completed: false,
      };
    });
  }
}
