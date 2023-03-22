import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInfoBffComponent } from './display-info-bff.component';

describe('DisplayInfoBffComponent', () => {
  let component: DisplayInfoBffComponent;
  let fixture: ComponentFixture<DisplayInfoBffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayInfoBffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayInfoBffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
