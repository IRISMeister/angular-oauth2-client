import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInfoIamComponent } from './display-info-iam.component';

describe('DisplayInfoIamComponent', () => {
  let component: DisplayInfoIamComponent;
  let fixture: ComponentFixture<DisplayInfoIamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayInfoIamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInfoIamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
