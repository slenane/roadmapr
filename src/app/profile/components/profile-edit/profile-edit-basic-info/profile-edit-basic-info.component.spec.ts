import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditBasicInfoComponent } from './profile-edit-basic-info.component';

describe('ProfileEditBasicInfoComponent', () => {
  let component: ProfileEditBasicInfoComponent;
  let fixture: ComponentFixture<ProfileEditBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditBasicInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
