import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowpuzzleComponent } from './showpuzzle.component';

describe('ShowpuzzleComponent', () => {
  let component: ShowpuzzleComponent;
  let fixture: ComponentFixture<ShowpuzzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowpuzzleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowpuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
