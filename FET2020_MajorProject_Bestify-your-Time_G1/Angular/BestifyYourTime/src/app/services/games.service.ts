import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { games } from '../interfaces/games';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  //an instance for an games interface
  games: games[] = [];

  //api for fetching games from database
  private categoryUrl = 'http://localhost:8080/api/games'

  //api for fetching games top scorer from database
  private TopScorerUrl = 'http://localhost:8080/api/scores/getTopScores'

  //api for fetching games count from database
  private PieUrl = 'http://localhost:8080/api/scores/getGamesPie'

  //api for fetching Quiz Analysis from database
  private QuizAnalysisUrl = 'http://localhost:8080/api/quizeresult/getQuizAnalysis'

  constructor(private httpClient: HttpClient) { }

  getGames(): Observable<games[]> {
    return this.httpClient.get<games[]>(this.categoryUrl)
  }

  getTopScorer(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.TopScorerUrl)
  }

  getPieGame(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.PieUrl)
  }

  // function to call backend api for mail from Admin
  mail(url: string, data: any[]) {
    return this.httpClient.post(url, data);
    // return this.httpClient.post(url, data);
  }

  getQuizAnalysis(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.QuizAnalysisUrl)
  }

}
