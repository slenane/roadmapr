import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSetupTourComponent } from './user-setup-tour.component';

describe('UserSetupTourComponent', () => {
  let component: UserSetupTourComponent;
  let fixture: ComponentFixture<UserSetupTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSetupTourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSetupTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
