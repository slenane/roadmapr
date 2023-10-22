import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileContentEmploymentComponent } from './profile-content-employment.component';

describe('ProfileContentEmploymentComponent', () => {
  let component: ProfileContentEmploymentComponent;
  let fixture: ComponentFixture<ProfileContentEmploymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileContentEmploymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileContentEmploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
