import { Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {LoginComponent} from "./login/login.component";
import {ClientDetailsComponent} from "./client-details/client-details.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: "client", component: ClientDetailsComponent }
  // Add more routes as needed
];
