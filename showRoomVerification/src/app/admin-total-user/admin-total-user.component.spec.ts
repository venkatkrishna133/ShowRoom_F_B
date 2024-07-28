import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTotalUserComponent } from './admin-total-user.component';

describe('AdminTotalUserComponent', () => {
  let component: AdminTotalUserComponent;
  let fixture: ComponentFixture<AdminTotalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTotalUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTotalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
