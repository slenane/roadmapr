import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapUpdateCourseComponent } from './roadmap-update-course.component';

describe('RoadmapUpdateCourseComponent', () => {
  let component: RoadmapUpdateCourseComponent;
  let fixture: ComponentFixture<RoadmapUpdateCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapUpdateCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadmapUpdateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
