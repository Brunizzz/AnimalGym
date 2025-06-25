import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.css']
})
export class AgregarUsuariosComponent implements OnInit {
  http = inject(HttpClient);
  router = inject(Router);

  usuarios: any[] = [];

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.http.get<any[]>('http://localhost:3000/api/usuarios').subscribe(data => {
      this.usuarios = data.map(usuario => {
        let fecha = usuario.fechaRegistro;

        if (fecha && fecha._seconds) {
          fecha = new Date(fecha._seconds * 1000);
        }

        else if (typeof fecha === 'string' || typeof fecha === 'number') {
          fecha = new Date(fecha);
        }

        return { ...usuario, fechaRegistro: fecha };
      });
    });
  }

  editarUsuario(id: string) {
    this.router.navigate(['/editar-usuario', id]);
  }

  eliminarUsuario(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al usuario permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:3000/api/usuarios/${id}`).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario eliminado',
            showConfirmButton: false,
            timer: 1500
          });
          this.obtenerUsuarios();
        }, () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el usuario.'
          });
        });
      }
    });
  }

  agregarNuevoUsuario() {
    this.router.navigate(['/nuevo-usuario']);
  }
}
