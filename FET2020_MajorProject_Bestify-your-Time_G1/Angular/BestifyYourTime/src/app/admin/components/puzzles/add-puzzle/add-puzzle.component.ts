import { Component, OnInit } from '@angular/core';
// import { puzzle } from 'src/app/classes/puzzle';
import { Router } from '@angular/router';
import { PuzzlesService } from 'src/app/services/puzzles.service';
import { puzzle } from 'src/app/classes/puzzles';

@Component({
  selector: 'app-add-puzzle',
  templateUrl: './add-puzzle.component.html',
  styleUrls: ['./add-puzzle.component.scss'],
})
export class AddPuzzleComponent implements OnInit {
  puzzle = new puzzle();

  constructor(private puzzleService: PuzzlesService, private route: Router) {}

  ngOnInit(): void {}
  addpuzzle() {
    //console.log('Puzzle name : ', this.puzzle.puzzle_name);
    //console.log('Puzzle Question : ', this.puzzle.puzzle_question);
    //console.log('Puzzle Answer : ', this.puzzle.puzzle_answer);
    console.log('Puzzle Explaination : ', this.puzzle.puzzle_explaination);

    this.puzzleService.postData(this.puzzle).subscribe((reponse) => {
      console.log(reponse);
      this.route.navigate(['admin']);
    });
  }
}
