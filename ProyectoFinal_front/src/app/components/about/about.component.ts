// about.component.ts
import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NgFor, ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  integrantes = [
    { 
      id: 335362, 
      nombre: 'EMILIANO JAHIR ', 
      apellido: 'ESPINOZA HERRERA', 
      foto: 'emi.jpeg',
      especialidad: 'Entrenador Personal'
    },
    { 
      id: 346605, 
      nombre: 'AILTON', 
      apellido: 'HERNANDEZ HERNANDEZ', 
      foto: 'ailton.jpeg',
      especialidad: 'Nutricionista Deportiva'
    },
    { 
      id: 346012, 
      nombre: 'MIGUEL ANGEL', 
      apellido: 'RODRIGUEZ LOPEZ',  
      foto: 'moncky.jpeg',
      especialidad: 'Experto en CrossFit'
    },
    { 
      id:  337407, 
      nombre: 'MIGUEL SEBASTIAN', 
      apellido: 'VALDIVIA FLORES', 
      foto: 'sebas1.jpeg',
      especialidad: 'Instructora de Yoga'
    }
  ];
}