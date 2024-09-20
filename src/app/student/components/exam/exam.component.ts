import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from 'src/app/doctor/services/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {
  id: any;
  subjectArray: any;
  userInfo:any
  total:number=0
  result:boolean=false
  constructor(private route: ActivatedRoute, private docServ: DoctorService,private authService:AuthService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSubject();
     this.getRole()
  }

  ngOnInit(): void {}

  getSubject() {
    this.docServ.getSubjectbyID(this.id).subscribe((res: any) => {
      this.subjectArray = res;
      
    });
  }
  getRole(){
    this.authService.getRole().subscribe((res:any)=>{
       this.userInfo=res
       console.log(this.userInfo)
    })

  }
  delet(index:number){
    this.subjectArray.questions.splice(index,1)
    this.docServ.deletSubject(this.id).subscribe((res:any)=>{
      alert('تم مسح السوال بنجاح')
    })

  }
  chane(event:any){
   let value = event.value;
    let questionIndex = event.source.name;
    this.subjectArray.questions[questionIndex].studentAnswer = value




  }
  getResult(){
    this.total =0
    for(let x in this.subjectArray.questions){
      if(this.subjectArray.questions[x].studentAnswer == this.subjectArray.questions[x].rightAnswer){
        this.total ++
        this.result = true


      }


    }


  }
}
