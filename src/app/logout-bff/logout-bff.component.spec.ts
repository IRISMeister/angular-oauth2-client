import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutBffComponent } from './logout-bff.component';

describe('LogoutBffComponent', () => {
  let component: LogoutBffComponent;
  let fixture: ComponentFixture<LogoutBffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutBffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutBffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
