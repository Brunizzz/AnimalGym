import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin'; 

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';
  error = false;

  constructor(private router: Router, private adminService: AdminService) {}

  login() {
    this.adminService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.error = false;
        this.router.navigate(['/']);
      } else {
        this.error = true;
      }
    });
  }
}
