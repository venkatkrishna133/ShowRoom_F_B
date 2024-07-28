import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';
import { AuthRlService } from '../auth-rl.service';

interface DocGen {
  dUsername: string;
  dEmail: string;
  dStatus: string;
  dDate: string;
}
interface IUserFileData {
  userId: number;
  username: string;
  email: string;
  password: string;
  filePath: string;
  docId: string;
  name: string;
  type: string;
  pdfFilePath: string;
  status: string;
  date: string;
}


@Component({
  selector: 'app-application-tracking',
  templateUrl: './application-tracking.component.html',
  styleUrls: ['./application-tracking.component.css'],
})
export class ApplicationTrackingComponent implements OnInit {
  constructor(
    private authRlService: AuthRlService,
    private userService: UserService
  ) {}
  userFileDataList: IUserFileData[] = [];

  userData: any;
  userIdd: any = '';
  loading: boolean = true;
  ngOnInit(): void {
    console.log('hiiiiiiiiiii');
    this.userData = this.userService.getUser();
    console.log(this.userData);
    this.userIdd = this.userData.id;
    console.log(this.userIdd);

    this.getAllData();
  }
  getAllData(): void {
    this.authRlService.getAllData(this.userIdd).subscribe((data: any[]) => {
      this.userFileDataList = data.map((item) => ({
        userId: item[0].id,
        username: item[0].username,
        email: item[0].email,
        password: item[0].password,
        filePath: item[0].filePath,
        docId: item[1] ? item[1].docId : null,
        name: item[1] ? item[1].name : null,
        type: item[1] ? item[1].type : null,
        pdfFilePath: item[1] ? item[1].pdfFilePath : null,
        status: item[1] ? item[1].status : null,
        date: item[1] ? item[1].date : null,
      }));

      console.log(this.userFileDataList, 'Filtered data'); // Check the filtered data in console

      this.loading = false;
    });
  }
  generatePDF(): void {
    const doc = new jsPDF();

    // Add a custom logo or image
    const logo = new Image();
    logo.src = '/assets/img/image14.png'; // Path to your logo image
    doc.addImage(logo, 'PNG', 10, 10, 40, 40); // Add the logo at position (10, 10) with size 40x40

    // Add styled text
    doc.setFontSize(18);
    doc.setTextColor(255, 0, 0); // Set text color to red
    doc.text('Document Status', 10, 60);

    // Add a colored rectangle as a background
    doc.setFillColor(200, 200, 200); // Set fill color to gray
    doc.rect(15, 70, 180, 35, 'F'); // Add a filled rectangle at position (10, 70) with size 180x30

    // Add text with different styles
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Set text color back to black

    // Iterate over each item in the userFileDataList
    let yPos = 90; // Initial vertical position
    this.userFileDataList.forEach((item) => {
      // Set font style to italic
      doc.setFont('italic'); // Set font style to italic
      doc.text(`Username: ${item.username}`, 15, yPos);

      // Reset font style to normal
      doc.setFont('normal'); // Reset font style to normal
      doc.text(`Email: ${item.email}`, 15, yPos + 10);

      // Add status and date data
      doc.text(`Status: ${item.status}`, 15, yPos + 20);
      doc.text(`Date: ${item.date}`, 15, yPos + 30);

      // Increase vertical position for the next item
      yPos += 50; // Adjust as needed for spacing
    });

    // Save the document
    doc.save('document.pdf');
  }
}
