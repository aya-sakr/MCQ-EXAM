import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  type: string = 'student';
  UsersLogin: any[] = [];

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userLogin();
    this.getAllUsers();
  }
  userLogin() {
    this.loginForm = this.fb.group({
      type: [this.type],
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }
  changeRole(event: any) {
    this.type = event.value;
    this.getAllUsers();
  }
  getAllUsers() {
    this.service.getAllUsers(this.type).subscribe((res: any) => {
      this.UsersLogin = res;
    });
  }
  submit() {
    let index = this.UsersLogin.findIndex(
      (item) =>
        item.email == this.loginForm.value.email &&
        item.password == this.loginForm.value.password
    );

    if (index == -1) {
      alert('الايميل أو الرقم السري غير صحيح');
    } else {
      const model = {
        username: this.UsersLogin[index].username,
        userId: this.UsersLogin[index].id,
        role: this.type,
      };

      this.service.login(model).subscribe((res: any) => {
        this.service.user.next(res);
        alert('تم تسجيل الدخول بنجاح');
        this.router.navigate(['/subjects']);
      });
    }
  }
}
