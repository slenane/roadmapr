import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordInputsComponent } from './update-password-inputs.component';

describe('UpdatePasswordInputsComponent', () => {
  let component: UpdatePasswordInputsComponent;
  let fixture: ComponentFixture<UpdatePasswordInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePasswordInputsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePasswordInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
