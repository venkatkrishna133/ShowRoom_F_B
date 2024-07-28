import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRlService } from '../auth-rl.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authRlService: AuthRlService
  ) {
    this.forgetFormMail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  forgetForm!: FormGroup;
  forgetFormMail: FormGroup = new FormGroup({});
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  hide = true;
  ngOnInit(): void {
    this.forgetForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  currentStep = 1;
  steps = ['Verify email', 'set password'];

  onForget() {
    // Example: Call your service to post data
  }

  onForgetMail() {
    console.log(this.forgetFormMail.value.email);

    // Example: Call your service to post data
    this.authRlService.forgetMail(this.forgetFormMail.value).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (field === 'confirmPassword') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }
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

  finishProcess() {
    // Implement any logic you need when the process is finished
    console.log('Process finished!');
  }
}
