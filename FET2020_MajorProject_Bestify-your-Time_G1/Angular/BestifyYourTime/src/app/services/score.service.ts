import { Injectable } from '@angular/core';
import { Score } from '../classes/score';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { user } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  url='http://localhost:8080/api/scores';
  constructor(private httpClient: HttpClient) { }

  postData(data:Score): Observable<Score> {
   console.log("Score from service  : " , data);
     return this.httpClient.post<Score>(this.url,data);
   }

     // function to call backend api for mail
  sendEmail(url: string, data: user, Resultscore:Score){
    return this.httpClient.post(url, [data, Resultscore]);
   // return this.httpClient.post(url, data);
 }
}
