import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../services/user'; 

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

  constructor(private router: Router, private user: User) {}

  login() {
    this.user.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.error = false;
        const tipo = this.user.getUsuario()?.tipo;
        if (tipo === 'admin') {
          this.router.navigate(['/']);
        } else if (tipo === 'cliente') {
          this.router.navigate(['/']);
        }
      } else {
        this.error = true;
      }
    });
  }
}
