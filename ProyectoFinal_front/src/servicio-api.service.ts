import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioApiService {
  private apiUrl = 'https://gymemilianoapi.free.beeceptor.com';

  constructor(private http: HttpClient) {}

  retornar(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error al conectar con la API:', error);
        return of({ products: [] });
      })
    );
  }
}
