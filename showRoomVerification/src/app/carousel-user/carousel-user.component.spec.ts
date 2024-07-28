import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselUserComponent } from './carousel-user.component';

describe('CarouselUserComponent', () => {
  let component: CarouselUserComponent;
  let fixture: ComponentFixture<CarouselUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
