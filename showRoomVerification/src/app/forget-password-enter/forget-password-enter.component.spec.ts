import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordEnterComponent } from './forget-password-enter.component';

describe('ForgetPasswordEnterComponent', () => {
  let component: ForgetPasswordEnterComponent;
  let fixture: ComponentFixture<ForgetPasswordEnterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPasswordEnterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetPasswordEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
