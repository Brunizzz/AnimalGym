import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { User } from '../../services/user'; 

@Component({
  selector: 'app-subscripcion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscripcion.html',
  styleUrl: './subscripcion.css'
})
export class Subscripcion implements OnInit {
  private http = inject(HttpClient);
  private user = inject(User);

  subscripcionInfo: any = null;
  error = '';

  ngOnInit() {
    const usuario = this.user.getUsuario();
    if (!usuario || !usuario.subscripcion) {
      this.error = 'No se encontró una subscripción activa.';
      return;
    }

    const tipoSubscripcion = usuario.subscripcion.toString();

    this.http.get<any[]>('http://localhost:3000/api/subscripciones')
      .subscribe(subscripciones => {
        this.subscripcionInfo = subscripciones.find(s => s.subscripcion === tipoSubscripcion);

        if (!this.subscripcionInfo) {
          this.error = 'No se encontró información para tu subscripción.';
        }
      });
  }
}