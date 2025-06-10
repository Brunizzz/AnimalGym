import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ClaseFormTemplateComponent } from './clase-form-template/clase-form-template.component';
import { ServiceeComponent } from './servicee/servicee.component';
import { PipesComponent } from './pipes/pipes.component';

export const routes: Routes = [ // Exportar routes
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'servicee', component: ServiceeComponent },
  { path : 'form-template', component: ClaseFormTemplateComponent },
  { path : 'pipes', component: PipesComponent }
];
