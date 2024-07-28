import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IUser } from './IUser';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { IFileData } from './IFileData';
import { IUpdateFileData } from './IUpdateFileData';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  private url: string = 'http://localhost:8080/apiShowRoomEntity';

  // getAllData(): Observable<any[]> {
  //   const usersEndpoint = `${this.url}/users`;
  //   const fileDataEndpoint = `${this.url}/filedata`;

  //   return forkJoin([
  //     this.http.get<IUser[]>(usersEndpoint),
  //     this.http.get<IFileData[]>(fileDataEndpoint),
  //   ]).pipe(catchError(this.errorHandler));
  // }
  getAllData(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.url}/fileData`)
      .pipe(catchError(this.errorHandler));
  }
  sDeleteUser(userId: any): Observable<any> {
    const url = `${this.url}/deleteUsers/${userId}`; // Construct the URL with the userId
    return this.http.delete<any>(url).pipe(catchError(this.errorHandler));
  }
  getAllUserDocData(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.url}/pendingFileData`)
      .pipe(catchError(this.errorHandler));
  }

  updateStatusDocument(fileData: IUpdateFileData): Observable<any[]> {
    return this.http
      .put<any[]>(`${this.url}/updateDocumentStatus`, fileData)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error('error 404'));
  }
}
