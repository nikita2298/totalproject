import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { NgxSnakeComponent } from './components/games/ngx-snake/ngx-snake.component';
import { PuzzlesComponent } from './components/puzzles/puzzles.component';
import { QuizDisplayComponent } from './components/quiz-display/quiz-display.component';
import { QuizesComponent } from './components/quizes/quizes.component';
import { UsersComponent } from './components/users/users.component';

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
    imports: [RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})

export class UsersRoutingModule { }
