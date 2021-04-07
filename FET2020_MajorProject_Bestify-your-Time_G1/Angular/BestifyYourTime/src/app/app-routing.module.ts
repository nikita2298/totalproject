import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './common/error/error.component';
import { HomepageComponent } from './common/homepage/homepage.component';
import { FrontComponent } from './common/front/front.component';
import { RegisterComponent } from './common/register/register.component';
import { LoginComponent } from './common/login/login.component';
import { ProfileComponent } from './common/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AboutUsComponent } from './common/about-us/about-us.component';

// lazy loading
const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule) 
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path : 'about', component : AboutUsComponent},
  { path:"animation",  component:HomepageComponent },
  { path: '',component : FrontComponent  },
  {
    // wildcard 
    path: '**',
    component : ErrorComponent
  }
];
// end of lazy loading code

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
