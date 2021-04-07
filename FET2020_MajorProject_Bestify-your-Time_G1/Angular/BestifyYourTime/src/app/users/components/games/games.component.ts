import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  showMenu:boolean=true;
  selectedGame!: string;

  public snakeGameImageLink = "../../../assets/images/snake_game.png";
  public tetrisGameImageLink = "../../../assets/images/tetris_game.jpg";
  constructor(private route:Router) {
  }

  ngOnInit(): void {
  }

  showGameMenu(flag:boolean){
    this.showMenu=flag;
  }
  selectGame(game: string){
    this.selectedGame = game;
  }
}
