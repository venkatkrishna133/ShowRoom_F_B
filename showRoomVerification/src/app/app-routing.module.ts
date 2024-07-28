import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninSignupComponent } from './signin-signup/signin-signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarouselUserComponent } from './carousel-user/carousel-user.component';
import { CustomSidenavComponent } from './custom-sidenav/custom-sidenav.component';
import { ScrollingComponent } from './scrolling/scrolling.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ForgetPasswordEnterComponent } from './forget-password-enter/forget-password-enter.component';
import { UploadUserDocumentComponent } from './upload-user-document/upload-user-document.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminTotalUserComponent } from './admin-total-user/admin-total-user.component';
import { AuthUserGuard } from './auth-user.guard';
import { PendingadminComponent } from './pendingadmin/pendingadmin.component';
import { ApprovedAdminComponent } from './approved-admin/approved-admin.component';
import { RejectAdminComponent } from './reject-admin/reject-admin.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { ApplicationTrackingComponent } from './application-tracking/application-tracking.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin-signup', pathMatch: 'full' },
  { path: 'signin-signup', component: SigninSignupComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'forget-password-enter', component: ForgetPasswordEnterComponent },
  { path: 'app', component: ApplicationTrackingComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'appProfilePage',
    component: ProfilePageComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'uploadUser',
    component: UploadUserDocumentComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'applicationTracking',
    component: ApplicationTrackingComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'dashboardAdmin',
    component: DashboardAdminComponent,
  },
  { path: 'adminProfilePage', component: AdminProfileComponent },
  {
    path: 'totalUserDetails',
    component: AdminTotalUserComponent,
  },
  {
    path: 'pendingAdmin',
    component: PendingadminComponent,
  },
  {
    path: 'approvedAdmin',
    component: ApprovedAdminComponent,
  },
  {
    path: 'rejectedAdmin',
    component: RejectAdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
