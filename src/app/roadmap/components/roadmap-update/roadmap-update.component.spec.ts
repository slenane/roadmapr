import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapUpdateComponent } from './roadmap-update.component';

describe('RoadmapUpdateComponent', () => {
  let component: RoadmapUpdateComponent;
  let fixture: ComponentFixture<RoadmapUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadmapUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
