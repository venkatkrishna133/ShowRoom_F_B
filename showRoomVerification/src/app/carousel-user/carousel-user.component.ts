import { Component, Input, OnInit } from '@angular/core';

interface carouselImage {
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-carousel-user',
  templateUrl: './carousel-user.component.html',
  styleUrls: ['./carousel-user.component.css'],
})
export class CarouselUserComponent implements OnInit {
  ngOnInit(): void {
    setInterval(() => {
      this.showNextImage();
    }, 4000); // Change image every 4 seconds
  }

  showNextImage() {
    this.selectedIndex = (this.selectedIndex + 1) % this.images.length;
  }
  selectedIndex = 0;
  @Input() images: carouselImage[] = [];
  @Input() indicators = true;
  @Input() controls = true;
  selectImage(index: number): void {
    this.selectedIndex = index;
  }
  onPrevClick() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }
  onNextClick() {
    if (this.selectedIndex < this.images.length - 1) {
      this.selectedIndex++;
    } else {
      this.selectedIndex = 0;
    }
  }
}

