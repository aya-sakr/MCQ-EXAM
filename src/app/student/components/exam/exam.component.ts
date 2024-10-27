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
  userInfo: any;
  user: any;

  vaildUser:boolean=true;
  userSubject:any[]=[];
  total: number = 0;
  result: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private docServ: DoctorService,
    private authService: AuthService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSubject();
    this.getRole();
  }

  ngOnInit(): void {}

  getSubject() {
    this.docServ.getSubjectbyID(this.id).subscribe((res: any) => {
      this.subjectArray = res;
      let n = 100
      



    });
  }
  getRole() {
    this.authService.getRole().subscribe((res: any) => {
      this.userInfo = res;
      this.getUserData();
    });
  }

  getUserData() {
    this.authService.getStudent(this.userInfo.userId).subscribe((res: any) => {
      this.user = res;
      this.userSubject = res?.subject ? res?.subject : []
      this.checkVaild()


    });
  }

  delet(index: number) {
    this.subjectArray.questions.splice(index, 1);
    this.docServ.deletSubject(this.id).subscribe((res: any) => {
      alert('تم مسح السوال بنجاح');
    });
  }
  chane(event: any) {
    let value = event.value;
    let questionIndex = event.source.name;
    this.subjectArray.questions[questionIndex].studentAnswer = value;
    console.log(value);
  }
  checkVaild(){
   for(let x in this.userSubject){
    if(this.userSubject[x].id == this.id){
      alert('لقد انجزت هذا الاختبار مسبقا')
      this.vaildUser = false

    }

   }
   console.log(this.vaildUser)
  }
  getResult() {
    this.total = 0;
    for (let x in this.subjectArray.questions) {
      if (
        this.subjectArray.questions[x].studentAnswer ==
        this.subjectArray.questions[x].rightAnswer
      ) {
        this.total++;


      }
      this.result = true;



    }
    this.userSubject.push({
      name:this.subjectArray.name,
      id: this.id,
      degree: this.total

    })
    const model = {
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      subject: this.userSubject
    };
    this.authService.updateStudent(this.userInfo.userId,model).subscribe((res:any) =>{
      alert('تم تسجيل المادة بنجاح')
    })
  }
}
