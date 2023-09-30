import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsUpdateUsernameComponent } from './settings-update-username.component';

describe('SettingsUpdateUsernameComponent', () => {
  let component: SettingsUpdateUsernameComponent;
  let fixture: ComponentFixture<SettingsUpdateUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsUpdateUsernameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsUpdateUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
