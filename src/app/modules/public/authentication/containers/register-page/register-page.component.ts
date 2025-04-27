import { TmplAstSwitchBlockCase } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthRoutes } from 'src/app/routes';
import { Nomenclature } from 'src/libs/models/nomenclator.model';
import { NomenclatureService } from 'src/libs/services/nomenclature/nomenclature.service';

@Component({
  selector: 'sportwatcher-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  standalone: false
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  countires : string[] = [];
  passwordVisible = false;
  passwordMismatch = false;
  authRoutes = AuthRoutes;

  constructor(
    private fb: FormBuilder,
    private nomenclature: NomenclatureService
  ) {}
  
  async ngOnInit(){
    this.fb = new FormBuilder();
    this.registerForm = this.createRegisterForm();

    this.nomenclature.getCountries().subscribe({
      next: countries => this.countires = countries.map(country => country.value),
      error: error => console.error('Error fetching countries:', error),
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // ngDoCheck() {
  //   this.registerForm.valueChanges.subscribe((value) => {
  //     console.log('Form changes:', value);
  //   });
  // }

  save() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value) {
      this.passwordMismatch = true;
      return;
    } else { this.passwordMismatch = false; }
 
    console.log('Form submitted:', this.registerForm?.getRawValue());
    if (this.registerForm.valid) {
      console.log('Form submitted:', this.registerForm?.getRawValue());
    }
  }

  createRegisterForm() {
    return this.fb.group({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
      region: new FormControl(null, [Validators.required]),
      promotions: new FormControl(false),
      termsAgreement: new FormControl(false, [Validators.requiredTrue]),
      ageConfirmation: new FormControl(false, [Validators.requiredTrue]),
    });

  }
}
