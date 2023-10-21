import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadProfileImageComponent } from './file-upload-profile-image.component';

describe('FileUploadProfileImageComponent', () => {
  let component: FileUploadProfileImageComponent;
  let fixture: ComponentFixture<FileUploadProfileImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadProfileImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadProfileImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
