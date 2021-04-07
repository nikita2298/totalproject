import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quiz } from '../classes/Quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizaddService {

  quizURL: string = "http://localhost:8080/api/quizes";
  quizCategoriesURL:string="http://localhost:8080/api/quizecategories"

  constructor(private http: HttpClient) { }

  postQuiz(quiz:Quiz):Observable<any> {
    const headers = { 'content-type': 'application/json'};  
    const body=JSON.stringify(quiz);
    // console.log(body);
    return this.http.post(this.quizURL, body,{'headers':headers});
  }

  getQuizCategories(){
    return this.http.get(this.quizCategoriesURL);
  }
  
}
