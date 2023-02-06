import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapUpdateDegreeComponent } from './roadmap-update-degree.component';

describe('RoadmapUpdateDegreeComponent', () => {
  let component: RoadmapUpdateDegreeComponent;
  let fixture: ComponentFixture<RoadmapUpdateDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapUpdateDegreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadmapUpdateDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
