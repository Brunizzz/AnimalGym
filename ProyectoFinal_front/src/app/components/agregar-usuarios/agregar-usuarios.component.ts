import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.http.delete(`http://localhost:3000/api/usuarios/${id}`).subscribe(() => {
        alert('Usuario eliminado');
        this.obtenerUsuarios();
      });
    }
  }

  agregarNuevoUsuario() {
    this.router.navigate(['/nuevo-usuario']);
  }
}
