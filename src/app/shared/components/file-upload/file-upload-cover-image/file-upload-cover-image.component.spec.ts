import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadCoverImageComponent } from './file-upload-cover-image.component';

describe('FileUploadCoverImageComponent', () => {
  let component: FileUploadCoverImageComponent;
  let fixture: ComponentFixture<FileUploadCoverImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadCoverImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadCoverImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
