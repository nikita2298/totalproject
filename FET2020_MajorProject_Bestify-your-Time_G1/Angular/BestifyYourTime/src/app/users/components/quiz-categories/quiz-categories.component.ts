import { Component, OnInit } from '@angular/core';
import { quizCategories } from 'src/app/interfaces/quiz_categories';
import { QuizService } from 'src/app/services/quiz.service'
import { quiz } from 'src/app/interfaces/quiz';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-quiz-categories',
  templateUrl: './quiz-categories.component.html',
  styleUrls: ['./quiz-categories.component.scss']
})
export class QuizCategoriesComponent implements OnInit {

  data:quizCategories[]=[];
  searchedQuiz : quiz[] = []
  id:any;
  quizName = '';
 

  constructor(private quizservice: QuizService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.quizservice.getQuizCat().subscribe((ret: any[])=>{
      this.data = ret;
    })  
    }
  
    searchByTitle(): void {
      this.quizservice.getquizeByTitle(this.quizName).subscribe((ret: any[]) => {
        this.searchedQuiz = ret;
      })
    }
    OnInput(event: any) {
      this.quizName = event.target.value;
    }
    
}
