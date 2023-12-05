import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapExperienceComponent } from './roadmap-experience.component';

describe('RoadmapExperienceComponent', () => {
  let component: RoadmapExperienceComponent;
  let fixture: ComponentFixture<RoadmapExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadmapExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
