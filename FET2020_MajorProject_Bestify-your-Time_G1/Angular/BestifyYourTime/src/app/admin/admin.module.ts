import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';

import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { PuzzlesComponent } from './components/puzzles/puzzles.component';
import { QuizcategoriesComponent } from './components/quizcategories/quizcategories.component';
import { QuizesComponent } from './components/quizes/quizes.component';
import { AddPuzzleComponent } from './components/puzzles/add-puzzle/add-puzzle.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuizAddComponent } from './components/quiz-add/quiz-add.component';
import { QuizAddQuestionComponent } from './components/quiz-add-question/quiz-add-question.component';

import { MatTabsModule } from '@angular/material/tabs';
import { AuthGuardService } from '../services/auth-guard.service';
import { GamesComponent } from './components/games/games.component';
import { ChartsModule } from 'ng2-charts';
import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [
    AdminComponent,
    CategoriesComponent,
    PuzzlesComponent,
    AddPuzzleComponent,
    QuizcategoriesComponent,
    QuizesComponent,
    QuizAddComponent,
    QuizAddQuestionComponent,
    GamesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    ChartsModule
  ]
})
export class AdminModule { }