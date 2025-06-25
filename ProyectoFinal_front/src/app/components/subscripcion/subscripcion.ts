import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { QRCodeComponent } from 'angularx-qrcode'; // CAMBIO AQUÍ
import { User } from '../../services/user';

@Component({
  selector: 'app-subscripcion',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  templateUrl: './subscripcion.html',
  styleUrl: './subscripcion.css'
})
export class Subscripcion implements OnInit {
  private http = inject(HttpClient);
  private user = inject(User);

  subscripcionInfo: any = null;
  qrData: string | null = null;
  error = '';

  ngOnInit() {
    const usuario = this.user.getUsuario(); // Aquí debe estar el ID del usuario actual
    if (!usuario || !usuario.id) {
      this.error = 'No hay usuario logueado.';
      return;
    }

    this.http.get<any>('http://localhost:3000/api/usuarios')
      .subscribe(usuarios => {
        const usuarioActual = usuarios.find((u: any) => u.id === usuario.id);
        if (!usuarioActual || !usuarioActual.subscripcion) {
          this.error = 'No se encontró la subscripción del usuario.';
          return;
        }

        const tipoSubscripcion = usuarioActual.subscripcion;

        // Trae la info de la subscripción
        this.http.get<any[]>('http://localhost:3000/api/subscripciones')
          .subscribe(subscripciones => {
            this.subscripcionInfo = subscripciones.find(s => s.subscripcion === tipoSubscripcion);
            if (!this.subscripcionInfo) {
              this.error = 'No se encontró información para tu subscripción.';
            } else {
              // Generar QR con correo y contraseña
              this.qrData = `Correo: ${usuarioActual.correo}\nContraseña: ${usuarioActual.contrasena}`;
            }
          });
      });
  }
}
