import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resumen-compra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-compra.html',
  styleUrl: './resumen-compra.css'
})
export class ResumenCompra implements OnInit {
  carrito: { producto: any, cantidad: number }[] = [];
  total = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const estado = history.state;
    this.carrito = estado['carrito'] || [];

    if (!this.carrito || this.carrito.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Carrito vacío',
        text: 'No hay productos para mostrar en el resumen.',
        confirmButtonText: 'Volver a tienda'
      }).then(() => {
        this.router.navigate(['/compra-productos']);
      });
    } else {
      this.total = this.carrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
    }
  }

  pagar() {
    Swal.fire({
      icon: 'success',
      title: 'Compra realizada con éxito',
      text: 'Gracias por tu compra',
      showConfirmButton: false,
      timer: 2000
    });

    setTimeout(() => {
      this.router.navigate(['/compra-productos']);
    }, 2000);
  }
}
