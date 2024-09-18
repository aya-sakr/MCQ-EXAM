import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  creatQuestions(model:any){
     return this.http.post(environment.apiBase + 'subject',model)
  }
  updateQuestion(model:any,id:number){
    return this.http.put(environment.apiBase + 'subject/'+id,model)

  }
  getAllSubjects(){
    return this.http.get(environment.apiBase + 'subject')
  }
  deletSubject(id:number){
     return this.http.delete(environment.apiBase+ 'subject/'+id )
  }
}
