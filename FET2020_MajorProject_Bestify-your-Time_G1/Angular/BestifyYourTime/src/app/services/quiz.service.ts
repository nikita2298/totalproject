import { Injectable } from '@angular/core';
import { category } from '../interfaces/category';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { quizCategories } from '../interfaces/quiz_categories';
import { quiz } from '../interfaces/quiz';
import { user } from '../interfaces/user';
import { quizResult } from '../interfaces/quiz_result';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
   //category of type category interface
   category:category[]=[];
   private categoryUrl='http://localhost:8080/api/categories';
 
   //quizCategory of type quizCategories interface
   quizCategory:quizCategories[]=[];
   private quizcategoryUrl='http://localhost:8080/api/quizecategories';
 
   //quize of type quiz interface
   quize:quiz[]=[];
   private quizeurl='http://localhost:8080/api/quizes';
   
   // quizes with id
   private quizeurlwithid='http://localhost:8080/api/quizes/getSpecificQuizes/';
  
   //api for fetching user from database
   users: user[]=[];
   private UserUrl='http://localhost:8080/api/users';
 
   // An array to store all the quiz Result
   quizResults:quizResult[]=[];
   private QuizResultUrl='http://localhost:8080/api/quizeresult';

     //search quiz by title
  private searchByTitle='http://localhost:8080/api/quizes/findAll/';
 
  
  constructor(private httpClient: HttpClient) { }

  get(): Observable<category[]> 
  {
    return this.httpClient.get<category[]>(this.categoryUrl);
  }
  getQuizCat():Observable<quizCategories[]>
  {
    
    return this.httpClient.get<quizCategories[]>(this.quizcategoryUrl);
    
  }
  getquizes():Observable<quiz[]>
  {
    return this.httpClient.get<quiz[]>(this.quizeurl);
  }

  getquizesbyid(id:number):Observable<quiz[]>
  {
    console.log(" inside service : ", id);
    
    return this.httpClient.get<quiz[]>(this.quizeurlwithid+id);
  }

 
  getUsers(): Observable<user[]> {
    return this.httpClient.get<user[]>(this.UserUrl)
  }

  sendEmail(url: string, data: user | undefined, quiz_result: quizResult | undefined){
     return this.httpClient.post(url, [data, quiz_result]);
    // return this.httpClient.post(url, data);
  }

  getQuizResult(): Observable<quizResult[]> {
    return this.httpClient.get<quizResult[]>(this.QuizResultUrl)
  }

  getquizeByTitle(quizName:any):Observable<quiz[]>
  {
    console.log ("quiz name ", quizName)
    return this.httpClient.get<quiz[]>(this.searchByTitle+quizName);
  }
}
