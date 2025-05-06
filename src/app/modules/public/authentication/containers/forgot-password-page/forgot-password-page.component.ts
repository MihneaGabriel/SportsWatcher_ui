import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthRoutes } from 'src/app/routes';
import emailjs from 'emailjs-com';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.scss',
  standalone: false,
})
export class ForgotPasswordPageComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  errorMessage!: string;
  authRoutes = AuthRoutes;

  constructor (
    private router: Router,
    private fb: FormBuilder,
    private resetPasswordService: AuthenticationService,
  ) {}

  async ngOnInit(){
    this.fb = new FormBuilder();
    this.resetPasswordForm = this.resetPassword()
  }

  async submit() {
    this.resetPasswordForm.markAllAsTouched();
    emailjs.init('Nvr0JDhl_vDM7I_ij')
    const email = this.resetPasswordForm.get('email')?.value;

    if (email) {
      const tempPassword = await lastValueFrom(this.resetPasswordService.resetPassword(email));
      
      emailjs.send("service_c7amez5", "template_zsdch77", {
        email: email,
        tempPassword: tempPassword
      }).then(() => {
        console.log('Email sent successfully');
        this.router.navigate([this.authRoutes.login]);
      }).catch((error) => {
        console.error('Error sending email:', error);
      });
    } else {
        this.errorMessage = 'Please provide a valid email address.';
    }
  }

  resetPassword() {
    return this.fb.group({
      email: new FormControl(null, [Validators.required])
    })
  }

}
