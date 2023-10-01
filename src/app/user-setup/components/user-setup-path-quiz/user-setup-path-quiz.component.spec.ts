import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UserSetupPathQuizComponent } from "./user-setup-path-quiz.component";

describe("UserSetupPathQuizComponent", () => {
  let component: UserSetupPathQuizComponent;
  let fixture: ComponentFixture<UserSetupPathQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSetupPathQuizComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSetupPathQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
