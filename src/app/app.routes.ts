import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserResolver } from './edit-user/edit-user.resolver';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {Page2Component  } from './page2/page2.component';

export const rootRouterConfig: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'page2', component: Page2Component },
  { path: 'details/:id', component: EditUserComponent, resolve:{data : EditUserResolver} }
];
