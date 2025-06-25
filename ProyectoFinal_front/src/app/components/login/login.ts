import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../services/user'; 
import Swal from 'sweetalert2';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule, RecaptchaModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';
  error = false;
  captchaToken: string = '';

  constructor(private router: Router, private user: User) {}

  login() {
    if (!this.captchaToken) {
      Swal.fire({
        icon: 'warning',
        title: 'Captcha requerido',
        text: 'Verifica que no eres un robot.'
      });
      return;
    }

    this.user.login(this.username, this.password).subscribe(resultado => {
      if (resultado === true) {
        this.error = false;

        const tipo = this.user.getUsuario()?.tipo;

        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 1500
        });

        this.router.navigate(['/']);

      } else if (resultado === 'bloqueado') {
        this.error = true;
        Swal.fire({
          icon: 'error',
          title: 'Cuenta bloqueada',
          text: 'Has excedido el número de intentos permitidos. Contacta al administrador.',
        });
      } else {
        this.error = true;
        Swal.fire({
          icon: 'warning',
          title: 'Credenciales incorrectas',
          text: 'Usuario o contraseña inválidos.',
        });
      }
    });
  }

  onCaptchaResolved(token: string | null) {
    this.captchaToken = token || '';
  }

}
