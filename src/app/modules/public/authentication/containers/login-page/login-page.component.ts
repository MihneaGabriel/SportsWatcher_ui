import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthRoutes, SecuredAppRoutes } from 'src/app/routes';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'sportwatcher-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: false
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  passwordVisible = false;
  errorMessage!: string;
  authRoutes = AuthRoutes;
  homeRoutes = SecuredAppRoutes;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.fb = new FormBuilder();
    this.loginForm = this.createLoginForm();
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  submit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.getRawValue()).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
            // Navigate to the secured app route on successful login
            this.router.navigate(['Home']);
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
    }
  }

  createLoginForm() {
    return this.fb.group({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }
}
