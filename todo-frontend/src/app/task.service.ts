import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/task';

  constructor(private http: HttpClient) { }

  // Fetch tasks from the server
  getTasks(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Add a new task to the server
  addTask(task: any): Observable<any> {
    return this.http.post(this.baseUrl, task);
  }

  // Remove a task from the server by ID
  removeTask(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }

  // Update a task on the server by ID
  updateTask(id: string, task: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, task);
  }

}
