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
        if (!value) return 'El motivo es obligatorio.';
        return null;
      },
      showCancelButton: true,
      confirmButtonText: `Confirmar ${accion}`,
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(motivoResult => {
      if (motivoResult.isConfirmed && motivoResult.value) {
        const motivo = motivoResult.value;
        const realizadoPor = 'admin001'; // o el ID del admin logueado

        // Si se va a desbloquear, pedir nueva contraseña
        if (nuevoEstado) {
          Swal.fire({
            title: 'Asignar nueva contraseña',
            input: 'password',
            inputLabel: 'Nueva contraseña para el usuario',
            inputPlaceholder: 'Contraseña segura (mínimo 8 caracteres)',
            inputAttributes: {
              minlength: '8',
              maxlength: '12'
            },
            inputValidator: (value) => {
              if (!value) return 'Debes ingresar una contraseña.';
              if (value.length < 8 || value.length > 12) return 'La contraseña debe tener entre 8 y 12 caracteres.';
              if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value)) {
                return 'Debe incluir mayúsculas, minúsculas y números.';
              }
              return null;
            },
            showCancelButton: true,
            confirmButtonText: 'Asignar'
          }).then(passResult => {
            if (passResult.isConfirmed && passResult.value) {
              const nuevaContraseña = passResult.value;

              this.actualizarEstado(usuario.id, nuevoEstado, motivo, realizadoPor, nuevaContraseña, usuario);
            }
          });
        } else {
          // Solo bloquear sin contraseña
          this.actualizarEstado(usuario.id, nuevoEstado, motivo, realizadoPor, null, usuario);
        }
      }
    });
  }

  private actualizarEstado(id: string, estado: boolean, motivo: string, realizadoPor: string, contraseña: string | null, usuario: any) {
    const payload: any = {
      estado,
      motivo,
      realizadoPor
    };

    if (contraseña !== null) {
      payload.contraseña = contraseña;
    }

    this.http.put(`${this.apiUrl}/${id}/bloqueo`, payload).subscribe(() => {
      usuario.estado = estado;
      if (contraseña !== null) usuario.contraseña = contraseña;

      Swal.fire({
        icon: 'success',
        title: `Usuario ${estado ? 'desbloqueado' : 'bloqueado'} correctamente`,
        text: contraseña ? `La nueva contraseña ha sido asignada.` : '',
        showConfirmButton: false,
        timer: 2500
      });
    }, () => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `No se pudo ${estado ? 'desbloquear' : 'bloquear'} al usuario.`
      });
    });
  }

}
