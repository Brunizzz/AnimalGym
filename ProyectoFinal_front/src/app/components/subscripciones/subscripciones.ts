import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-subscripciones',
  imports: [NgFor],
  templateUrl: './subscripciones.html',
  styleUrl: './subscripciones.css'
})
export class Subscripciones {
  planes = [
    {
      titulo: 'Plan 3 Meses',
      precio: 1200,
      beneficios: ['Acceso total', 'Boxeo y pesas', 'Asesoría personalizada']
    },
    {
      titulo: 'Plan 6 Meses',
      precio: 2100,
      beneficios: ['Acceso total', 'Entrenamientos grupales', 'Clases de agilidad']
    },
    {
      titulo: 'Plan 1 Año',
      precio: 3900,
      beneficios: ['Todo incluido', 'Descuento en productos', 'Entrenador VIP']
    }
  ];
}
