import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackSelectorComponent } from './stack-selector.component';

describe('StackSelectorComponent', () => {
  let component: StackSelectorComponent;
  let fixture: ComponentFixture<StackSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
