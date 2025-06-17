import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-bloqueo-usuarios',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './bloqueo-usuarios.html',
})
export class BloqueoUsuariosComponent implements OnInit {
  private http = inject(HttpClient);
  usuarios: any[] = [];
  private apiUrl = 'http://localhost:3000/api/usuarios'; // Cambia si tu backend está en otra URL

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.usuarios = data;
    });
  }

  toggleEstado(usuario: any) {
    const nuevoEstado = !usuario.estado;
    const motivo = prompt(`¿Motivo para ${nuevoEstado ? 'desbloquear' : 'bloquear'} al usuario?`);
    const realizadoPor = 'admin001'; // Reemplázalo por el ID del admin autenticado si lo tienes

    if (!motivo) return;

    this.http.put(`${this.apiUrl}/${usuario.id}/bloqueo`, {
      estado: nuevoEstado,
      motivo,
      realizadoPor
    }).subscribe(() => {
      usuario.estado = nuevoEstado;
      alert(`Usuario ${nuevoEstado ? 'desbloqueado' : 'bloqueado'} correctamente`);
    });
  }
}
