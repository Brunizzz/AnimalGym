import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = false;

  constructor(private router: Router, private adminService: AdminService) {}

  login() {
    const success = this.adminService.login(this.username, this.password);

    if (success) {
      this.error = false;
      this.router.navigate(['/']);
    } else {
      this.error = true;
    }
  }
}
