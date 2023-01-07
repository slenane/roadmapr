import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapModalComponent } from './roadmap-modal.component';

describe('RoadmapModalComponent', () => {
  let component: RoadmapModalComponent;
  let fixture: ComponentFixture<RoadmapModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadmapModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
