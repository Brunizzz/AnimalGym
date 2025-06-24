import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../services/user'; 

@Component({
  selector: 'app-header-cliente',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './header-cliente.html',
  styleUrl: './header-cliente.css'
})
export class HeaderCliente {
  adminUser: string | null = null;

  constructor(public user: User, private router: Router) {}

  ngOnInit(): void {
    this.updateAdminUser();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateAdminUser();
      }
    });
  }

  updateAdminUser(): void {
    const admin = this.user.getUsuario();
    this.adminUser = admin ? admin.nombre : null;
  }

  logout(): void {
    this.user.logout();
    this.router.navigate(['/']);
  }
}
