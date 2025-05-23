import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthRoutes, SecuredAppRoutes } from 'src/app/routes';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { User } from '../models/user.model';

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
    private loginService: AuthenticationService,
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
        next: (data) => {
            const user: User = {
              id: data.userId,
              username: data.username,
            };

            this.loginService.setLogin(user);
            this.router.navigate([this.homeRoutes.Home.root.url]);
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
