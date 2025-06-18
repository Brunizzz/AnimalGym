import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-header-admin',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './header-admin.html',
  styleUrl: './header-admin.css'
})
export class HeaderAdmin {
  adminUser: string | null = null;

  constructor(public adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.updateAdminUser();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateAdminUser();
      }
    });
  }

  updateAdminUser(): void {
    const admin = this.adminService.getAdmin();
    this.adminUser = admin ? admin.nombre : null;
  }

  logout(): void {
    this.adminService.logout();
    this.router.navigate(['/']);
  }
}
