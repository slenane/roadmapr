import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsGithubComponent } from './settings-github.component';

describe('SettingsGithubComponent', () => {
  let component: SettingsGithubComponent;
  let fixture: ComponentFixture<SettingsGithubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsGithubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsGithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
