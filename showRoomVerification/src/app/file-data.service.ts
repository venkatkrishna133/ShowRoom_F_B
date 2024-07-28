import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileDataService {
  userData: any;

  constructor() {}

  setFileData(user: any): void {
    this.userData = user;
  }

  getFileData(): any {
    return this.userData;
  }
}