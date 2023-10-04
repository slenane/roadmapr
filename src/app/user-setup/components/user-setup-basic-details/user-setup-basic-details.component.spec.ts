import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSetupBasicDetailsComponent } from './user-setup-basic-details.component';

describe('UserSetupBasicDetailsComponent', () => {
  let component: UserSetupBasicDetailsComponent;
  let fixture: ComponentFixture<UserSetupBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSetupBasicDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSetupBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
