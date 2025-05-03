import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AuthRoutes } from 'src/app/routes';
import { Nomenclature } from 'src/libs/models/nomenclator.model';
import { NomenclatureService } from 'src/libs/services/nomenclature/nomenclature.service';
import { RegisterForm } from '../models/register.model';
import { RegisterService } from 'src/app/shared/services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sportwatcher-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  standalone: false
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  countries : Nomenclature[] = [];
  passwordVisible = false;
  passwordMismatch = false;
  authRoutes = AuthRoutes;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private nomenclatureService: NomenclatureService,
    private registerService: RegisterService
  ) {}
  
  async ngOnInit(){
    this.fb = new FormBuilder();
    this.registerForm = this.createRegisterForm();

    this.countries = await lastValueFrom(this.nomenclatureService.getCountries());
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  save() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value) {
      this.passwordMismatch = true;
      return;
    } else { this.passwordMismatch = false; }
 
    if (this.registerForm.valid) {
      this.registerService.createAccount(this.registerForm.getRawValue()).subscribe({
        next: (response: RegisterForm) => {
          console.log('Account created successfully:', response);
          this.router.navigate([this.authRoutes.login]);
        },
        error: (error: any) => {
          console.error('Error creating account:', error);
            alert('An error occurred while creating the account. Please try again later.');
        }
      });
    }

  }

  createRegisterForm() {
    return this.fb.group({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      promotions: new FormControl(false),
      termsAgreement: new FormControl(false, [Validators.requiredTrue]),
      ageConfirmation: new FormControl(false, [Validators.requiredTrue]),
    });

  }
}
