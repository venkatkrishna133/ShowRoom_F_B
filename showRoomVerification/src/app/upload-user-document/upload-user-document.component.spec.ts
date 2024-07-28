import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadUserDocumentComponent } from './upload-user-document.component';

describe('UploadUserDocumentComponent', () => {
  let component: UploadUserDocumentComponent;
  let fixture: ComponentFixture<UploadUserDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadUserDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadUserDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
