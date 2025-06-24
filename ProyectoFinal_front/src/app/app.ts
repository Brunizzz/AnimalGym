import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { HeaderAdmin } from './components/header-admin/header-admin';
import { HeaderCliente } from './components/header-cliente/header-cliente';
import { Subscripciones } from "./components/subscripciones/subscripciones";
import { Footer } from './components/footer/footer';
import { User } from './services/user'; 
import { Router, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    NgIf,
    RouterOutlet, 
    Header,
    HeaderAdmin,
    HeaderCliente, 
    Subscripciones, 
    Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  usuario: any = null;

  constructor(private user: User, private router: Router) {}

  ngOnInit() {
    this.usuario = this.user.getUsuario();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.usuario = this.user.getUsuario();
      }
    });
  }
}
