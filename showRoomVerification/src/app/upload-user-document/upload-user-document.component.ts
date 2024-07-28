import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthRlService } from '../auth-rl.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../user.service';

declare var Razorpay: any;
@Component({
  selector: 'app-upload-user-document',
  templateUrl: './upload-user-document.component.html',
  styleUrls: ['./upload-user-document.component.css'],
})
export class UploadUserDocumentComponent {
  documentPreviewUrl: any;
  constructor(private http: HttpClient, private userService: UserService) {}
  selectedFile: File | null = null;
  apiEndpoint = 'http://localhost:8080/apiShowRoomEntity/uploadDocument';
  documentUuid = 'shortUUID';
  documentPath = `${this.apiEndpoint}/assets/${this.documentUuid}`;
  iframeElement: HTMLIFrameElement | null = null;
  payButtonDisabled = true;

  ngAfterViewInit() {
    this.iframeElement = document.getElementById(
      'dynamicIframe'
    ) as HTMLIFrameElement;
    if (this.iframeElement) {
      this.iframeElement.src = this.documentPath;
    }
  }

  enablePayButton() {
    this.payButtonDisabled = false;
  }
  userData: any;
  userId:any;
  onFileSelected(event: any): void {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      this.selectedFile = file;
    } else {
      console.error('No file selected.');
    }
    this.userData= this.userService.getUser();
    this.userId=this.userData.id;
    // console.log(this.userId);
    

  }
  postFilePath(filePath: string): Observable<any> {
    const body = { documentPath: filePath }; // Assuming 'documentPath' is the field name you want to post
    return this.http
      .post<any>('http://localhost:8080/apiShowRoomEntity/uploadDocument', body)
      .pipe(catchError(this.errorHandler));
  }

  uploadFile(): void {
    console.log('Uploading file...');

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('userId', this.userId);

      // Replace 'your-upload-endpoint' with the actual endpoint URL for file upload
      this.http
        .post<any>(
          'http://localhost:8080/apiShowRoomEntity/uploadDocument',
          formData
        )
        .subscribe(
          (response) => {
            alert('file uploaded  successfully');
            console.log('File uploaded successfully:', response);
          },
          (error) => {
            console.error('Error uploading file: ', error);
          }
        );
    } else {
      console.error('No file selected.');
    }
    this.enablePayButton();
  }

  previewDocument() {}

  amount = 1000000;

  // payment
  paynow() {
    alert('payment');
    const RozarpayOptions = {
      description: 'Payment Page',
      currency: 'INR',
      amount: this.amount * 100,
      name: 'SM',
      key: 'rzp_test_VJ7E3VTXd0AEde',
      handler: async (response: any) => {
        const ps = response.razorpay_payment_id;
        if (ps) {
          window.alert('succes');
        } else {
          window.alert('failure');
        }
        console.log('passed');
      },
      prefill: {
        name: 'shri meenatchi',
        email: 'shri02@gmail.com',
        phone: '9487392030',
      },
      theme: {
        color: '#34989a',
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        },
        onprogress: () => {
          console.log('process');
        },
      },
    };

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
    };
    const failureCallback = (e: any) => {
      console.log(e);
    };
    Razorpay.open(RozarpayOptions, successCallback, failureCallback);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error('error 404'));
  }
}

