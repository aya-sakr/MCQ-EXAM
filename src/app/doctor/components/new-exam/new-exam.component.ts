import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { DoctorService } from '../../services/doctor.service';



@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss'],
})
export class NewExamComponent implements OnInit {
  name = new FormControl('');
  QuestionForm!: FormGroup;
  questionArray: any[] = [];
  correctAnswer: any;
  open: boolean = false;
  subjectName: any;
  stepperIndex: number = 0;
  openLastTap:boolean=false
  id:number=0
  constructor(
    private fb: FormBuilder,
    private service: DoctorService
  ) {}

  ngOnInit(): void {
    this.creatForm();
  }
  openTap() {
    if (this.name.value == '') {
      alert('يرجي ادخال اسم المادة');
    } else {
      this.open = true;

      this.subjectName = this.name.value;
    }
    if (this.open) {
      this.stepperIndex = 1;
    }
  }
  creatForm() {
    this.QuestionForm = this.fb.group({
      questions: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required],
      answer4: ['', Validators.required],
    });
  }
  correctValue(event: any) {
    this.correctAnswer = event.value;
  }
  saveData() {
    const model = {
      question: this.QuestionForm.value.questions,
      answer1: this.QuestionForm.value.answer1,
      answer2: this.QuestionForm.value.answer2,
      answer3: this.QuestionForm.value.answer3,
      answer4: this.QuestionForm.value.answer4,
      rightAnswer: this.QuestionForm.value[this.correctAnswer],
    };
    if (this.correctAnswer) {
      this.questionArray.push(model);
      this.QuestionForm.reset();
    } else {
      alert('يرجي ادخال الاجابة الصحيحة'

      );
    }
  }
  DeletQues() {
    this.QuestionForm.reset();
  }
  canceled() {
    this.QuestionForm.reset();
    this.stepperIndex = 0;
    this.subjectName = '';
    this.name.reset();
    console.log(this.questionArray);
  }
  submit() {
    let model = {
      name: this.subjectName,
      questions:this.questionArray
    };
    if(this.openLastTap == false){
      this.service.creatQuestions(model).subscribe((res: any) => {
        this.openLastTap=true
        this.id=res.id
        


      });

    }

    if(this.openLastTap){
      this.stepperIndex= 2

    }
  }
  omit(i:number){

    this.questionArray.splice(i,1)
    let model = {
      name: this.subjectName,
      questions:this.questionArray
    }
    this.service.updateQuestion(model,this.id).subscribe((res:any)=>{
      alert('تم حذف السوال بنجاح')

    })

  }
}
