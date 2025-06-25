import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.css']
})
export class AgregarProductosComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  productos: any[] = [];

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.http.get<any[]>('http://localhost:3000/api/productos')
      .subscribe(data => this.productos = data);
  }

  eliminarProducto(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:3000/api/productos/${id}`)
          .subscribe(() => {
            this.productos = this.productos.filter(p => p.id !== id);
            Swal.fire({
              icon: 'success',
              title: 'Producto eliminado',
              showConfirmButton: false,
              timer: 1500
            });
          }, () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el producto.'
            });
          });
      }
    });
  }

  editarProducto(id: string) {
    this.router.navigate(['/editar-producto', id]);
  }

  agregarProducto() {
    this.router.navigate(['/nuevo-producto']);
  }
}
