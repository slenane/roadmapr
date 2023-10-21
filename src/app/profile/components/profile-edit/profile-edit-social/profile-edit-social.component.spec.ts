import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditSocialComponent } from './profile-edit-social.component';

describe('ProfileEditSocialComponent', () => {
  let component: ProfileEditSocialComponent;
  let fixture: ComponentFixture<ProfileEditSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditSocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
