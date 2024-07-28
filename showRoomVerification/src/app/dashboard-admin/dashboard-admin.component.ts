import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRlService } from '../auth-rl.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
})
export class DashboardAdminComponent {
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private http: HttpClient,
    private profileService: AuthRlService
  ) {}

  profileImageUrl!: string;
  onSubmit() {
    this.route.navigate(['/profile-page']);
  }
  onUser() {
    this.route.navigate(['/totalUserDetails']);
  }
  onUpload() {}
}
