import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UserService } from '../user.service';
import { AuthenticationService } from '../authentication.service';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};
@Component({
  selector: 'app-custom-sidenav',
  templateUrl: './custom-sidenav.component.html',
  styleUrls: ['./custom-sidenav.component.css'],
})
export class CustomSidenavComponent implements OnChanges {
  constructor(
    private userService: UserService,
    private sessionAuth: AuthenticationService
  ) {}
  collapsed = new BehaviorSubject<boolean>(false);
  @Input() sidedash!: boolean;
  userDasName: string | null | undefined;
  userData: any;
  username: string = '';
  profileImageName: string = '';
  hi: string = 'hiiii';
  setName() {
    this.userData = this.userService.getUser();
    this.username = this.userData.username;
    this.profileImageName = this.userData.filePath;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sidedash']) {
      console.log('sidedash changed:', this.sidedash);
    }
  }

  profilePicSrc: string =
    'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg';

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  menuItems: MenuItem[] = [
    {
      icon: 'dashboard',
      label: 'dashboard',
      route: 'dashboard',
    },
    {
      icon: 'video_library',
      label: 'content',
      route: 'content',
    },
  ];

  getSidenavWidth() {
    return this.collapsed.value ? '65px' : '250px';
  }

  logout():void {
    this.sessionAuth.logout();
  }
}
