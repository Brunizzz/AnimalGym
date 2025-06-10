import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioApiService } from '../../servicio-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-servicee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicee.component.html',
  styleUrls: ['./servicee.component.css']
})
export class ServiceeComponent implements OnInit {
  array: any[] = [];
  filtro: string = '';

  constructor(private servicioAPIService: ServicioApiService) {}

  ngOnInit(): void {
    this.recuperarDatos();
  }

  recuperarDatos(): void {
    console.log("Recuperando productos...");
    this.servicioAPIService.retornar().subscribe({
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
