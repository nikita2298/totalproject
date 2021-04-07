import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';

import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSnakeComponent } from './components/games/ngx-snake/ngx-snake.component';
import { GamesComponent } from './components/games/games.component';
import { QuizCategoriesComponent } from './components/quiz-categories/quiz-categories.component';
import { PuzzlesComponent } from './components/puzzles/puzzles.component';
import { QuizesComponent } from './components/quizes/quizes.component';
import { CategoriesComponent } from './components/categories/categories.component';

import { TetrisComponent } from './components/games/tetris/tetris.component';
import { GlassComponent } from './components/games/glass/glass.component';
import { BoardComponent } from './components/games/board/board.component';
import { PixelComponent } from './components/games/board/pixel/pixel.component';
import { StatusComponent } from './components/games/status/status.component';
import { NextComponent } from './components/games/next/next.component';

import { ShowpuzzleComponent } from './components/puzzles/showpuzzle/showpuzzle.component';

import { MatTabsModule } from '@angular/material/tabs';
import { AuthGuardService } from '../services/auth-guard.service';
import { QuizDisplayComponent } from './components/quiz-display/quiz-display.component';
import { QuizDisplayQuestionComponent } from './components/quiz-display-question/quiz-display-question.component';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [

  {
    path: '',   // localhost:4200/user
    component: UsersComponent,
    canActivate: [AuthGuardService],
    children: [
          
      {
        path: 'puzzles',
        component: PuzzlesComponent,
        canActivate: [AuthGuardService],
        children: [
          {  //i have written this
            path: ':id',
            component: PuzzlesComponent
          }]
      },
      {
        path: 'quizcategories/:id',
        component: QuizesComponent,
        canActivate: [AuthGuardService],
        children: [
          {
            path: "quiz/:id",
            component: QuizDisplayComponent
    
          }
        ]
      },
    ]
  },

];

@NgModule({
  declarations: [
    UsersComponent,
    NgxSnakeComponent,
    GamesComponent,
    CategoriesComponent,
    PuzzlesComponent,
    QuizesComponent,
    QuizCategoriesComponent,
    TetrisComponent,
    GlassComponent,
    NextComponent,
    PixelComponent,
    BoardComponent,
    StatusComponent,
    ShowpuzzleComponent,
   
    QuizDisplayComponent,
    QuizDisplayQuestionComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class UsersModule { }
