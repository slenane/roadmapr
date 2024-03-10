import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoStackComponent } from './demo-stack.component';

describe('DemoStackComponent', () => {
  let component: DemoStackComponent;
  let fixture: ComponentFixture<DemoStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoStackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
