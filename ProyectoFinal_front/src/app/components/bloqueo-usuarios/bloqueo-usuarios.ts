import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bloqueo-usuarios',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './bloqueo-usuarios.html',
  styleUrls: ['./bloqueo-usuarios.css']
})
export class BloqueoUsuariosComponent implements OnInit {
  private http = inject(HttpClient);
  usuarios: any[] = [];
  private apiUrl = 'http://localhost:3000/api/usuarios';

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.usuarios = data.map(usuario => {
        let fecha = null;

        const fr = usuario.fechaRegistro;
        if (fr && typeof fr._seconds === 'number') {
          fecha = new Date(fr._seconds * 1000);
        }

        return { ...usuario, fechaRegistro: fecha };
      });
    });
  }

  toggleEstado(usuario: any) {
    const nuevoEstado = !usuario.estado;
    const motivo = prompt(`¿Motivo para ${nuevoEstado ? 'desbloquear' : 'bloquear'} al usuario?`);
    const realizadoPor = 'admin001';

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
