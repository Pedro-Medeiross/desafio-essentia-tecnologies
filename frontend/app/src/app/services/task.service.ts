import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task } from '../../Types/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiURL = 'http://localhost:3000/task/all';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<{ message: string; tasks: Task[] }>(this.apiURL).pipe(
      map(response => response.tasks) // Extrai o array de tarefas do objeto de resposta
    );
  }
}
