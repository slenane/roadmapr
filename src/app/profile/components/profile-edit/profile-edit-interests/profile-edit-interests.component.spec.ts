import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditInterestsComponent } from './profile-edit-interests.component';

describe('ProfileEditInterestsComponent', () => {
  let component: ProfileEditInterestsComponent;
  let fixture: ComponentFixture<ProfileEditInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditInterestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
