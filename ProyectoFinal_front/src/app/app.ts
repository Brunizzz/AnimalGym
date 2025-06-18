import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { HeaderAdmin } from './components/header-admin/header-admin';
import { Subscripciones } from "./components/subscripciones/subscripciones";
import { Footer } from './components/footer/footer';
import { AdminService } from './services/admin';
import { Router, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    NgIf,
    RouterOutlet, 
    Header,
    HeaderAdmin, 
    Subscripciones, 
    Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  adminUser: any = null;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.adminUser = this.adminService.getAdmin();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.adminUser = this.adminService.getAdmin();
      }
    });
  }
}
