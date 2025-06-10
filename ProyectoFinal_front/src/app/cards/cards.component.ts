import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cards',
  imports: [NgFor,NgIf],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
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
