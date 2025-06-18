import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/usuarios';

  private adminKey = 'currentAdmin';
  private currentAdmin: any = null;

  constructor() {
    const storedAdmin = localStorage.getItem(this.adminKey);
    if (storedAdmin) {
      this.currentAdmin = JSON.parse(storedAdmin);
    }
  }

  login(nombre: string, contraseña: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(usuarios => {
        const admin = usuarios.find(u =>
          u.tipo === 'admin' &&
          u.nombre === nombre &&
          u.contraseña === contraseña
        );
        if (admin) {
          this.currentAdmin = admin;
          localStorage.setItem(this.adminKey, JSON.stringify(admin));
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    this.currentAdmin = null;
    localStorage.removeItem(this.adminKey);
  }

  getAdmin(): any {
    return this.currentAdmin;
  }

  isLoggedIn(): boolean {
    return this.currentAdmin !== null;
  }
}
