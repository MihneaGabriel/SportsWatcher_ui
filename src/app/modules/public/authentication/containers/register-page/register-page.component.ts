import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthRoutes } from 'src/app/routes';

@Component({
  selector: 'sportwatcher-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  standalone: false
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  fb!: FormBuilder;
  passwordVisible = false;
  passwordMismatch = false;
  authRoutes = AuthRoutes;
  
  async ngOnInit(){
    this.fb = new FormBuilder();
    this.registerForm = this.createRegisterForm();
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
