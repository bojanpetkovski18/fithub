import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ILoginUser } from '../../contracts/models';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>();
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private location: Location) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: ILoginUser = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.userService.login(loginData).subscribe(
        response => {
          this.userService.getUserInfo(loginData.username).subscribe((user) => {
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('username', user.username);
            sessionStorage.setItem('role', user.role.toString());

            this.userService.updateUsername(user.username);
          })
          this.loginSuccess.emit();
          setTimeout(() => {
            this.router.navigate(['/']); 
          }, 1000);
        },
        error => {
          error ? this.errorMessage = 'Invalid username or password.' : '';
        }
      );
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']); 
  }
}
