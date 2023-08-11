// Define a class named Task
export class Task {

  // Define properties for the task's title, description, and completion status
  title: string;
  description: string;
  completed: boolean = false;

  // Constructor for creating instances of the Task class
  constructor(title: string, description: string) {
    // Initialize the title and description properties using the constructor parameters
    this.title = title;
    this.description = description;
  }

}