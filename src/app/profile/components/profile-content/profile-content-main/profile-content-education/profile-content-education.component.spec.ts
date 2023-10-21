import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileContentEducationComponent } from './profile-content-education.component';

describe('ProfileContentEducationComponent', () => {
  let component: ProfileContentEducationComponent;
  let fixture: ComponentFixture<ProfileContentEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileContentEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileContentEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
