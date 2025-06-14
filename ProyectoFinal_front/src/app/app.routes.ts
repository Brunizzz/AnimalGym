import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { ClaseFormTemplateComponent } from './components/clase-form-template/clase-form-template.component';
import { ServiceeComponent } from './components/servicee/servicee.component';
import { PipesComponent } from './components/pipes/pipes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'servicee', component: ServiceeComponent },
  { path : 'form-template', component: ClaseFormTemplateComponent },
  { path : 'pipes', component: PipesComponent }
];
