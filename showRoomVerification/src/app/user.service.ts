import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: any;

  constructor() {}

  setUser(user: any): void {
    this.userData = user;
  }

  getUser(): any {
    return this.userData;
  }
}


//sessionStorage.setItem("Username")
// logout(){
// sessionStorage.removeItem("username")
// sessionStorage.removeItem("password")
// }