import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resumen-compra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-compra.html',
  styleUrl: './resumen-compra.css'
})
export class ResumenCompra {
  carrito: { producto: any, cantidad: number }[] = [];
  total = 0;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.carrito = nav?.extras.state?.['carrito'] || [];
    this.total = this.carrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
  }

  pagar() {
    alert('Compra realizada con éxito');
    this.router.navigate(['/compra-productos']);
  }
}
