import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSetupPathComponent } from './user-setup-path.component';

describe('UserSetupPathComponent', () => {
  let component: UserSetupPathComponent;
  let fixture: ComponentFixture<UserSetupPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSetupPathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSetupPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
