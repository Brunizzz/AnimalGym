import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bloqueo-usuarios',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './bloqueo-usuarios.html',
  styleUrls: ['./bloqueo-usuarios.css']
})
export class BloqueoUsuarios implements OnInit {
  private http = inject(HttpClient);
  usuarios: any[] = [];
  private apiUrl = 'http://localhost:3000/api/usuarios';

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.usuarios = data.map(usuario => {
        let fecha = usuario.fechaRegistro;

        // Si viene de Firebase como Timestamp
        if (fecha && fecha._seconds) {
          fecha = new Date(fecha._seconds * 1000);
        }

        // Si viene como string o número (desde tu app)
        else if (typeof fecha === 'string' || typeof fecha === 'number') {
          const parsed = new Date(fecha);
          fecha = isNaN(parsed.getTime()) ? null : parsed;
        }

        return { ...usuario, fechaRegistro: fecha };
      });
    });
  }

  toggleEstado(usuario: any) {
    const nuevoEstado = !usuario.estado;
    const accion = nuevoEstado ? 'desbloquear' : 'bloquear';

    Swal.fire({
      title: `¿Deseas ${accion} al usuario?`,
      input: 'text',
      inputLabel: `Motivo para ${accion}`,
      inputPlaceholder: 'Escribe el motivo aquí...',
      inputValidator: (value) => {
        if (!value) {
          return 'El motivo es obligatorio.';
        }
        return null;
      },
      showCancelButton: true,
      confirmButtonText: `Confirmar ${accion}`,
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(result => {
      if (result.isConfirmed && result.value) {
        const motivo = result.value;
        const realizadoPor = 'admin001';

        this.http.put(`${this.apiUrl}/${usuario.id}/bloqueo`, {
          estado: nuevoEstado,
          motivo,
          realizadoPor
        }).subscribe(() => {
          usuario.estado = nuevoEstado;
          Swal.fire({
            icon: 'success',
            title: `Usuario ${accion} correctamente`,
            showConfirmButton: false,
            timer: 1500
          });
        }, () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `No se pudo ${accion} al usuario.`
          });
        });
      }
    });
  }

}
