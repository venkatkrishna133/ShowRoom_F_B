import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthRlService } from '../auth-rl.service';
import { UserService } from '../user.service';
import { AuthenticationService } from '../authentication.service';
import { FileDataService } from '../file-data.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-signin-signup',
  templateUrl: './signin-signup.component.html',
  styleUrls: ['./signin-signup.component.css'],
})
export class SigninSignupComponent implements OnInit {
  constructor(
    private authService: SocialAuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,

    private formBuilder: FormBuilder,
    private authRlService: AuthRlService,
    private elementRef: ElementRef,
    private router: Router,
    private userService: UserService,
    private fileDataService: FileDataService,
    private sessionAuth: AuthenticationService,
    
  ) {
    this.matIconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'path/to/google-icon.svg'
      )
    );
    // Initialize signInForm with form controls
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    // Initialize signUpForm with form controls
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  refreshToken(): void {
    this.authService.refreshAccessToken(GoogleLoginProvider.PROVIDER_ID);
  }

  signInForm: FormGroup = new FormGroup({});
  signUpForm: FormGroup = new FormGroup({});

  adminMail = 'admin@gmail.com';
  adminPassword = 'Tharini@02';
  isSignUpMode: boolean = false;
  hide = true;
  user: SocialUser = new SocialUser();
  loggedIn: boolean = false;

  // ngOnInit() {

  // }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });

    // @ts-ignore
    google.accounts.id.initialize({
      client_id:
        '524267340045-hkg8e23dqk1od73bsnkhrj1qgv0lq20g.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById('google-button'),
      { theme: 'outline', size: 'large', width: '100%' }
    );
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => {});

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
    this.signInForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ]),
    });

    this.signUpForm = this.formBuilder.group(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9]+$'),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          ),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/),
          Validators.minLength(8),
          Validators.maxLength(16),
        ]),
        confirmpassword: new FormControl('', [Validators.required]),
      },
      {
        validators: this.passwordMatchValidator(
          'password',
          'confirmpassword'
        ) as any,
      }
    );

    this.isSignUpMode = false;
    this.toggleMode();
  }
  async handleCredentialResponse(response: any) {
    // Here will be your response from Google.
    console.log(response, 'hi');
    const userEmail = response?.profileObj?.email;
    this.authRlService.loginPost(userEmail).subscribe((data) => {
      console.log(data);
    });
  }

  toggleMode() {
    this.isSignUpMode = !this.isSignUpMode;
    const container = this.elementRef.nativeElement.querySelector('.container');
    container.classList.toggle('sign-up-mode', this.isSignUpMode);
  }

  passwordMatchValidator(password: string, confirmpassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmpasswordControl = formGroup.controls[confirmpassword];

      if (
        confirmpasswordControl.errors &&
        !confirmpasswordControl.errors['mustMatch']
      ) {
        return;
      }

      if (passwordControl.value !== confirmpasswordControl.value) {
        confirmpasswordControl.setErrors({ mustMatch: true });
      } else {
        confirmpasswordControl.setErrors(null);
      }
    };
  }

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
    const visibilityMessage = this.hide
      ? 'Password is now hidden'
      : 'Password is now visible';
  }

  onSignInSubmit() {
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;

    // Check if the entered email and password match the admin credentials
    if (email === this.adminMail && password === this.adminPassword) {
      // Navigate to dashboardAdmin
      this.router.navigate(['/dashboardAdmin']);
      return;
    }

    // Example: Call your service to post data
    this.sessionAuth.login(email, password).subscribe(
      (response: any) => {
        this.userService.setUser(response);

        this.router.navigate(['/dashboard']);
        console.log('fhf', response);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onSignUpSubmit() {
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;

    if (!this.isEmailValid(email)) {
      this.openErrorPopup('Please enter a valid email address');
      return;
    }

    if (!this.isPasswordValid(password)) {
      this.openErrorPopup(
        'Password must contain at least one digit, one lowercase letter, one uppercase letter, and be 8-16 characters long'
      );
      return;
    }
    // Handle sign-up form submission here
    console.log('Sign-up form submitted!');
    // Example: Call your service to post data
    this.authRlService.regPost(this.signUpForm.value).subscribe(
      (response: any) => {
        alert('Register successfully!');
        console.log(response);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  isPasswordValid(password: string): boolean {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    return passwordRegex.test(password);
  }

  openErrorPopup(errorMessage: string) {
    alert(JSON.stringify(errorMessage));
  }

  passwordsMatch(): boolean {
    const password = this.signUpForm.value.password;
    const confirmPassword = this.signUpForm.value.confirmpassword;
    return password === confirmPassword;
  }

  navigateToForgetPasswordPage() {
    this.router.navigate(['/forget-password']);
  }
}
