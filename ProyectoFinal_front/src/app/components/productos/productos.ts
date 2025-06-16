import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosApi } from '../../services/productos-api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class Productos implements OnInit {
  array: any[] = [];
  filtro: string = '';

  constructor(private productosApi: ProductosApi) {}

  ngOnInit(): void {
    this.recuperarDatos();
  }

  recuperarDatos(): void {
    console.log("Recuperando productos...");
    this.productosApi.retornar().subscribe({
      next: (data) => {
        this.array = data.products || [];
        console.log("Datos recibidos:", this.array);
      },
      error: (err) => {
        console.error("Error:", err);
        this.array = [];
      }
    });
  }

  get filtrados(): any[] {
    return this.array.filter(producto =>
      producto.name.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}
