import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-admin-cutom-sidenav',
  templateUrl: './admin-cutom-sidenav.component.html',
  styleUrls: ['./admin-cutom-sidenav.component.css'],
})
export class AdminCutomSidenavComponent {
  documents = [
    { id: 1, status: 'approved' },
    { id: 2, status: 'pending' },
    { id: 3, status: 'rejected' },
    // Add more documents as needed
  ];

  filteredDocuments: { id: number; status: string }[] = [];

  searchQuery: string = '';

  constructor(private sessionAuth: AuthenticationService) {
    this.filteredDocuments = this.documents;
  }

  logout(): void {
    this.sessionAuth.logout();
  }

  search() {
    this.filteredDocuments = this.documents.filter(
      (document) =>
        document.id.toString().includes(this.searchQuery.toLowerCase()) ||
        document.status.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  //   searchQuery: string = '';
  // searchResults: string[] = [];

  // Function to handle the search logic
  // search(): void {
  //   // Perform your search logic here, for example, filtering an array
  //   // In this example, we're using a simple array as data
  //   this.searchResults = this.data.filter(item =>
  //     item.toLowerCase().includes(this.searchQuery.toLowerCase())
  //   );
  // }
  // // Sample data (replace with your actual data source)
  // data: string[] = ['Item 1', 'Item 2', 'Item 3', 'Another Item', 'Example Item'];
}
 