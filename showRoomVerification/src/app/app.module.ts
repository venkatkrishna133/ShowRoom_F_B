import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninSignupComponent } from './signin-signup/signin-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  FacebookLoginProvider,
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { CarouselUserComponent } from './carousel-user/carousel-user.component';
import { CustomSidenavComponent } from './custom-sidenav/custom-sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScrollingComponent } from './scrolling/scrolling.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ForgetPasswordEnterComponent } from './forget-password-enter/forget-password-enter.component';
import { UploadUserDocumentComponent } from './upload-user-document/upload-user-document.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminTotalUserComponent } from './admin-total-user/admin-total-user.component';
import { FilterPipe } from './filter.pipe';
import { AuthUserGuard } from './auth-user.guard';
import { AdminAuthGuard } from './admin-auth.guard';
import { AdminCutomSidenavComponent } from './admin-cutom-sidenav/admin-cutom-sidenav.component';
import { PendingadminComponent } from './pendingadmin/pendingadmin.component';
import { ApprovedAdminComponent } from './approved-admin/approved-admin.component';
import { RejectAdminComponent } from './reject-admin/reject-admin.component';
import { ApplicationTrackingComponent } from './application-tracking/application-tracking.component';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { NotificationService } from './notification.service';
@NgModule({
  declarations: [AppComponent, SigninSignupComponent, CarouselUserComponent, CustomSidenavComponent, DashboardComponent, ScrollingComponent, ProfilePageComponent, ForgetPasswordComponent, ForgetPasswordEnterComponent, UploadUserDocumentComponent, DashboardAdminComponent, AdminProfileComponent, AdminTotalUserComponent, FilterPipe, AdminCutomSidenavComponent, PendingadminComponent, ApprovedAdminComponent, RejectAdminComponent, ApplicationTrackingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    LayoutModule,
    DragDropModule,
    MatTreeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    AppRoutingModule,
  ],
  providers: [
    AuthUserGuard,AdminAuthGuard,NotificationService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('clientId'),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId'),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
