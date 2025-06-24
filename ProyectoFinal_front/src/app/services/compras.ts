import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ComprasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/compras-productos';

  registrarCompra(compra: any) {
    return this.http.post(this.apiUrl, compra);
  }
}