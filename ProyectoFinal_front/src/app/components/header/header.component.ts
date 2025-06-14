import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
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
  this.router.navigate(['/']); // Redirige al home
}

}