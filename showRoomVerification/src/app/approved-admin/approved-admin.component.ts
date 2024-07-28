import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUpdateFileData } from '../IUpdateFileData';
import { AdminService } from '../admin.service';

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
  selector: 'app-approved-admin',
  templateUrl: './approved-admin.component.html',
  styleUrls: ['./approved-admin.component.css'],
})
export class ApprovedAdminComponent {
  // approvedDocument: InSample[] = [];
  approvedShows: any;
  selectedIds: string[] = [];

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {
    // Initialize the FormGroup using FormBuilder
    this.docStatusForm = this.formBuilder.group({
      // Define form controls here (if any)
      status: [''], // Example control (you might need to adjust this based on your requirements)
    });
  }

  docStatusForm: FormGroup = new FormGroup({});
  ngOnInit(): void {
    this.getAllData();
  }

  searchTerm: string = '';
  userFileDataList: IUserFileData[] = [];
  filteredItems: any[] = [];
  loading: boolean = true;

  getAllData(): void {
    this.adminService.getAllUserDocData().subscribe((data: any[]) => {
      // Iterate over each item in the data array
      data.forEach((item) => {
        // Create a new IUserFileData object combining user and file data
        const userFileData: IUserFileData = {
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
        };
        // Push the combined userFileData to the userFileDataList
        this.userFileDataList.push(userFileData);
      });
      console.log(this.userFileDataList);

      // Filter the userFileDataList to only include items with "Approved" status
      this.filteredItems = this.userFileDataList.filter(
        (item) => item.status === 'approved'
      );

      this.loading = false;
      this.search();
    });
  }

  search(): void {
    if (!this.searchTerm) {
      // If the search term is empty, reset the filtered items to the entire list
      this.filteredItems = this.userFileDataList.slice();
    } else {
      // If there is a search term, filter the items based on the search term
      this.filteredItems = this.userFileDataList.filter((item) =>
        this.matchesSearchTerm(item)
      );
    }
  }

  matchesSearchTerm(item: IUserFileData): boolean {
    // Convert the search term and item properties to lowercase for case-insensitive comparison
    const searchTermLowerCase = this.searchTerm.toLowerCase();
    const usernameLowerCase = item.username ? item.username.toLowerCase() : '';
    const userIdLowerCase = item.userId.toString().toLowerCase(); // Convert userId to string for comparison
    const docIdLowerCase = item.docId ? item.docId.toLowerCase() : ''; // Check if docId is null before converting to lowercase

    return (
      usernameLowerCase.includes(searchTermLowerCase) ||
      userIdLowerCase.includes(searchTermLowerCase) ||
      docIdLowerCase.includes(searchTermLowerCase)
    );
  }

  changeDocStatus(userId: any) {
    const selectedStatus = this.docStatusForm.value.status;
    console.log(selectedStatus);
    // const fileData: IUpdateFileData = { userId, status: selectedStatus };

    // this.adminService.updateStatusDocument(fileData).subscribe(
    //   (response: any) => {
    //     console.log(response);
    //   },
    //   (error: any) => {
    //     console.error(error);
    //   }
    // );
  }

  getStatusClass(documentStatus: string): string {
    if (!documentStatus) {
      return 'status-white'; // or any other class for white
    }
    switch (documentStatus.toLowerCase()) {
      case 'rejected':
        return 'status-red';
      case 'approved':
        return 'status-blue';
      case 'pending':
        return 'status-orange';
      default:
        return '';
    }
  }

  showContent: boolean = false;

  toggleContent() {
    this.showContent = !this.showContent;
  }
}