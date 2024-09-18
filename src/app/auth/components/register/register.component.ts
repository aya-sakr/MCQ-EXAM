import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  implements OnInit{
  userRegister!:FormGroup
  studentsAccount:any[]=[]
  constructor(private fb:FormBuilder,private service:AuthService,private router:Router){

  }
ngOnInit(): void {
  this.creatForm();
   this.getAllStudents()

}

  creatForm(){
    this.userRegister = this.fb.group({
      userName:['',Validators.required],
      email:['',Validators.email],
      password:['',Validators.required],
      confirmPassword:['',Validators.required]



    })

  }
  getAllStudents(){
    this.service.getAllUsers('student').subscribe((res:any)=>{
      this.studentsAccount = res
      console.log(this.studentsAccount)
    })
  }
  submit(){
  let model={
      username:this.userRegister.value.userName,
      email:this.userRegister.value.email,
      password: this.userRegister.value.password
    }
    let index = this.studentsAccount.findIndex((item)=>item.email == this.userRegister.value.email)
    console.log(index)
    if(index !== -1){
      alert('الايميل موجود مسبقا')

    }else{
      this.service.userData(model).subscribe((res:any)=>{
        alert("sucess register")
        this.router.navigate(['/subjects'])

        })

    }


  }

}
