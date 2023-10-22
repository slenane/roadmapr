import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditLayoutComponent } from './profile-edit-layout.component';

describe('ProfileEditLayoutComponent', () => {
  let component: ProfileEditLayoutComponent;
  let fixture: ComponentFixture<ProfileEditLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileEditLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
