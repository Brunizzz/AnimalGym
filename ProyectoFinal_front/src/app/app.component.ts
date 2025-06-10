import { Component } from '@angular/core';
import { RouterModule, Routes, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { CardsComponent } from './cards/cards.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ClaseFormTemplateComponent } from './clase-form-template/clase-form-template.component';


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
