import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectAdminComponent } from './reject-admin.component';

describe('RejectAdminComponent', () => {
  let component: RejectAdminComponent;
  let fixture: ComponentFixture<RejectAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
