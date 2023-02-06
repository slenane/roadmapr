import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapUpdateTutorialComponent } from './roadmap-update-tutorial.component';

describe('RoadmapUpdateTutorialComponent', () => {
  let component: RoadmapUpdateTutorialComponent;
  let fixture: ComponentFixture<RoadmapUpdateTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapUpdateTutorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadmapUpdateTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
