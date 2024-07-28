import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthRlService } from '../auth-rl.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authRlService: AuthRlService
  ) {
    this.changePwdForm = this.formBuilder.group({
      email: ['', Validators.required],
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  changePwdForm: FormGroup = new FormGroup({});
  username: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  profileImageName: string='';
  hidePassword: boolean = true;
  ngOnInit() {
    this.userData = this.userService.getUser();
    this.username = this.userData.username;
    this.email = this.userData.email;
    this.password = this.userData.password;
    this.profileImageName=this.userData.filePath;
  }
  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    }
  }
  userForm: any;
  isChangePasswordClicked = false;
  myForm: any = [];
  isselected = true;
  showpassword = false;
  header = 'User Dashboard';
  showFiller = false;
  show = true;
  showMenu = true;
  showprofile = true;
  userDasName: string | null | undefined;
  userData: any;
  checkedIsSelected() {
    console.log(this.isselected);
  }

  clickbtn() {
    this.showpassword = !this.showpassword;
  }
  profilePicSrc: string =
    'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg';
  fileData: any;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log(file.name);

      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userMail', this.email);
      this.authRlService.uploadFileName(formData).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
          // Handle any success logic here
        },
        (error) => {
          console.error('Error uploading file:', error);
          // Handle any error logic here
        }
      );
    }
  }
  setImg() {
    alert('hi');
  }
  onChangePwd() {
    console.log(this.changePwdForm.value.password);
    console.log(this.changePwdForm.value.email);

    // Example: Call your service to post data
    this.authRlService.changePassword(this.changePwdForm.value).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  onSubmit() {
    // Handle form submission logic here
    console.log(this.myForm.value);
  }
}
