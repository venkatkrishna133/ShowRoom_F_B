import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { IFileData } from '../IFileData';
import { IUser } from '../IUser';
import { catchError } from 'rxjs/internal/operators/catchError';

// interface IFileItem {
//   id: number;
//   doc_id: string;
//   name: string;
//   status: string;
//   userid: string;
// }

// interface IUserItem {
//   userid: string;
//   email: string;
//   file_path: string;
//   password: string;
//   username: string;
// }
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
  date:string;
}

@Component({
  selector: 'app-admin-total-user',
  templateUrl: './admin-total-user.component.html',
  styleUrls: ['./admin-total-user.component.css'],
})
export class AdminTotalUserComponent  {
  // fileItems: IFileItem[] = [];
  // userItems: IUserItem[] = [];
  userFileDataList: IUserFileData[] = [];
  filteredItems: any[] = [];
  searchTerm: string = '';
  userId: string = '';
  docId: string = '';
  username: string = '';
  name: string = '';
  status: string = '';
  email: string = '';
  password: string = '';
  loading: boolean = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllData();
  }
  getAllData(): void {
    this.adminService.getAllData().subscribe((data: any[]) => {
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

      this.loading = false;
      this.search();
    });
  }
  refreshUserList(): void {
    // Re-fetch the data to refresh the user list
    this.getAllData();
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

  deleteUser(userId: number): void {
    this.adminService.sDeleteUser(userId).subscribe(
      (response) => {
        // Handle the successful deletion, e.g., refresh the user list
        this.refreshUserList();
      },
      (error) => {
        // Handle errors, e.g., display an error message
        console.error('Error deleting user:', error);
      }
    );
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
 
}
