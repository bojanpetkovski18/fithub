import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IRegisterUser, Role } from '../../contracts/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registerData: IRegisterUser =  {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        role: Role.Customer
      };

      this.userService.register(registerData).subscribe(
        response => {
          this.router.navigate(['/login']);
        },
        error => {
          this.router.navigate(['/login']);
        }
      );
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']); 
  }
}
