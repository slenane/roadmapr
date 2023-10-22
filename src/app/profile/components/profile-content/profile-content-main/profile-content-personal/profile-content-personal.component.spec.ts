import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileContentPersonalComponent } from './profile-content-personal.component';

describe('ProfileContentPersonalComponent', () => {
  let component: ProfileContentPersonalComponent;
  let fixture: ComponentFixture<ProfileContentPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileContentPersonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileContentPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
