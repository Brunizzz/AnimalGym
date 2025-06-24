import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/usuarios';

  private usuarioKey = 'currentUser';
  private currentUser: any = null;

  constructor() {
    const storedUser = localStorage.getItem(this.usuarioKey);
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  login(nombre: string, contraseña: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(usuarios => {
        const usuario = usuarios.find(u =>
          u.nombre === nombre &&
          u.contraseña === contraseña
        );
        if (usuario) {
          this.currentUser = usuario;
          localStorage.setItem(this.usuarioKey, JSON.stringify(usuario));
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem(this.usuarioKey);
  }

  getUsuario(): any {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  isAdmin(): boolean {
    return this.currentUser?.tipo === 'admin';
  }

  isCliente(): boolean {
    return this.currentUser?.tipo === 'cliente';
  }
}
