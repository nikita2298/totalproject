import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuizesComponent } from './quizes.component';
import { QuizService } from 'src/app/services/quiz.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';


describe('QuizesComponent', () => {
  let component: QuizesComponent;
  let fixture: ComponentFixture<QuizesComponent>;
  let e1: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizesComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [QuizService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('components initial state ', () => {
    // expect(component.selected).toBeFalsy();
    expect(component.quizName).toBeDefined();
    // expect(component.favouriteData).toBeDefined();
  });

  it(
    'should call the searchByTitle() method on click button',
    waitForAsync(() => {
      fixture.detectChanges();
      spyOn(component, 'searchByTitle');
      e1 = fixture.debugElement.query(By.css('button')).nativeElement;
      e1.click();
      expect(component.searchByTitle).toHaveBeenCalledTimes(1);
    })
  );

  it('searchInput should update value when input changes', (() => {
    // const fixture = TestBed.createComponent(AppComponent);

    expect(fixture.debugElement.nativeElement.value).toBeFalsy()

    const el: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const testValue = 'some_value';

    el.value = testValue;
    el.dispatchEvent(new Event('input'));

    expect(fixture.componentInstance.quizName).toEqual(testValue);
}));

});
