import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../_models/project';
import { Observable } from 'rxjs';
import { ProjectPost } from '../_models/projectPost';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl + 'projects');
  }

  getProject(id): Observable<Project> {
    return this.http.get<Project>(this.baseUrl + 'projects/' + id);
  }

  addProject(project: ProjectPost) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(this.baseUrl + 'projects/', project, httpOptions);
  }
}
