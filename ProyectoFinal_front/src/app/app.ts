import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { NgIf } from '@angular/common';
import { Header } from './components/header/header';
import { HeaderAdmin } from './components/header-admin/header-admin';
import { HeaderCliente } from './components/header-cliente/header-cliente';
import { Subscripciones } from "./components/subscripciones/subscripciones";
import { Footer } from './components/footer/footer';
import { User } from './services/user'; 
import { Loading } from './components/loading/loading';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    NgIf,
    RouterOutlet, 
    Header,
    HeaderAdmin,
    HeaderCliente, 
    Subscripciones, 
    Footer,
    Loading],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  usuario: any = null;
  loading = false;
  private loadingTimeout: any;

  constructor(private user: User, private router: Router) {}

  ngOnInit() {
    this.usuario = this.user.getUsuario();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
        clearTimeout(this.loadingTimeout);
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loadingTimeout = setTimeout(() => {
          this.loading = false;
          this.usuario = this.user.getUsuario();
        }, 100);
      }
    });
  }
}
