import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject();

  constructor(private http: HttpClient) {}
  userData(model: any) {
    return this.http.post(environment.apiBase + 'student ', model);
  }
  getAllUsers(type: string) {
    return this.http.get(environment.apiBase + type);
  }
  getStudent(id:number) {
    return this.http.get(`${environment.apiBase}student/${id}`);
  }
  updateStudent(id:number,model:any) {
    return this.http.put(`${environment.apiBase}student/${id}`,model);
  }
  login(modele: any) {
    return this.http.put(environment.apiBase + 'login/1', modele);
  }
  getRole() {
    return this.http.get(environment.apiBase + 'login/1');
  }
}
