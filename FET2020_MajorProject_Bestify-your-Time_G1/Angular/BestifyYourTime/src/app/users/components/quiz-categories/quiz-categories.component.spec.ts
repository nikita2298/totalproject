import { ComponentFixture, TestBed } from '@angular/core/testing';

import {QuizCategoriesComponent  } from './quiz-categories.component';
import { QuizService } from 'src/app/services/quiz.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuizecategoriesComponent', () => {
  let component: QuizCategoriesComponent;
  let fixture: ComponentFixture<QuizCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizCategoriesComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [QuizService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('components initial state ', () => {
    
    expect(component.data).toBeDefined();
    expect(component.quizName).toBeDefined();
  });

});
