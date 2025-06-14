import { Component } from '@angular/core';
import { RouterModule, Routes, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CardsComponent } from './components/cards/cards.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { ClaseFormTemplateComponent } from './components/clase-form-template/clase-form-template.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'form-template', component: ClaseFormTemplateComponent } 

];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    InicioComponent,
    CardsComponent,
    LoginComponent,
    ClaseFormTemplateComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MINI_PROYECTO_PARCIAL_ALFAFIT';
}
