import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  images = [
    {
      imageSrc: './assets/img/image1.jpg',
      imageAlt: 'angular',
    },
    {
      imageSrc: './assets/img/image3.webp',
      imageAlt: 'react',
    },
    {
      imageSrc: './assets/img/image2.jpg',
      imageAlt: 'vue',
    },
  ];

  file: string = '';

  title = 'userProfile';
  showFiller = false;
  show = true;
  showMenu = true;
  showprofile = true;
  userDasName: string | null | undefined;
  userData: any;
  header = 'User Dashboard';
  ngOnInit() {
    this.userData = this.userService.getUser();
    this.userDasName = this.userData.username;
  }

  applicationTracking() {
    this.router.navigate(['/applicationTracking']);
  }
  navDasboard() {
    this.router.navigate(['/dashboard']);
  }
  navProfile() {
    console.log('hhh');
    this.router.navigate(['/appProfilePage']);
    // if (this.showprofile === false) {

    // } else {
    //   this.router.navigate(['/dashboard']);
    // }
  }
  imageUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Set the image URL to display the selected image
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
