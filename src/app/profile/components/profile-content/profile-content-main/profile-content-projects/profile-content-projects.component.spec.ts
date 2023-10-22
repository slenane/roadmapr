import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileContentProjectsComponent } from './profile-content-projects.component';

describe('ProfileContentProjectsComponent', () => {
  let component: ProfileContentProjectsComponent;
  let fixture: ComponentFixture<ProfileContentProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileContentProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileContentProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
