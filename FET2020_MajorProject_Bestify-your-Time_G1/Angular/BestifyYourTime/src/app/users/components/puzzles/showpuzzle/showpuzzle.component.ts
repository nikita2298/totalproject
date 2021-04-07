import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { puzzleresult } from 'src/app/classes/puzzleresult';
import { PuzzlesService } from 'src/app/services/puzzles.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-showpuzzle',
  templateUrl: './showpuzzle.component.html',
  styleUrls: ['./showpuzzle.component.scss'],
})
export class ShowpuzzleComponent implements OnInit {
  @ViewChild('op1') op1!: ElementRef;

  puzzle: any;
  @Input()
  score: number = 0;
  puzzle_Id: any;
  puzzle_Answer: any;
  //puzzle_Answerdb:any;
  answer: any;
  isCorrect: boolean | undefined;
  //data: any;
  user_Id: number = 1;
  //showanswer: boolean = false;
  item: any;
  constructor(
    private puzzleService: PuzzleService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private r: Router,
    private puzzlesService: PuzzlesService
  ) {}

  ngOnInit(): void {
    this.puzzlesService.getPuzzles().subscribe((response) => {
      var withDisebled = response.map((response) => ({
        ...response,
        isDisabled: null,
      }));
      this.puzzle = withDisebled;
    });
  }

  @Input()
  public index: number = 1;
  next() {
    if (this.puzzle.length >= this.index) {
      this.index++;
    }
  }
  pre() {
    if (this.index != 0) {
      this.index--;
      this.item = this.puzzle[this.index];
    }
  }

  checkAns(puzzle_idf: number) {
    var str: string = puzzle_idf.toString();
    var id = <HTMLInputElement>document.getElementById(str);
    this.puzzle_Id = puzzle_idf;
    for (let i = 0; i < this.puzzle.length; i++) {
      if (this.puzzle[i].puzzle_id == puzzle_idf) {
        this.puzzle[i].isDisabled = true;
        if (
          this.answer.toLowerCase() ===
          this.puzzle[i].puzzle_answer.toLowerCase()
        ) {
          this.score = this.score + 1;
          id.innerHTML = '<h1>Your Answer is Correct</h1>';
        } else {
          // console.log('answer is incorrect');
          id.innerHTML = '<h1>Your Answer is Incorrect</h1> ';
        }
      }
    }
  }

  post() {
    this.user_Id = this.tokenStorage.getUser().user_id;

    const puzzleResults = new puzzleresult(
      this.user_Id,
      this.score,
      formatDate(new Date(), 'yyyy-MM-dd', 'en_US')
    );
    this.puzzleService
      .postResult(puzzleResults)
      .subscribe((puzzleResultRes) => {});

    this.r.navigate(['/user']);
  }

  OnInput(event: any) {
    this.answer = event.target.value;
  }
}
