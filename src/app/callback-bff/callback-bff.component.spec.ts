import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackBffComponent } from './callback-bff.component';

describe('CallbackBffComponent', () => {
  let component: CallbackBffComponent;
  let fixture: ComponentFixture<CallbackBffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallbackBffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallbackBffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
