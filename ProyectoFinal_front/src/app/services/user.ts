import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/usuarios';
  private usuarioKey = 'currentUser';
  private currentUser: any = null;

  private intentosFallidos: { [nombre: string]: number } = {};

  constructor() {
    const storedUser = localStorage.getItem(this.usuarioKey);
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  login(nombre: string, contraseña: string): Observable<boolean | 'bloqueado'> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(usuarios => {
        const usuario = usuarios.find(u => u.nombre === nombre);

        if (!usuario) return false;

        // Verifica si está bloqueado
        if (usuario.estado === false) {
          return 'bloqueado';
        }

        const contraseñaCorrecta = usuario.contraseña === contraseña;

        if (contraseñaCorrecta) {
          this.intentosFallidos[nombre] = 0;
          this.currentUser = usuario;
          localStorage.setItem(this.usuarioKey, JSON.stringify(usuario));
          return true;
        } else {
          this.intentosFallidos[nombre] = (this.intentosFallidos[nombre] || 0) + 1;

          if (this.intentosFallidos[nombre] >= 3) {
            // Bloquear usuario desde el backend
            this.http.put(`http://localhost:3000/api/usuarios/${usuario.id}/bloqueo`, {
              estado: false,
              motivo: '3 intentos fallidos de inicio de sesión',
              realizadoPor: 'sistema'
            }).subscribe();
            return 'bloqueado';
          }

          return false;
        }
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
