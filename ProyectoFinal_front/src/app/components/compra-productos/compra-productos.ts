import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compra-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compra-productos.html',
  styleUrl: './compra-productos.css'
})
export class CompraProductos implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);

  productos: any[] = [];
  carrito: { producto: any, cantidad: number }[] = [];

  get totalProductosSeleccionados(): number {
    return this.carrito.reduce((total, item) => total + item.cantidad, 0);
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/productos').subscribe(data => {
      this.productos = data;
    });
  }

  agregarAlCarrito(producto: any, cantidad: number) {
    if (cantidad <= 0) return;

    const existente = this.carrito.find(p => p.producto.id === producto.id);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      this.carrito.push({ producto, cantidad });
    }

    Swal.fire({
      icon: 'success',
      title: 'Producto agregado',
      text: `${cantidad} x ${producto.nombre} añadido al carrito`,
      timer: 1500,
      showConfirmButton: false
    });
  }

  finalizarCompra() {
    this.router.navigate(['/resumen-compra'], { state: { carrito: this.carrito } });
  }
}
