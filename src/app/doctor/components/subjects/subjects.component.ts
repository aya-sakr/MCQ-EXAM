import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
subjectsArray:any[]=[]
userLogin:any={}

  constructor(private docServ :DoctorService,private authServ:AuthService) { }

  ngOnInit(): void {
     this.getSubjects()
      this.getUserLogin()

  }

  getSubjects(){
    this.docServ.getAllSubjects().subscribe((res:any)=>{
      this.subjectsArray =res
   



    })
  }
  getUserLogin(){
    this.authServ.getRole().subscribe((res:any)=>{
      this.userLogin =res


    })
  }
  deletSubject(index:number){
    this.subjectsArray.splice(index,1)
    let id = this.subjectsArray[index].id
    this.docServ.deletSubject(id).subscribe((res:any)=>{
      alert('تم حذف المادة بنجاح')
    }

    )

  }
}
