import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Employee } from '../app.component';
import { Subject } from 'src/models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  url = 'http://localhost:3000/subject';

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.url+'/all');
  }

  deleteSubject(id: String): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  } 

  addSubject(subject: Subject): Observable<any>{
    return this.http.post(this.url+'/', subject);
  }
  
  updateSubject(id:String, subject: Subject): Observable<any>{
    return this.http.put(this.url + '/'+id, subject);
  }
  eraseAllSubjects(): Observable<any>{
    return this.http.put(this.url,+'/eraseAll');
  }
}
