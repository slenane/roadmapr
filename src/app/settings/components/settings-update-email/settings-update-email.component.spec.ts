import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsUpdateEmailComponent } from './settings-update-email.component';

describe('SettingsUpdateEmailComponent', () => {
  let component: SettingsUpdateEmailComponent;
  let fixture: ComponentFixture<SettingsUpdateEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsUpdateEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsUpdateEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
