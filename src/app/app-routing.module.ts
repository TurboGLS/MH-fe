import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { VarlistContainerComponent } from './pages/varlist-container/varlist-container.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { loginGuard } from './guards/login.guard';
import { roleGuard } from './guards/role.guard';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

const routes: Routes = [
  {
    path: "verify-email",
    component: VerifyEmailComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'varlist',
    component: VarlistContainerComponent,
    canActivate: [authGuard, roleGuard] // prima check login, poi check ruolo
  },
  {
    path: '', 
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
