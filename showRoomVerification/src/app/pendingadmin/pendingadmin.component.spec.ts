import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingadminComponent } from './pendingadmin.component';

describe('PendingadminComponent', () => {
  let component: PendingadminComponent;
  let fixture: ComponentFixture<PendingadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
