import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCutomSidenavComponent } from './admin-cutom-sidenav.component';

describe('AdminCutomSidenavComponent', () => {
  let component: AdminCutomSidenavComponent;
  let fixture: ComponentFixture<AdminCutomSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCutomSidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCutomSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
