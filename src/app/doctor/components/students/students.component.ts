import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  userSubject:any
  dataSource: any;
  thesubjects:any
  displayedColumns: any;
  subjectArray:any
  constructor(private autService:AuthService) {
    this.autService.getAllUsers("student").subscribe((res:any)=>{
      console.log(res)
      this.userSubject=res?.map((student:any)=>{
        if(student.subject){
          return student.subject?.map((sub:any)=>{
            return {
              name:student.username,
              subjectName:sub.name,
              degree:sub.degree


            }
           })

        }else{
          return [{
            name:student.username,
            subjectName:"-",
            degree:"-"


          }]

        }


      })

     this.subjectArray=[]
    this.userSubject.forEach((element:any) => {
      element.forEach((item:any)=> {
        this.subjectArray.push({
          name:item.name,
          subjectName:item.subjectName,
          degree:item.degree

        })

      });

    });

      console.log(this.userSubject)
      console.log(this.subjectArray)


    })
    this.displayedColumns = ['position', 'name', 'subjectName', 'degree'];
  }

  ngOnInit(): void {}
}

