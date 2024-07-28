import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from './IUser';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root',
})
export class AuthRlService {
  
  constructor(private http: HttpClient) {}

  private url: string = 'http://localhost:8080/apiShowRoomEntity';

  regPost(register: any): Observable<IUser[]> {
    return this.http
      .post<IUser[]>(`${this.url}/register`, register)
      .pipe(catchError(this.errorHandler));
  }

  loginPost(login: any): Observable<IUser[]> {
    return this.http
      .post<IUser[]>(`${this.url}/login`, login)
      .pipe(catchError(this.errorHandler));
  }

  forgetMail(resetpassword: any): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.url}/resetpassword`, resetpassword)
      .pipe(catchError(this.errorHandler));
  }

  changePassword(changepassword: any): Observable<IUser> {
    return this.http
      .put<IUser>(`${this.url}/changepassword`, changepassword)
      .pipe(catchError(this.errorHandler));
  }

  uploadFileName(formData: FormData): Observable<any> {
    return this.http
      .post<any>(`${this.url}/upload`, formData)
      .pipe(catchError(this.errorHandler));
  }

  uploadDoc(formData: FormData): Observable<any> {
    return this.http
      .post<any>(`${this.url}/uploadDocument`, formData)
      .pipe(catchError(this.errorHandler));
  }

  getAllData(userId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.url}/userData/${userId}`) // Update the URL to include userId as a path parameter
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error('error 404'));
  }
}
