import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRlService } from '../auth-rl.service';

@Component({
  selector: 'app-forget-password-enter',
  templateUrl: './forget-password-enter.component.html',
  styleUrls: ['./forget-password-enter.component.css'],
})
export class ForgetPasswordEnterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authRlService: AuthRlService
  ) {
    this.forgetFormPassword = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  forgetForm!: FormGroup;
  forgetFormPassword: FormGroup = new FormGroup({});
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  currentStep = 2;
  onForget() {}
  goToNextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (field === 'confirmPassword') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }
  onForgetPassword() {
    console.log(this.forgetFormPassword.value.email);
    console.log(this.forgetFormPassword.value.password);
    console.log(this.forgetFormPassword.value.confirmPassword);

    // Example: Call your service to post data
    this.authRlService.changePassword(this.forgetFormPassword.value).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
