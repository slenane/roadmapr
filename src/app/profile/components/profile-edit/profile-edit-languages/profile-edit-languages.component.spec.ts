import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditLanguagesComponent } from './profile-edit-languages.component';

describe('ProfileEditLanguagesComponent', () => {
  let component: ProfileEditLanguagesComponent;
  let fixture: ComponentFixture<ProfileEditLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditLanguagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
