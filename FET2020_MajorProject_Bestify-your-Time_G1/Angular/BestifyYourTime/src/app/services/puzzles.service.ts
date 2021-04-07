import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { puzzle } from '../interfaces/puzzle';
import { user } from '../interfaces/user';
import { puzzleResult } from '../interfaces/puzzle_result';

@Injectable({
  providedIn: 'root'
})
export class PuzzlesService {

  //an instance for an puzzle interface
  puzzles: puzzle[]=[];

  users: user[]= [];

  // An array to store all the Puzzle Result
  puzzleResults:puzzleResult[]=[];

  //api for fetching puzzle from database
  private PuzzleUrl='http://localhost:8080/api/puzzles'

  // url='http://localhost:8080/api/puzzles';

  //api for fetching user from database
  private UserUrl='http://localhost:8080/api/users'

  //api for fetching Puzzle Results from database
  private PuzzleResultUrl='http://localhost:8080/api/puzzleresult'

  topScores="http://localhost:8080/api/puzzleresult/getTopScores"
  

  constructor(private httpClient: HttpClient) { }

  getPuzzles(): Observable<puzzle[]> {
    return this.httpClient.get<puzzle[]>(this.PuzzleUrl)
  }

  postData(data:puzzle): Observable<puzzle> {
    console.log("in service");
     return this.httpClient.post<puzzle>(this.PuzzleUrl,data);
   }

   getUsers(): Observable<user[]> {
    return this.httpClient.get<user[]>(this.UserUrl)
  }

  sendEmail(url: string, data: user | undefined, puzzle_result: puzzleResult | undefined){
     return this.httpClient.post(url, [data, puzzle_result]);
    // return this.httpClient.post(url, data);
  }

  getPuzzleResult(): Observable<puzzleResult[]> {
    return this.httpClient.get<puzzleResult[]>(this.PuzzleResultUrl)
  }
  getTopScore():Observable<any[]> {
    return this.httpClient.get<any[]>(this.topScores);

   }
}