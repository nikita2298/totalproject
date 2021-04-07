import { Component, OnInit } from '@angular/core';
import { faGamepad, faPuzzlePiece, faFile , faQuestion} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontComponent implements OnInit {
  faQuestion = faQuestion;
  faGamepad = faGamepad;
  faPuzzlePiece=faPuzzlePiece;
  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  authGuardFucntion(){
    this.router.navigate(['user/puzzles'])
  }

}
