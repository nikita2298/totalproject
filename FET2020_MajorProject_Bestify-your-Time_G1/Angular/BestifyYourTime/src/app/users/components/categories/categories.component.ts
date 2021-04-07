import { Component, OnInit } from '@angular/core';
import { category } from 'src/app/interfaces/category';
import { QuizService } from 'src/app/services/quiz.service'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  data: category[] = [];

  constructor(private quizservice: QuizService) {
    this.quizservice.get().subscribe((ret: any[]) => {
      // console.log(ret);
      this.data = ret;
    })
  }

  ngOnInit(): void {

  }
}
