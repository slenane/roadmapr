import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapUpdateBookComponent } from './roadmap-update-book.component';

describe('RoadmapUpdateBookComponent', () => {
  let component: RoadmapUpdateBookComponent;
  let fixture: ComponentFixture<RoadmapUpdateBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadmapUpdateBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadmapUpdateBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
