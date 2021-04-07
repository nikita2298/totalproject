import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontComponent } from './front.component';

describe('CommonComponent', () => {
  let component: FrontComponent;
  let fixture: ComponentFixture<FrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
