import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddPuzzleComponent } from './components/puzzles/add-puzzle/add-puzzle.component';
import { PuzzlesComponent } from './components/puzzles/puzzles.component';
import { QuizAddComponent } from './components/quiz-add/quiz-add.component';
import { QuizcategoriesComponent } from './components/quizcategories/quizcategories.component';
import { QuizesComponent } from './components/quizes/quizes.component';

const routes: Routes = [
    {
        path: '', // localhost:4200/admin
        component: AdminComponent,
        canActivate: [AuthGuardService],
    }
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }